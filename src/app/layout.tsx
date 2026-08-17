import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Looka - AI Exam Prep for Cameroon Students",
  description:
    "AI-assisted exam prep platform helping Cameroonian students crush GCE, BAC, and class exams with past questions, AI tutoring, and study plans.",
  keywords: [
    "exam prep",
    "Cameroon",
    "GCE",
    "BAC",
    "AI tutor",
    "past questions",
    "study planner",
  ],
  openGraph: {
    title: "Looka - AI Exam Prep for Cameroon Students",
    description:
      "Crush your exams with AI-powered past questions, summaries, and study plans.",
    locale: "en_CM",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
