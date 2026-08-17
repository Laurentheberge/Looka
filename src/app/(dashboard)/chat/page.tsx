"use client";

import { useState, useEffect } from "react";
import { Plus, MessageSquare, Trash2, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  createConversation,
  getConversations,
  getMessages,
  addMessage,
} from "@/lib/firebase/firestore";
import { useAuth } from "@/lib/contexts/auth-context";
import { ChatWindow } from "@/components/chat/chat-window";
import { Timestamp } from "firebase/firestore";

interface Conversation {
  id: string;
  title: string;
  createdAt: Timestamp;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadConversations();
  }, [user]);

  useEffect(() => {
    if (activeConversation) {
      loadMessages(activeConversation);
    }
  }, [activeConversation]);

  async function loadConversations() {
    if (!user) return;
    setLoadingConversations(true);
    try {
      const convos = await getConversations(user.uid) as unknown as Conversation[];
      setConversations(convos);
    } catch (err) {
      console.error("Failed to load conversations:", err);
    }
    setLoadingConversations(false);
  }

  async function loadMessages(conversationId: string) {
    try {
      const msgs = await getMessages(conversationId) as unknown as Message[];
      setMessages(msgs);
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  }

  async function handleNewConversation() {
    if (!user) return;

    // For now, create a simple "general" conversation
    // In the future, this can be tied to a specific project
    try {
      const docRef = await createConversation("general");

      const newConvo: Conversation = {
        id: docRef.id,
        title: "New Chat",
        createdAt: Timestamp.now(),
      };

      setConversations((prev) => [newConvo, ...prev]);
      setActiveConversation(docRef.id);
      setMessages([]);
    } catch (err) {
      console.error("Failed to create conversation:", err);
    }
  }

  async function handleSendMessage(content: string) {
    if (!user || !activeConversation) return;

    setLoading(true);

    // Add user message to Firestore and UI
    const userMsg: Message = {
      id: `temp-${Date.now()}`,
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMsg]);

    // Persist user message
    try {
      await addMessage(activeConversation, "user", content);
    } catch (err) {
      console.error("Failed to save user message:", err);
    }

    try {
      // Build conversation history for context
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, history }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const assistantMsg: Message = {
        id: `temp-${Date.now()}`,
        role: "assistant",
        content: data.content,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Persist assistant message
      try {
        await addMessage(activeConversation, "assistant", data.content);
      } catch (err) {
        console.error("Failed to save assistant message:", err);
      }

      // Update conversation title with first message
      if (messages.length === 0) {
        // This is the first exchange, we could update the title
        // For now keep it simple
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Hamburger for mobile */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="lg:hidden fixed bottom-4 left-4 z-50 p-3 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-full shadow-lg"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {showSidebar && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Conversation Sidebar */}
      <div
        className={cn(
          "w-64 bg-white border-r border-gray-200 flex flex-col shrink-0",
          "fixed lg:static inset-y-0 left-0 z-40 lg:z-auto transition-transform lg:translate-x-0",
          showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-3 border-b border-gray-200">
          <button
            onClick={() => {
              handleNewConversation();
              setShowSidebar(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--color-gold)] text-[var(--color-navy)] font-semibold rounded-lg hover:bg-[#D4922E] transition-colors text-sm"
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loadingConversations && (
            <div className="text-center text-gray-400 text-sm py-8">
              Loading...
            </div>
          )}

          {!loadingConversations && conversations.length === 0 && (
            <div className="text-center text-gray-400 text-sm py-8 px-4">
              No conversations yet.
              <br />
              Start a new chat above!
            </div>
          )}

          {conversations.map((convo) => (
            <button
              key={convo.id}
              onClick={() => {
                setActiveConversation(convo.id);
                setShowSidebar(false);
              }}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm transition-colors",
                activeConversation === convo.id
                  ? "bg-[var(--color-navy)] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <MessageSquare size={14} className="flex-shrink-0" />
              <span className="truncate flex-1">{convo.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            loading={loading}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-[var(--color-gold)]/10 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="text-[var(--color-gold)]" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-2">
              AI Exam Tutor
            </h2>
            <p className="text-gray-500 max-w-md mb-6">
              Ask questions about any subject, get explanations, solve problems,
              and prepare for your exams with your personal AI tutor.
            </p>
            <button
              onClick={handleNewConversation}
              className="px-6 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] font-semibold rounded-lg hover:bg-[#D4922E] transition-colors"
            >
              Start a Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
