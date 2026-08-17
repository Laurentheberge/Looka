"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ChevronRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface MCQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface MCQQuizProps {
  questions: MCQuestion[];
  onComplete: (results: {
    score: number;
    total: number;
    answers: { questionId: string; correct: boolean; selected: string }[];
  }) => void;
}

export function MCQQuiz({ questions, onComplete }: MCQQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<
    { questionId: string; correct: boolean; selected: string }[]
  >([]);

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const correctSoFar = answers.filter((a) => a.correct).length;

  function handleSelect(option: string) {
    if (answered) return;
    setSelected(option);
    setAnswered(true);

    const isCorrect = option === question.correctAnswer;

    setAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        correct: isCorrect,
        selected: option,
      },
    ]);
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const finalAnswers = [
        ...answers,
        // The last answer is already in state from handleSelect
      ];
      const score = finalAnswers.filter((a) => a.correct).length;
      onComplete({
        score,
        total: questions.length,
        answers: finalAnswers,
      });
    }
  }

  if (questions.length === 0) return null;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="font-medium text-[var(--color-green)]">
            {correctSoFar} correct
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-gold)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <p className="text-lg text-gray-800 font-medium mb-6">
          {question.question}
        </p>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const letter = String.fromCharCode(65 + index);
            const isSelected = selected === option;
            const isCorrect = option === question.correctAnswer;
            const showResult = answered;

            return (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                disabled={answered}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all",
                  !showResult && !isSelected &&
                    "border-gray-200 hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/5",
                  showResult && isCorrect &&
                    "border-[var(--color-green)] bg-[var(--color-green)]/5",
                  showResult && isSelected && !isCorrect &&
                    "border-red-400 bg-red-50",
                  showResult && !isSelected && !isCorrect &&
                    "border-gray-200 opacity-50",
                  !showResult && isSelected &&
                    "border-[var(--color-gold)] bg-[var(--color-gold)]/5"
                )}
              >
                <span
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0",
                    !showResult && "bg-gray-100 text-gray-600",
                    showResult && isCorrect && "bg-[var(--color-green)] text-white",
                    showResult && isSelected && !isCorrect && "bg-red-500 text-white",
                    showResult && !isSelected && !isCorrect && "bg-gray-100 text-gray-600"
                  )}
                >
                  {showResult && isCorrect ? (
                    <CheckCircle size={16} />
                  ) : showResult && isSelected && !isCorrect ? (
                    <XCircle size={16} />
                  ) : (
                    letter
                  )}
                </span>
                <span className="flex-1 text-sm">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation + Next */}
      {answered && (
        <div className="space-y-4">
          <div
            className={cn(
              "p-4 rounded-xl text-sm",
              selected === question.correctAnswer
                ? "bg-[var(--color-green)]/10 text-[var(--color-green)]"
                : "bg-red-50 text-red-700"
            )}
          >
            {selected === question.correctAnswer
              ? "Correct! Well done."
              : `Incorrect. The correct answer is: ${question.correctAnswer}`}
          </div>

          {question.explanation && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Explanation
              </h4>
              <p className="text-sm text-gray-700">{question.explanation}</p>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              className="gap-1 bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[#D4922E]"
            >
              {currentIndex < questions.length - 1 ? (
                <>
                  Next Question
                  <ChevronRight size={16} />
                </>
              ) : (
                <>
                  See Results
                  <Trophy size={16} />
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
