"use client";

import { useState } from "react";
import { RotateCcw, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardDeckProps {
  cards: Flashcard[];
  onComplete: (results: { known: string[]; unknown: string[] }) => void;
}

export function FlashcardDeck({ cards, onComplete }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [unknown, setUnknown] = useState<string[]>([]);

  const card = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  function handleKnow() {
    setKnown((prev) => [...prev, card.id]);
    goNext();
  }

  function handleDontKnow() {
    setUnknown((prev) => [...prev, card.id]);
    goNext();
  }

  function goNext() {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setFlipped(false);
    } else {
      onComplete({
        known: [...known, card.id],
        unknown,
      });
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setFlipped(false);
    }
  }

  if (cards.length === 0) return null;

  return (
    <div className="flex flex-col items-center">
      {/* Progress */}
      <div className="w-full max-w-lg mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>
            Card {currentIndex + 1} of {cards.length}
          </span>
          <span>
            {known.length} known / {unknown.length} to review
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-gold)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div
        onClick={() => setFlipped(!flipped)}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((prev) => !prev);
          }
        }}
        className="w-full max-w-lg h-64 cursor-pointer perspective-1000 mb-6"
      >
        <div
          className={cn(
            "relative w-full h-full transition-transform duration-500 transform-style-3d",
            flipped && "rotate-y-180"
          )}
        >
          {/* Front */}
          <div
            className={cn(
              "absolute inset-0 backface-hidden bg-white border-2 border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center",
              flipped && "invisible"
            )}
          >
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Question
            </span>
            <p className="text-lg text-gray-800 font-medium">
              {card.question}
            </p>
            <p className="text-sm text-gray-400 mt-6 flex items-center gap-1">
              <RotateCcw size={14} />
              Tap to reveal answer
            </p>
          </div>

          {/* Back */}
          <div
            className={cn(
              "absolute inset-0 backface-hidden rotate-y-180 bg-[var(--color-navy)] text-white rounded-2xl flex flex-col items-center justify-center p-8 text-center",
              !flipped && "invisible"
            )}
          >
            <span className="text-xs font-medium text-[var(--color-gold)] uppercase tracking-wider mb-4">
              Answer
            </span>
            <p className="text-lg leading-relaxed">{card.answer}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="gap-1"
        >
          <ChevronLeft size={16} />
          Back
        </Button>

        <Button
          variant="outline"
          onClick={handleDontKnow}
          className="gap-1 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <X size={16} />
          Still Learning
        </Button>

        <Button
          onClick={handleKnow}
          className="gap-1 bg-[var(--color-green)] hover:bg-[#245a40] text-white"
        >
          <Check size={16} />
          Got It
        </Button>

        <Button
          variant="outline"
          onClick={goNext}
          disabled={currentIndex === cards.length - 1}
          className="gap-1"
        >
          Next
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
