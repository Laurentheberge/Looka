import Link from "next/link";
import {
  Brain,
  BookOpen,
  FileText,
  Calendar,
  CreditCard,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Chatbot",
    description:
      "Ask questions about any subject and get instant, personalized explanations from our AI tutor.",
  },
  {
    icon: BookOpen,
    title: "Past Questions",
    description:
      "Access a massive library of GCE, BAC, and class exam past questions with detailed solutions.",
  },
  {
    icon: FileText,
    title: "Notes Summarizer",
    description:
      "Upload your notes and get AI-powered summaries highlighting key concepts and formulas.",
  },
  {
    icon: Calendar,
    title: "Study Planner",
    description:
      "AI-generated personalized study plans based on your exam schedule and learning pace.",
  },
  {
    icon: CreditCard,
    title: "Flashcards & MCQs",
    description:
      "Practice with AI-generated flashcards and multiple choice questions for active recall.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description:
      "Get immediate feedback on your practice sessions to identify and fix knowledge gaps.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    description: "Get started with the basics",
    features: [
      "1 study project",
      "100 AI messages per day",
      "3 note summaries per project",
      "1 practice session per day",
      "Past questions browser",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "2,000",
    period: "/month",
    description: "Unlock your full potential",
    features: [
      "Unlimited projects",
      "Unlimited AI messages",
      "Unlimited note summaries",
      "Unlimited practice sessions",
      "AI Study Planner",
      "Priority support",
      "Performance analytics",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
];

const examTypes = [
  "GCE O-Level",
  "GCE A-Level",
  "BAC",
  "Common Entrance",
  "Mock Exams",
  "Class Tests",
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[var(--color-navy)] text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Crush Your Exams with{" "}
              <span className="text-[var(--color-gold)]">AI Power</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Looka is the AI-assisted exam prep platform built for Cameroonian
              students. Past questions, AI tutoring, study plans, and more.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-4 bg-[var(--color-gold)] text-[var(--color-navy)] font-bold rounded-lg text-lg hover:bg-[#D4922E] transition-colors inline-flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/features"
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Exam Types */}
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {examTypes.map((exam) => (
              <span
                key={exam}
                className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300"
              >
                {exam}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)]">
              Everything You Need to Ace Your Exams
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Powerful AI tools designed specifically for Cameroonian students
              preparing for GCE, BAC, and class exams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 border border-gray-200 rounded-xl hover:border-[var(--color-gold)] hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-[var(--color-gold)]/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon
                    className="text-[var(--color-gold)]"
                    size={24}
                  />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-navy)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[var(--color-paper)]" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)]">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade when you need more. Pay with Mobile Money.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl p-8 ${
                  plan.highlighted
                    ? "border-2 border-[var(--color-gold)] shadow-xl scale-105"
                    : "border border-gray-200"
                }`}
              >
                {plan.highlighted && (
                  <div className="text-sm font-semibold text-[var(--color-gold)] mb-2">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-[var(--color-navy)]">
                  {plan.name}
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[var(--color-navy)]">
                    {plan.price === "0" ? "Free" : `${plan.price}`}
                  </span>
                  {plan.price !== "0" && (
                    <span className="text-gray-500">
                      {" "}
                      XAF{plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-gray-600">{plan.description}</p>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle
                        className="text-[var(--color-green)] mt-0.5 flex-shrink-0"
                        size={18}
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`mt-8 block text-center py-3 rounded-lg font-semibold transition-colors ${
                    plan.highlighted
                      ? "bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[#D4922E]"
                      : "bg-[var(--color-navy)] text-white hover:bg-[var(--color-ink)]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--color-navy)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Start Crushing Your Exams?
          </h2>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto">
            Join thousands of Cameroonian students already using Looka to
            prepare smarter, not harder.
          </p>
          <Link
            href="/signup"
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-gold)] text-[var(--color-navy)] font-bold rounded-lg text-lg hover:bg-[#D4922E] transition-colors"
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
