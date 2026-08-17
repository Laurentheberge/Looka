"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Question {
  id: string;
  examType: string;
  subject: string;
  year: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topics: string[];
}

interface QuestionCardProps {
  question: Question;
  bookmarked?: boolean;
  onBookmark?: (questionId: string) => void;
}

export function QuestionCard({
  question,
  bookmarked = false,
  onBookmark,
}: QuestionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const isCorrect = selectedOption === question.correctAnswer;

  const handleAnswer = (option: string) => {
    if (answered) return;
    setSelectedOption(option);
    setAnswered(true);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
              {question.examType.toUpperCase()}
            </span>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
              {question.subject}
            </span>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
              {question.year}
            </span>
          </div>
          <p className="text-gray-800 font-medium">{question.questionText}</p>
        </div>

        <div className="flex items-center gap-1 ml-3">
          {onBookmark && (
            <button
              onClick={() => onBookmark(question.id)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              title={bookmarked ? "Remove bookmark" : "Bookmark"}
            >
              {bookmarked ? (
                <BookmarkCheck className="text-[var(--color-gold)]" size={18} />
              ) : (
                <Bookmark className="text-gray-400" size={18} />
              )}
            </button>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="Show explanation"
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {expanded ? (
              <ChevronUp className="text-gray-500" size={18} />
            ) : (
              <ChevronDown className="text-gray-500" size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Options (always visible) */}
      <div className="px-4 pb-4 space-y-2">
        {question.options.map((option, index) => {
          const letter = String.fromCharCode(65 + index);
          const isSelected = selectedOption === option;
          const isRight = option === question.correctAnswer;
          const showResult = answered;

          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={answered}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg border text-left text-sm transition-all",
                !showResult && !isSelected &&
                  "border-gray-200 hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/5",
                showResult && isRight &&
                  "border-[var(--color-green)] bg-[var(--color-green)]/5 text-[var(--color-green)]",
                showResult && isSelected && !isRight &&
                  "border-red-400 bg-red-50 text-red-700",
                showResult && !isSelected && !isRight &&
                  "border-gray-200 opacity-50",
                !showResult && isSelected &&
                  "border-[var(--color-gold)] bg-[var(--color-gold)]/5"
              )}
            >
              <span
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0",
                  !showResult && "bg-gray-100 text-gray-600",
                  showResult && isRight && "bg-[var(--color-green)] text-white",
                  showResult && isSelected && !isRight && "bg-red-500 text-white",
                  showResult && !isSelected && !isRight && "bg-gray-100 text-gray-600"
                )}
              >
                {showResult && isRight ? (
                  <CheckCircle size={14} />
                ) : showResult && isSelected && !isRight ? (
                  <XCircle size={14} />
                ) : (
                  letter
                )}
              </span>
              <span className="flex-1">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Expanded: Explanation + Topics */}
      {expanded && (
        <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-3">
          {answered && (
            <div
              className={cn(
                "p-3 rounded-lg text-sm",
                isCorrect
                  ? "bg-[var(--color-green)]/10 text-[var(--color-green)]"
                  : "bg-red-50 text-red-700"
              )}
            >
              {isCorrect
                ? "Correct! Well done."
                : `Incorrect. The correct answer is: ${question.correctAnswer}`}
            </div>
          )}

          {question.explanation && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Explanation
              </h4>
              <p className="text-sm text-gray-700">{question.explanation}</p>
            </div>
          )}

          {question.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {question.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 bg-[var(--color-paper)] text-[var(--color-ink)] rounded text-xs"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
