import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { verifyAuthToken } from "@/lib/firebase/admin";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface TopicInput {
  name: string;
  weight?: string;
}

interface DailyTask {
  subject: string;
  topic: string;
  type: "study" | "revision" | "practice" | "rest";
  duration: number;
  description: string;
  priority: "high" | "medium" | "low";
}

interface DayPlan {
  date: string;
  dayNumber: number;
  label: string;
  tasks: DailyTask[];
}

export async function POST(req: NextRequest) {
  try {
    const token = await verifyAuthToken(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      subject,
      topics,
      examDate,
      dailyHours,
      difficulty,
    } = body as {
      subject: string;
      topics: TopicInput[];
      examDate: string;
      dailyHours: number;
      difficulty: "beginner" | "intermediate" | "advanced";
    };

    if (!subject || !examDate) {
      return NextResponse.json(
        { error: "Subject and exam date are required" },
        { status: 400 }
      );
    }

    const today = new Date();
    const exam = new Date(examDate);
    const daysLeft = Math.ceil(
      (exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft <= 0) {
      return NextResponse.json(
        { error: "Exam date must be in the future" },
        { status: 400 }
      );
    }

    const topicList =
      topics.length > 0
        ? topics
            .map(
              (t) =>
                `- ${t.name}${t.weight ? ` (Exam weight: ${t.weight})` : ""}`
            )
            .join("\n")
        : "No specific topics provided — generate a comprehensive plan based on typical syllabus.";

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are an expert study planner for Cameroonian students (GCE, BAC, class exams).

Create a detailed study plan for:
- Subject: ${subject}
- Days until exam: ${daysLeft}
- Available daily study hours: ${dailyHours}
- Difficulty level: ${difficulty}
- Exam date: ${examDate}

Topics:
${topicList}

RULES:
1. Distribute topics logically across available days
2. Include revision days and practice sessions
3. Prioritize high-weight topics
4. Include rest/light days for retention
5. Mix study types: study, revision, practice, rest
6. Each task must have a duration (in minutes), type, and brief description
7. Plan exactly from today (${today.toISOString().split("T")[0]}) until the exam date

Return a JSON array of day plans. Each day plan:
{
  "date": "YYYY-MM-DD",
  "dayNumber": 1,
  "label": "Day 1 - Topic Focus",
  "tasks": [
    {
      "subject": "Subject Name",
      "topic": "Specific Topic",
      "type": "study|revision|practice|rest",
      "duration": 60,
      "description": "Brief description of what to do",
      "priority": "high|medium|low"
    }
  ]
}

Return ONLY the JSON array, no other text.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from response
    let plans: DayPlan[];
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("No JSON array found in response");
      }
      plans = JSON.parse(jsonMatch[0]);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse study plan" },
        { status: 500 }
      );
    }

    // Add IDs to tasks
    const planWithIds = plans.map((day) => ({
      ...day,
      tasks: day.tasks.map((task, i) => ({
        ...task,
        id: `${day.date}-${i}`,
      })),
    }));

    return NextResponse.json({
      subject,
      examDate,
      dailyHours,
      difficulty,
      startDate: today.toISOString().split("T")[0],
      totalDays: daysLeft,
      plan: planWithIds,
    });
  } catch (error) {
    console.error("Study plan generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate study plan" },
      { status: 500 }
    );
  }
}
