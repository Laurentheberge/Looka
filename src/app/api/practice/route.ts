import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { verifyAuthToken } from "@/lib/firebase/admin";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are an exam question generator for Cameroonian students preparing for GCE and BAC exams.

Generate practice questions in JSON format. Each question must have:
- question: the question text
- options: array of exactly 4 options
- correctAnswer: the correct option text (must match one of the options exactly)
- explanation: brief explanation of the answer

Return ONLY a valid JSON array, no markdown, no extra text.

Example:
[
  {
    "question": "What is 2 + 2?",
    "options": ["3", "4", "5", "6"],
    "correctAnswer": "4",
    "answerIndex": 1,
    "explanation": "2 + 2 = 4"
  }
]

Make questions appropriate for high school students. Vary difficulty (easy, medium, hard).
Topics should cover the requested subject.`;

export async function POST(request: NextRequest) {
  try {
    const token = await verifyAuthToken(request);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { subject, topic, count = 5 } = body;

    if (!subject || typeof subject !== "string") {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    // Clamp count to prevent token abuse
    const safeCount = Math.min(Math.max(Number(count) || 5, 1), 20);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const topicText = topic && typeof topic === "string" ? ` focusing on ${topic.slice(0, 200)}` : "";
    const prompt = `Generate ${safeCount} multiple choice practice questions for ${subject.slice(0, 100)}${topicText}.
Each question must have exactly 4 options.
Make sure the correctAnswer matches one of the options exactly.
Return ONLY a JSON array.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse JSON from response (handle markdown code blocks)
    let jsonStr = text.trim();
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const questions = JSON.parse(jsonStr);

    // Validate and normalize
    const valid = questions.map((q: Record<string, unknown>, i: number) => ({
      id: `gen-${Date.now()}-${i}`,
      question: q.question || q.questionText || "",
      options: Array.isArray(q.options) ? q.options.slice(0, 4) : [],
      correctAnswer: q.correctAnswer || "",
      answerIndex: typeof q.answerIndex === "number" ? q.answerIndex : -1,
      explanation: q.explanation || "",
    }));

    return NextResponse.json({ questions: valid });
  } catch (error) {
    console.error("Practice API error:", error);
    return NextResponse.json(
      { error: "Failed to generate questions. Please try again." },
      { status: 500 }
    );
  }
}
