"use client";

import Link from "next/link";
import {
  MessageSquare,
  BookOpen,
  FileText,
  Calendar,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/lib/contexts/auth-context";

const quickActions = [
  {
    label: "AI Chat",
    description: "Ask the AI tutor anything",
    href: "/chat",
    icon: MessageSquare,
    color: "bg-blue-500",
  },
  {
    label: "Past Questions",
    description: "Browse exam questions",
    href: "/past-questions",
    icon: BookOpen,
    color: "bg-[var(--color-green)]",
  },
  {
    label: "Summarize Notes",
    description: "Upload and summarize",
    href: "/notes",
    icon: FileText,
    color: "bg-purple-500",
  },
  {
    label: "Practice",
    description: "Flashcards & MCQs",
    href: "/practice",
    icon: Calendar,
    color: "bg-[var(--color-gold)]",
  },
];

export default function DashboardPage() {
  const { userData, user } = useAuth();
  const displayName = userData?.name || user?.displayName || "there";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-navy)]">
          Welcome back, {displayName.split(" ")[0]}!
        </h1>
        <p className="text-gray-600 mt-1">
          Pick up where you left off or start something new.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="bg-white rounded-xl p-5 border border-gray-200 hover:border-[var(--color-gold)] hover:shadow-md transition-all group"
          >
            <div
              className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}
            >
              <action.icon className="text-white" size={20} />
            </div>
            <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors">
              {action.label}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{action.description}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-[var(--color-paper)] rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="text-[var(--color-gold)]" size={32} />
        </div>
        <h2 className="text-xl font-semibold text-[var(--color-navy)] mb-2">
          Start Your First Project
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Create a project to organize your study materials, track progress, and
          unlock AI-powered features.
        </p>
        <Link
          href="/new-project"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] font-semibold rounded-lg hover:bg-[#D4922E] transition-colors"
        >
          Create Project
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
