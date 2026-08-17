import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { verifyAuthToken } from "@/lib/firebase/admin";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are Looka, an AI exam tutor for Cameroonian students. You help students prepare for GCE (General Certificate of Education), BAC (Baccalauréat), and class exams.

Your guidelines:
- Be friendly, encouraging, and patient
- Explain concepts clearly with examples relevant to Cameroon
- Use simple language a high school student would understand
- When solving math problems, show step-by-step working
- For science questions, relate to real-life examples
- Encourage active learning - don't just give answers, help students understand
- If a student asks about a topic you're unsure about, be honest and guide them to reliable resources
- You can help with: Mathematics, Physics, Chemistry, Biology, English, French, History, Geography, Economics
- Keep responses concise but thorough enough to be helpful`;

const MAX_HISTORY = 50;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = await verifyAuthToken(request);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: "Message too long" },
        { status: 400 }
      );
    }

    // Clamp history to prevent token abuse
    const safeHistory = (Array.isArray(history) ? history : [])
      .slice(-MAX_HISTORY)
      .filter(
        (msg: unknown): msg is { role: string; content: string } =>
          typeof msg === "object" &&
          msg !== null &&
          "role" in msg &&
          "content" in msg &&
          typeof (msg as { role: string }).role === "string" &&
          typeof (msg as { content: string }).content === "string"
      )
      .map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content.slice(0, MAX_MESSAGE_LENGTH) }],
      }));

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({ history: safeHistory });
    const result = await chat.sendMessage(message.slice(0, MAX_MESSAGE_LENGTH));
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to get AI response. Please try again." },
      { status: 500 }
    );
  }
}
