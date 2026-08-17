"use client";

import { Trophy, RotateCcw, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResultsProps {
  score: number;
  total: number;
  mode: "flashcards" | "mcq";
  onRetry: () => void;
  onNewSession: () => void;
}

export function Results({
  score,
  total,
  mode,
  onRetry,
  onNewSession,
}: ResultsProps) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isGood = percentage >= 70;

  return (
    <div className="max-w-md mx-auto text-center py-8">
      <div
        className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
          isGood ? "bg-[var(--color-green)]/10" : "bg-[var(--color-gold)]/10"
        )}
      >
        <Trophy
          className={isGood ? "text-[var(--color-green)]" : "text-[var(--color-gold)]"}
          size={40}
        />
      </div>

      <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-2">
        {isGood ? "Great Job!" : "Keep Practicing!"}
      </h2>

      <p className="text-gray-600 mb-6">
        {mode === "flashcards"
          ? `You knew ${score} out of ${total} cards`
          : `You scored ${score} out of ${total}`}
      </p>

      {/* Score Circle */}
      <div className="relative w-32 h-32 mx-auto mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={isGood ? "#2F6E4F" : "#E8A33D"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(percentage / 100) * 339.292} 339.292`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-[var(--color-navy)]">
            {percentage}%
          </span>
          <span className="text-xs text-gray-500">score</span>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Button variant="outline" onClick={onRetry} className="gap-1">
          <RotateCcw size={16} />
          Try Again
        </Button>
        <Button
          onClick={onNewSession}
          className="gap-1 bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[#D4922E]"
        >
          New Session
        </Button>
      </div>
    </div>
  );
}
