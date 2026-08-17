import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { verifyAuthToken } from "@/lib/firebase/admin";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const MAX_TEXT_LENGTH = 50000;

export async function POST(request: NextRequest) {
  try {
    const token = await verifyAuthToken(request);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { text, mimeType, fileName } = body;

    if (!text && !mimeType) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // If it's an image (base64), use vision to extract + summarize
    if (mimeType && typeof mimeType === "string" && mimeType.startsWith("image/")) {
      const safeData = typeof text === "string" ? text.slice(0, 1000000) : "";
      const imagePart = {
        inlineData: {
          data: safeData,
          mimeType: mimeType,
        },
      };

      const result = await model.generateContent([
        "Please read and transcribe all text from this image. Then provide a clear, concise summary highlighting the key points, definitions, and formulas if present. Format the output with headings and bullet points for readability.",
        imagePart,
      ]);

      const response = await result.response;
      return NextResponse.json({ summary: response.text() });
    }

    // If it's text content, summarize it
    if (text && typeof text === "string") {
      const safeText = text.slice(0, MAX_TEXT_LENGTH);
      const safeFileName = typeof fileName === "string" ? fileName.slice(0, 200) : "";

      const result = await model.generateContent(
        `Please summarize the following document in a clear and concise way. 
Highlight the key points, definitions, formulas, and main ideas. 
Format the output with headings and bullet points for readability.

Document${safeFileName ? ` (${safeFileName})` : ""}:
${safeText}`
      );

      const response = await result.response;
      return NextResponse.json({ summary: response.text() });
    }

    return NextResponse.json(
      { error: "Unable to process this file type" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Summarize API error:", error);
    return NextResponse.json(
      { error: "Failed to summarize. Please try again." },
      { status: 500 }
    );
  }
}
