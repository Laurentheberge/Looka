"use client";

import { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileText,
  Image,
  Trash2,
  Loader2,
  File,
  Clock,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { addNote, getNotes, deleteNote } from "@/lib/firebase/firestore";
import { uploadFile, deleteFile } from "@/lib/firebase/storage";
import { useAuth } from "@/lib/contexts/auth-context";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  summary: string | null;
  createdAt: { seconds: number; nanoseconds: number };
}

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "text/plain",
  "text/markdown",
];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return <Image size={16} className="text-purple-500" />;
  if (type === "text/plain" || type === "text/markdown")
    return <FileText size={16} className="text-blue-500" />;
  return <File size={16} className="text-gray-500" />;
}

export default function NotesPage() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Use "general" as default project ID (same as chat)
  const projectId = "general";

  useEffect(() => {
    loadNotes();
  }, [user]);

  async function loadNotes() {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getNotes(projectId) as unknown as Note[];
      setNotes(data);
    } catch (err) {
      console.error("Failed to load notes:", err);
      setLoading(false);
    }
    setLoading(false);
  }

  async function handleUpload(file: File) {
    if (!user) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Unsupported file type. Please upload images (JPG, PNG, WebP) or text files.");
      return;
    }

    if (file.size > MAX_SIZE) {
      setError("File too large. Maximum size is 10MB.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      // Upload file to Firebase Storage
      const path = `notes/${user.uid}/${Date.now()}-${file.name}`;
      const fileUrl = await uploadFile(file, path);

      // Save note record to Firestore
      const docRef = await addNote(projectId, {
        userId: user.uid,
        fileName: file.name,
        fileUrl,
        fileType: file.type,
        fileSize: file.size,
        summary: null,
      });

      const newNote: Note = {
        id: docRef.id,
        fileName: file.name,
        fileUrl,
        fileType: file.type,
        fileSize: file.size,
        summary: null,
        createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
      };

      setNotes((prev) => [newNote, ...prev]);

      // Auto-summarize
      await summarizeNote(newNote);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload failed. Please try again.");
    }

    setUploading(false);
  }

  async function summarizeNote(note: Note) {
    setSummarizingId(note.id);

    try {
      let content: string;
      let mimeType: string | undefined;

      if (note.fileType.startsWith("image/")) {
        // For images, fetch and convert to base64
        const response = await fetch(note.fileUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve) => {
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(",")[1]); // Remove data:image/...;base64, prefix
          };
          reader.readAsDataURL(blob);
        });
        content = base64;
        mimeType = note.fileType;
      } else {
        // For text files, fetch as text
        const response = await fetch(note.fileUrl);
        content = await response.text();
      }

      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content, mimeType, fileName: note.fileName }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Summarization failed");
      }

      // Update note in state
      setNotes((prev) =>
        prev.map((n) =>
          n.id === note.id ? { ...n, summary: data.summary } : n
        )
      );
    } catch (err) {
      console.error("Summarization failed:", err);
      setNotes((prev) =>
        prev.map((n) =>
          n.id === note.id
            ? { ...n, summary: "Failed to generate summary. Please try again." }
            : n
        )
      );
    }

    setSummarizingId(null);
  }

  async function handleDelete(note: Note) {
    if (!confirm(`Delete "${note.fileName}"?`)) return;

    try {
      await deleteNote(note.id);
      // Try to delete from storage too
      try {
        const url = new URL(note.fileUrl);
        // Can't easily extract storage path from URL, skip storage delete
      } catch {
        // Ignore storage errors
      }
      setNotes((prev) => prev.filter((n) => n.id !== note.id));
    } catch (err) {
      console.error("Delete failed:", err);
      setNotes((prev) => {
        if (prev.some((n) => n.id === note.id)) return prev;
        return [...prev, note];
      });
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-navy)]">
          Notes & Summaries
        </h1>
        <p className="text-gray-600 mt-1">
          Upload your notes and get AI-powered summaries
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all mb-8",
          dragOver
            ? "border-[var(--color-gold)] bg-[var(--color-gold)]/5"
            : "border-gray-300 hover:border-[var(--color-gold)] hover:bg-gray-50"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-[var(--color-gold)] animate-spin mb-3" />
            <p className="text-gray-600">Uploading and summarizing...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-10 h-10 text-gray-400 mb-3" />
            <p className="text-gray-700 font-medium mb-1">
              Drop a file here or click to upload
            </p>
            <p className="text-sm text-gray-500">
              Images (JPG, PNG, WebP) or text files up to 10MB
            </p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Notes List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-700 mb-1">
            No notes yet
          </h3>
          <p className="text-gray-500 text-sm">
            Upload your first note to get an AI summary.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Note Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {getFileIcon(note.fileType)}
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {note.fileName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(note.fileSize)}
                      {" \u00B7 "}
                      {new Date(note.createdAt.seconds * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {note.summary === null && summarizingId !== note.id && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => summarizeNote(note)}
                      className="gap-1.5 text-xs"
                    >
                      <Sparkles size={12} />
                      Summarize
                    </Button>
                  )}

                  {summarizingId === note.id && (
                    <span className="flex items-center gap-1.5 text-xs text-[var(--color-gold)]">
                      <Loader2 size={12} className="animate-spin" />
                      Summarizing...
                    </span>
                  )}

                  <button
                    onClick={() => handleDelete(note)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Summary */}
              {note.summary && (
                <div className="border-t border-gray-100 bg-gray-50">
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === note.id ? null : note.id)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 text-left"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-[var(--color-navy)]">
                      <Sparkles size={14} className="text-[var(--color-gold)]" />
                      AI Summary
                    </span>
                    <span className="text-xs text-gray-500">
                      {expandedId === note.id ? "Collapse" : "Expand"}
                    </span>
                  </button>

                  {expandedId === note.id && (
                    <div className="px-4 pb-4">
                      <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                        {note.summary}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Free tier info */}
      {notes.length > 0 && (
        <div className="mt-8 p-4 bg-[var(--color-paper)] rounded-xl text-center">
          <p className="text-sm text-gray-600">
            Free tier: 3 summaries per project.{" "}
            <a href="/pricing" className="text-[var(--color-gold)] font-medium hover:underline">
              Upgrade to Pro
            </a>{" "}
            for unlimited summaries.
          </p>
        </div>
      )}
    </div>
  );
}
