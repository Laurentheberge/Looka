"use client";

import { useState, useEffect } from "react";
import { Search, Filter, BookOpen, Bookmark } from "lucide-react";
import { QuestionCard, type Question } from "@/components/questions/question-card";
import { getQuestions, getBookmarks, addBookmark, removeBookmark } from "@/lib/firebase/firestore";
import { useAuth } from "@/lib/contexts/auth-context";
import { Button } from "@/components/ui/button";

const EXAM_TYPES = ["All", "GCE", "BAC", "Other"];
const SUBJECTS = [
  "All",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "French",
  "History",
  "Geography",
  "Economics",
];
const YEARS = ["All", "2024", "2023", "2022", "2021", "2020"];

export default function PastQuestionsPage() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [bookmarkMap, setBookmarkMap] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const [filters, setFilters] = useState({
    examType: "All",
    subject: "All",
    year: "All",
    search: "",
  });

  useEffect(() => {
    loadQuestions();
  }, [filters.examType, filters.subject, filters.year]);

  useEffect(() => {
    if (user) loadBookmarks();
  }, [user]);

  async function loadQuestions() {
    setLoading(true);
    try {
      const examType = filters.examType === "All" ? undefined : filters.examType.toLowerCase();
      const subject = filters.subject === "All" ? undefined : filters.subject;
      const year = filters.year === "All" ? undefined : parseInt(filters.year);
      const data = await getQuestions(examType, subject, year) as unknown as Question[];
      setQuestions(data);
    } catch (err) {
      console.error("Failed to load questions:", err);
      setError("Failed to load questions. Please try again later.");
      setQuestions([]);
    }
    setLoading(false);
  }

  async function loadBookmarks() {
    if (!user) return;
    try {
      const bookmarks = await getBookmarks(user.uid) as unknown as Array<{ id: string; questionId: string }>;
      const ids = new Set(bookmarks.map((b) => b.questionId));
      const map = new Map(bookmarks.map((b) => [b.questionId, b.id]));
      setBookmarkedIds(ids);
      setBookmarkMap(map);
    } catch (err) {
      console.error("Failed to load bookmarks:", err);
    }
  }

  async function handleBookmark(questionId: string) {
    if (!user) return;

    if (bookmarkedIds.has(questionId)) {
      const bookmarkId = bookmarkMap.get(questionId);
      if (bookmarkId) {
        await removeBookmark(bookmarkId);
        setBookmarkedIds((prev) => {
          const next = new Set(prev);
          next.delete(questionId);
          return next;
        });
        setBookmarkMap((prev) => {
          const next = new Map(prev);
          next.delete(questionId);
          return next;
        });
      }
    } else {
      const docRef = await addBookmark(user.uid, questionId);
      setBookmarkedIds((prev) => new Set(prev).add(questionId));
      setBookmarkMap((prev) => new Map(prev).set(questionId, docRef.id));
    }
  }

  const filtered = questions.filter((q) => {
    const matchesSearch =
      !filters.search ||
      q.questionText.toLowerCase().includes(filters.search.toLowerCase()) ||
      q.subject.toLowerCase().includes(filters.search.toLowerCase());

    const matchesBookmark = !showBookmarkedOnly || bookmarkedIds.has(q.id);

    return matchesSearch && matchesBookmark;
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-navy)]">
          Past Questions
        </h1>
        <p className="text-gray-600 mt-1">
          Browse GCE, BAC, and class exam questions
        </p>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search questions..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 text-sm"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={showBookmarkedOnly ? "default" : "outline"}
            onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
            className="gap-2"
          >
            <Bookmark size={16} />
            Bookmarked
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter size={16} />
            Filters
          </Button>
        </div>
      </div>

      {/* Filter Dropdowns */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Exam Type
            </label>
            <select
              value={filters.examType}
              onChange={(e) => setFilters({ ...filters, examType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[var(--color-gold)]"
            >
              {EXAM_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Subject
            </label>
            <select
              value={filters.subject}
              onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[var(--color-gold)]"
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Year
            </label>
            <select
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[var(--color-gold)]"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-500 mb-4">
        {filtered.length} question{filtered.length !== 1 ? "s" : ""} found
      </div>

      {/* Questions List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="space-y-2">
                <div className="h-10 bg-gray-100 rounded" />
                <div className="h-10 bg-gray-100 rounded" />
                <div className="h-10 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <BookOpen className="mx-auto text-red-300 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-700 mb-1">
            {error}
          </h3>
          <button
            onClick={() => {
              setError(null);
              loadQuestions();
            }}
            className="mt-4 px-4 py-2 bg-[var(--color-gold)] text-[var(--color-navy)] font-semibold rounded-lg hover:bg-[#D4922E] transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-700 mb-1">
            No questions found
          </h3>
          <p className="text-gray-500 text-sm">
            Try adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              bookmarked={bookmarkedIds.has(q.id)}
              onBookmark={handleBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Mock data for development / when Firestore is empty
const MOCK_QUESTIONS: Question[] = [
  {
    id: "mock-1",
    examType: "GCE",
    subject: "Mathematics",
    year: 2024,
    questionText: "Solve the quadratic equation: x² + 5x + 6 = 0",
    options: ["x = -2, x = -3", "x = 2, x = 3", "x = -2, x = 3", "x = 2, x = -3"],
    correctAnswer: "x = -2, x = -3",
    explanation:
      "Factor the equation: x² + 5x + 6 = (x + 2)(x + 3) = 0. Therefore x = -2 or x = -3.",
    topics: ["algebra", "quadratic equations"],
  },
  {
    id: "mock-2",
    examType: "GCE",
    subject: "Mathematics",
    year: 2024,
    questionText: "If f(x) = 2x² - 3x + 1, find f(2).",
    options: ["3", "5", "7", "11"],
    correctAnswer: "3",
    explanation:
      "f(2) = 2(2)² - 3(2) + 1 = 2(4) - 6 + 1 = 8 - 6 + 1 = 3",
    topics: ["functions", "substitution"],
  },
  {
    id: "mock-3",
    examType: "GCE",
    subject: "Physics",
    year: 2023,
    questionText:
      "A body of mass 5 kg is acted upon by a force of 20 N. What is its acceleration?",
    options: ["2 m/s²", "4 m/s²", "100 m/s²", "25 m/s²"],
    correctAnswer: "4 m/s²",
    explanation:
      "Using Newton's second law: F = ma, so a = F/m = 20/5 = 4 m/s².",
    topics: ["Newton's laws", "force and motion"],
  },
  {
    id: "mock-4",
    examType: "BAC",
    subject: "Chemistry",
    year: 2023,
    questionText:
      "What is the pH of a solution with a hydrogen ion concentration of 0.001 mol/L?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3",
    explanation:
      "pH = -log[H⁺] = -log(0.001) = -log(10⁻³) = 3",
    topics: ["pH", "acids and bases"],
  },
  {
    id: "mock-5",
    examType: "GCE",
    subject: "Biology",
    year: 2024,
    questionText: "Which organelle is responsible for photosynthesis in plant cells?",
    options: ["Mitochondria", "Chloroplast", "Ribosome", "Nucleus"],
    correctAnswer: "Chloroplast",
    explanation:
      "Chloroplasts contain chlorophyll which captures light energy for photosynthesis. They are found only in plant cells.",
    topics: ["cell biology", "photosynthesis"],
  },
  {
    id: "mock-6",
    examType: "BAC",
    subject: "English",
    year: 2022,
    questionText:
      'Choose the correct sentence: "She _____ to the market yesterday."',
    options: ["go", "goes", "went", "has gone"],
    correctAnswer: "went",
    explanation:
      '"Went" is the simple past tense of "go", which is used for completed actions in the past. "Yesterday" indicates past time.',
    topics: ["grammar", "past tense"],
  },
  {
    id: "mock-7",
    examType: "GCE",
    subject: "Mathematics",
    year: 2022,
    questionText:
      "Find the value of sin(30°) + cos(60°).",
    options: ["0.5", "1", "1.5", "0"],
    correctAnswer: "1",
    explanation:
      "sin(30°) = 0.5 and cos(60°) = 0.5. Therefore sin(30°) + cos(60°) = 0.5 + 0.5 = 1.",
    topics: ["trigonometry", "exact values"],
  },
  {
    id: "mock-8",
    examType: "GCE",
    subject: "Geography",
    year: 2023,
    questionText:
      "What is the main cause of seasonal changes on Earth?",
    options: [
      "Distance from the Sun",
      "Earth's tilted axis",
      "The Moon's gravity",
      "Ocean currents",
    ],
    correctAnswer: "Earth's tilted axis",
    explanation:
      "Earth's axis is tilted at approximately 23.5°. As Earth orbits the Sun, different parts receive more or less direct sunlight, causing seasons.",
    topics: ["earth science", "seasons"],
  },
];
