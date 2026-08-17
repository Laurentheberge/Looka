"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Loader2,
  Plus,
  Trash2,
  Sparkles,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DayPlanCard } from "@/components/study-plan/day-plan-card";
import { createStudyPlan, updateStudyPlanTask } from "@/lib/firebase/firestore";
import { useAuth } from "@/lib/contexts/auth-context";
import { cn } from "@/lib/utils";

type View = "setup" | "generating" | "plan";

interface TopicInput {
  name: string;
  weight: string;
}

interface Task {
  id: string;
  subject: string;
  topic: string;
  type: "study" | "revision" | "practice" | "rest";
  duration: number;
  description: string;
  priority: "high" | "medium" | "low";
  completed?: boolean;
}

interface DayPlan {
  date: string;
  dayNumber: number;
  label: string;
  tasks: Task[];
}

export default function StudyPlanPage() {
  const { user, isPro } = useAuth();
  const [view, setView] = useState<View>("setup");
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState<TopicInput[]>([
    { name: "", weight: "" },
  ]);
  const [examDate, setExamDate] = useState("");
  const [dailyHours, setDailyHours] = useState(3);
  const [difficulty, setDifficulty] = useState<
    "beginner" | "intermediate" | "advanced"
  >("intermediate");
  const [plan, setPlan] = useState<DayPlan[]>([]);
  const [error, setError] = useState("");
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(
    new Set()
  );

  // Pro gate
  if (!isPro) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="w-20 h-20 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center mx-auto mb-6">
          <Lock className="text-[var(--color-gold)]" size={36} />
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-2">
          Study Planner is a Pro Feature
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Get AI-generated study schedules tailored to your exam date, subjects,
          and available hours. Upgrade to Pro to unlock.
        </p>
        <Button className="bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[#D4922E] font-semibold gap-2">
          Upgrade to Pro
        </Button>
      </div>
    );
  }

  function addTopic() {
    setTopics([...topics, { name: "", weight: "" }]);
  }

  function removeTopic(index: number) {
    setTopics(topics.filter((_, i) => i !== index));
  }

  function updateTopic(
    index: number,
    field: "name" | "weight",
    value: string
  ) {
    const updated = [...topics];
    updated[index] = { ...updated[index], [field]: value };
    setTopics(updated);
  }

  async function handleGenerate() {
    if (!subject || !examDate) return;
    setView("generating");
    setError("");

    try {
      const validTopics = topics.filter((t) => t.name.trim());
      const res = await fetch("/api/study-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          topics: validTopics,
          examDate,
          dailyHours,
          difficulty,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate plan");

      setPlan(data.plan);
      setView("plan");

      // Save to Firestore
      if (user) {
        createStudyPlan(user.uid, {
          subject,
          examDate,
          dailyHours,
          difficulty,
          totalDays: data.totalDays,
          plan: data.plan,
        }).catch(console.error);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate study plan"
      );
      setView("setup");
    }
  }

  async function handleToggleTask(dayIndex: number, taskId: string) {
    const newCompleted = new Set(completedTasks);
    const isCompleted = newCompleted.has(taskId);

    if (isCompleted) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }

    setCompletedTasks(newCompleted);

    // Update Firestore
    updateStudyPlanTask(taskId, !isCompleted).catch(console.error);

    // Update local state
    const updated = [...plan];
    updated[dayIndex] = {
      ...updated[dayIndex],
      tasks: updated[dayIndex].tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !isCompleted } : t
      ),
    };
    setPlan(updated);
  }

  function handleNewPlan() {
    setView("setup");
    setPlan([]);
    setSubject("");
    setTopics([{ name: "", weight: "" }]);
    setExamDate("");
    setCompletedTasks(new Set());
  }

  const totalTasks = plan.reduce((s, d) => s + d.tasks.length, 0);
  const doneTasks = completedTasks.size;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-navy)]">
            Study Planner
          </h1>
          <p className="text-gray-600 mt-1">
            AI-generated schedule for your exam
          </p>
        </div>
        {view === "plan" && (
          <Button
            variant="outline"
            onClick={handleNewPlan}
            className="gap-1"
          >
            <Plus size={16} />
            New Plan
          </Button>
        )}
      </div>

      {/* Setup View */}
      {view === "setup" && (
        <div className="space-y-6">
          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="e.g. Mathematics, Physics, English..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20"
            />
          </div>

          {/* Topics */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topics to cover
              <span className="text-gray-400 font-normal ml-1">
                (optional — AI will generate based on typical syllabus)
              </span>
            </label>
            <div className="space-y-2">
              {topics.map((topic, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Topic name"
                    value={topic.name}
                    onChange={(e) => updateTopic(i, "name", e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[var(--color-gold)]"
                  />
                  <input
                    type="text"
                    placeholder="Exam weight (optional)"
                    value={topic.weight}
                    onChange={(e) => updateTopic(i, "weight", e.target.value)}
                    className="w-36 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[var(--color-gold)]"
                  />
                  {topics.length > 1 && (
                    <button
                      onClick={() => removeTopic(i)}
                      className="px-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addTopic}
              className="mt-2 text-sm text-[var(--color-gold)] hover:underline flex items-center gap-1"
            >
              <Plus size={14} />
              Add topic
            </button>
          </div>

          {/* Exam Date + Daily Hours */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="exam-date" className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar size={14} className="inline mr-1" />
                Exam Date
              </label>
              <input
                type="date"
                id="exam-date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[var(--color-gold)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Clock size={14} className="inline mr-1" />
                Daily study hours
              </label>
              <select
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[var(--color-gold)]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((h) => (
                  <option key={h} value={h}>
                    {h} hour{h > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty level
            </label>
            <div className="flex gap-3">
              {(["beginner", "intermediate", "advanced"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    "flex-1 py-2.5 rounded-lg border-2 text-sm font-medium capitalize transition-all",
                    difficulty === d
                      ? "border-[var(--color-gold)] bg-[var(--color-gold)]/5 text-[var(--color-navy)]"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={!subject || !examDate}
            className="w-full py-6 text-base bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[#D4922E] font-semibold gap-2"
          >
            <Sparkles size={18} />
            Generate Study Plan
          </Button>
        </div>
      )}

      {/* Generating View */}
      {view === "generating" && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-[var(--color-gold)] animate-spin mb-4" />
          <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-1">
            Building Your Study Plan
          </h3>
          <p className="text-gray-500">
            Creating a personalized {subject} schedule...
          </p>
        </div>
      )}

      {/* Plan View */}
      {view === "plan" && (
        <div>
          {/* Stats */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="text-center flex-1">
              <p className="text-2xl font-bold text-[var(--color-navy)]">
                {plan.length}
              </p>
              <p className="text-xs text-gray-500">days</p>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center flex-1">
              <p className="text-2xl font-bold text-[var(--color-navy)]">
                {doneTasks}/{totalTasks}
              </p>
              <p className="text-xs text-gray-500">tasks done</p>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center flex-1">
              <p className="text-2xl font-bold text-[var(--color-navy)]">
                {totalTasks > 0
                  ? Math.round((doneTasks / totalTasks) * 100)
                  : 0}
                %
              </p>
              <p className="text-xs text-gray-500">progress</p>
            </div>
          </div>

          {/* Day Cards */}
          <div className="space-y-4">
            {plan.map((day, i) => (
              <DayPlanCard
                key={day.date}
                day={day}
                onToggleTask={(taskId, completed) =>
                  handleToggleTask(i, taskId)
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
