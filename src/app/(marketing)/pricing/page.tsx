import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    description: "Get started with the basics — no payment needed",
    features: [
      "1 study project",
      "100 AI chat messages per day",
      "3 note summaries per project",
      "1 practice session per day",
      "Past questions browser",
      "Flashcards & MCQ quizzes",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "2,000",
    period: "/month",
    description: "Unlock everything — pay with Mobile Money",
    features: [
      "Unlimited study projects",
      "Unlimited AI chat messages",
      "Unlimited note summaries",
      "Unlimited practice sessions",
      "AI-generated Study Planner",
      "Priority support",
      "Performance analytics",
      "All future features",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
];

const faqs = [
  {
    q: "How do I pay?",
    a: "We accept MTN Mobile Money and Orange Money. Select Pro, choose your provider, and follow the USSD prompt on your phone.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from your Subscription page anytime. You keep Pro access until the end of your billing period.",
  },
  {
    q: "Is there a student discount?",
    a: "The Pro plan is already priced for students — 2,000 XAF/month. The free plan is always available.",
  },
  {
    q: "What exams does Looka cover?",
    a: "GCE O-Level, GCE A-Level, BAC, Common Entrance, mock exams, and class tests across all major subjects.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-navy)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Simple, <span className="text-[var(--color-gold)]">Affordable</span> Pricing
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Start free. Upgrade when you&apos;re ready. Pay with Mobile Money.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 bg-[var(--color-paper)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl p-8 ${
                  plan.highlighted
                    ? "border-2 border-[var(--color-gold)] shadow-xl md:scale-105"
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
                    {plan.price === "0" ? "Free" : `${plan.price} XAF`}
                  </span>
                  {plan.price !== "0" && (
                    <span className="text-gray-500">{plan.period}</span>
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

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-[var(--color-navy)] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[var(--color-navy)]">
                  {faq.q}
                </h3>
                <p className="mt-2 text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-navy)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Start Studying Smarter Today
          </h2>
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
