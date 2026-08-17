import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function chatWithAI(
  message: string,
  context?: {
    examType?: string;
    subject?: string;
    previousMessages?: Array<{ role: string; content: string }>;
  }
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  let prompt = message;

  if (context) {
    const contextParts = [];
    if (context.examType) {
      contextParts.push(`Exam type: ${context.examType}`);
    }
    if (context.subject) {
      contextParts.push(`Subject: ${context.subject}`);
    }
    if (context.previousMessages && context.previousMessages.length > 0) {
      const conversationHistory = context.previousMessages
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");
      contextParts.push(`Conversation history:\n${conversationHistory}`);
    }

    if (contextParts.length > 0) {
      prompt = `Context:\n${contextParts.join("\n")}\n\nUser question: ${message}`;
    }
  }

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function summarizeDocument(
  text: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Please summarize the following document in a clear and concise way. Highlight the key points and main ideas:

${text}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function analyzeImage(
  imageBase64: string,
  mimeType: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType: mimeType,
    },
  };

  const prompt = "Please read and transcribe all text from this image. Then summarize the key points.";

  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;
  return response.text();
}
