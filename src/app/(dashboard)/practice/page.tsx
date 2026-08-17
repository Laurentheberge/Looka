"use client";

import { useState } from "react";
import {
  Layers,
  ListChecks,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlashcardDeck, type Flashcard } from "@/components/practice/flashcard";
import { MCQQuiz, type MCQuestion } from "@/components/practice/mcq-quiz";
import { Results } from "@/components/practice/results";
import { createPracticeSession } from "@/lib/firebase/firestore";
import { useAuth } from "@/lib/contexts/auth-context";
import { cn } from "@/lib/utils";

type View = "setup" | "generating" | "practice" | "results";
type Mode = "flashcards" | "mcq";

const SUGGESTIONS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English Language",
  "French",
  "History",
  "Geography",
  "Economics",
  "Computer Science",
  "Further Mathematics",
  "Literature",
];

export default function PracticePage() {
  const { user } = useAuth();
  const [view, setView] = useState<View>("setup");
  const [mode, setMode] = useState<Mode>("mcq");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState<MCQuestion[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [error, setError] = useState("");
  const [results, setResults] = useState<{
    score: number;
    total: number;
  } | null>(null);

  async function handleGenerate() {
    if (!subject) return;
    setView("generating");
    setError("");

    try {
      const res = await fetch("/api/practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, count: 5 }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate questions");
      }

      if (mode === "mcq") {
        setQuestions(data.questions);
      } else {
        // Convert to flashcard format
        const cards: Flashcard[] = data.questions.map(
          (q: MCQuestion) => ({
            id: q.id,
            question: q.question,
            answer: `${q.correctAnswer}\n\n${q.explanation}`,
          })
        );
        setFlashcards(cards);
      }

      setView("practice");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to generate questions"
      );
      setView("setup");
    }
  }

  function handleMCQComplete(result: {
    score: number;
    total: number;
  }) {
    setResults(result);
    setView("results");

    // Save session to Firestore
    if (user) {
      createPracticeSession(user.uid, {
        mode: "mcq",
        subject,
        score: result.score,
        total: result.total,
      }).catch(console.error);
    }
  }

  function handleFlashcardComplete(result: {
    known: string[];
    unknown: string[];
  }) {
    setResults({
      score: result.known.length,
      total: result.known.length + result.unknown.length,
    });
    setView("results");

    if (user) {
      createPracticeSession(user.uid, {
        mode: "flashcards",
        subject,
        score: result.known.length,
        total: result.known.length + result.unknown.length,
      }).catch(console.error);
    }
  }

  function handleRetry() {
    setView("generating");
    handleGenerate();
  }

  function handleNewSession() {
    setView("setup");
    setQuestions([]);
    setFlashcards([]);
    setResults(null);
    setSubject("");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-navy)]">
          Practice Mode
        </h1>
        <p className="text-gray-600 mt-1">
          Sharpen your skills with AI-generated questions
        </p>
      </div>

      {/* Setup View */}
      {view === "setup" && (
        <div className="space-y-6">
          {/* Mode Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Choose Mode
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode("mcq")}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                  mode === "mcq"
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)]/5"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    mode === "mcq"
                      ? "bg-[var(--color-gold)] text-[var(--color-navy)]"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  <ListChecks size={20} />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)]">
                    MCQ Quiz
                  </p>
                  <p className="text-xs text-gray-500">
                    Multiple choice questions
                  </p>
                </div>
              </button>

              <button
                onClick={() => setMode("flashcards")}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                  mode === "flashcards"
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)]/5"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    mode === "flashcards"
                      ? "bg-[var(--color-gold)] text-[var(--color-navy)]"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  <Layers size={20} />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)]">
                    Flashcards
                  </p>
                  <p className="text-xs text-gray-500">
                    Flip to reveal answers
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Subject Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              What subject?
            </h3>
            <input
              type="text"
              placeholder="Type any subject, e.g. Further Mathematics, History, Economics..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSubject(s)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs border transition-colors",
                    subject === s
                      ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-navy)] font-medium"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!subject}
            className="w-full py-6 text-base bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[#D4922E] font-semibold gap-2"
          >
            <Sparkles size={18} />
            Generate Questions
          </Button>
        </div>
      )}

      {/* Generating View */}
      {view === "generating" && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-[var(--color-gold)] animate-spin mb-4" />
          <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-1">
            Generating Questions
          </h3>
          <p className="text-gray-500">
            Your AI tutor is creating personalized {subject} questions...
          </p>
        </div>
      )}

      {/* Practice View */}
      {view === "practice" && mode === "mcq" && (
        <MCQQuiz
          questions={questions}
          onComplete={handleMCQComplete}
        />
      )}

      {view === "practice" && mode === "flashcards" && (
        <FlashcardDeck
          cards={flashcards}
          onComplete={handleFlashcardComplete}
        />
      )}

      {/* Results View */}
      {view === "results" && results && (
        <Results
          score={results.score}
          total={results.total}
          mode={mode}
          onRetry={handleRetry}
          onNewSession={handleNewSession}
        />
      )}
    </div>
  );
}
