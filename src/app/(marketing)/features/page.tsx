import Link from "next/link";
import {
  Brain,
  BookOpen,
  FileText,
  Calendar,
  CreditCard,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Chatbot",
    description:
      "Ask any question about any subject and get clear, personalized explanations. Our AI tutor understands the Cameroonian curriculum and teaches in a way that sticks.",
    details: [
      "24/7 availability — study anytime",
      "Supports English and French",
      "Explains concepts step by step",
      "Remembers your learning context",
    ],
  },
  {
    icon: BookOpen,
    title: "Past Questions Library",
    description:
      "Access thousands of past exam questions from GCE, BAC, Common Entrance, and class tests. Filter by subject, year, and exam type.",
    details: [
      "GCE O-Level and A-Level questions",
      "BAC questions across all streams",
      "Common Entrance prep materials",
      "Class test and mock exam banks",
    ],
  },
  {
    icon: FileText,
    title: "Notes Summarizer",
    description:
      "Upload your class notes, textbooks, or study materials and get AI-powered summaries highlighting key concepts, formulas, and definitions.",
    details: [
      "Supports PDF, Word, and text files",
      "Highlights key concepts automatically",
      "Generates study-ready summaries",
      "Identifies important formulas",
    ],
  },
  {
    icon: Calendar,
    title: "AI Study Planner",
    description:
      "Tell us your exam dates and subjects. Our AI creates a personalized day-by-day study schedule that fits your pace and ensures you cover everything.",
    details: [
      "Personalized daily schedules",
      "Adapts to your exam timeline",
      "Balances subjects to prevent burnout",
      "Tracks your progress",
    ],
  },
  {
    icon: CreditCard,
    title: "Flashcards & MCQ Practice",
    description:
      "Practice with AI-generated flashcards for active recall and MCQ quizzes that test your understanding. Any subject, any topic.",
    details: [
      "Spaced repetition flashcards",
      "Multiple choice questions with explanations",
      "Instant feedback on answers",
      "Track your accuracy over time",
    ],
  },
  {
    icon: Zap,
    title: "Instant Feedback & Analytics",
    description:
      "Get immediate feedback on every practice session. See where you're strong, where you need work, and track your improvement over time.",
    details: [
      "Score tracking per subject",
      "Weak area identification",
      "Progress dashboards",
      "Session history and trends",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-navy)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Features Built for{" "}
            <span className="text-[var(--color-gold)]">Exam Success</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to prepare smarter, practice better, and score
            higher — powered by AI and built for Cameroonian students.
          </p>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-20">
        <div className="container mx-auto px-4 space-y-20">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`flex flex-col ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-12`}
            >
              <div className="flex-1">
                <div className="w-14 h-14 bg-[var(--color-gold)]/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="text-[var(--color-gold)]" size={28} />
                </div>
                <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-4">
                  {feature.title}
                </h2>
                <p className="text-gray-600 text-lg mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <CheckCircle
                        className="text-[var(--color-green)] mt-0.5 flex-shrink-0"
                        size={18}
                      />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 bg-[var(--color-paper)] rounded-2xl p-12 flex items-center justify-center">
                <feature.icon
                  className="text-[var(--color-gold)]/30"
                  size={160}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-navy)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Try All These Features?
          </h2>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto">
            Start with the free plan. No credit card required.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-gold)] text-[var(--color-navy)] font-bold rounded-lg text-lg hover:bg-[#D4922E] transition-colors"
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
