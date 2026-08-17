"use client";

import {
  CheckCircle,
  Circle,
  Clock,
  BookOpen,
  Repeat,
  Target,
  Coffee,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

const TYPE_CONFIG = {
  study: {
    icon: BookOpen,
    color: "text-[var(--color-green)]",
    bg: "bg-[var(--color-green)]/10",
    label: "Study",
  },
  revision: {
    icon: Repeat,
    color: "text-[var(--color-gold)]",
    bg: "bg-[var(--color-gold)]/10",
    label: "Revision",
  },
  practice: {
    icon: Target,
    color: "text-[var(--color-blue)]",
    bg: "bg-[var(--color-blue)]/10",
    label: "Practice",
  },
  rest: {
    icon: Coffee,
    color: "text-gray-500",
    bg: "bg-gray-100",
    label: "Rest",
  },
};

const PRIORITY_DOT = {
  high: "bg-red-400",
  medium: "bg-[var(--color-gold)]",
  low: "bg-gray-300",
};

interface DayPlanCardProps {
  day: DayPlan;
  onToggleTask: (taskId: string, completed: boolean) => void;
}

export function DayPlanCard({ day, onToggleTask }: DayPlanCardProps) {
  const completedCount = day.tasks.filter((t) => t.completed).length;
  const totalCount = day.tasks.length;
  const totalMinutes = day.tasks.reduce((s, t) => s + t.duration, 0);

  const isToday =
    day.date === new Date().toISOString().split("T")[0];
  const isPast =
    new Date(day.date) < new Date(new Date().toDateString());

  return (
    <div
      className={cn(
        "border rounded-xl overflow-hidden",
        isToday && "border-[var(--color-gold)] ring-1 ring-[var(--color-gold)]/20",
        isPast && !isToday && "opacity-70",
        !isToday && !isPast && "border-gray-200"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "text-xs font-bold px-2 py-0.5 rounded-full",
              isToday
                ? "bg-[var(--color-gold)] text-[var(--color-navy)]"
                : isPast
                ? "bg-gray-200 text-gray-500"
                : "bg-gray-100 text-gray-600"
            )}
          >
            {isToday ? "TODAY" : isPast ? "DONE" : `Day ${day.dayNumber}`}
          </span>
          <span className="font-semibold text-[var(--color-navy)] text-sm">
            {day.label}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
          </span>
          <span>
            {completedCount}/{totalCount}
          </span>
        </div>
      </div>

      {/* Tasks */}
      <div className="divide-y">
        {day.tasks.map((task) => {
          const config = TYPE_CONFIG[task.type];
          const Icon = config.icon;

          return (
            <button
              key={task.id}
              onClick={() => onToggleTask(task.id, !task.completed)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors",
                task.completed && "bg-green-50/50"
              )}
            >
              {task.completed ? (
                <CheckCircle size={18} className="text-[var(--color-green)] shrink-0" />
              ) : (
                <Circle size={18} className="text-gray-300 shrink-0" />
              )}
              <div
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                  config.bg
                )}
              >
                <Icon size={14} className={config.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-sm font-medium truncate",
                      task.completed
                        ? "text-gray-400 line-through"
                        : "text-[var(--color-navy)]"
                    )}
                  >
                    {task.topic}
                  </span>
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full shrink-0",
                      PRIORITY_DOT[task.priority]
                    )}
                  />
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {task.description}
                </p>
              </div>
              <span className="text-xs text-gray-400 shrink-0">
                {task.duration}m
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
