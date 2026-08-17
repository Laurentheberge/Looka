import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-navy)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            About <span className="text-[var(--color-gold)]">Looka</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Built in Cameroon, for Cameroonian students. Because every student
            deserves a fair shot at exam success.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg mb-4">
                Exam preparation in Cameroon is broken. Students spend hours
                searching for past questions, copying notes by hand, and studying
                without direction. The few tutoring options available are expensive
                and hard to access.
              </p>
              <p className="text-gray-600 text-lg mb-4">
                Looka changes that. We combine AI technology with the Cameroonian
                school curriculum to give every student — whether in Douala,
                Bamenda, or a village in the Far North — access to smart exam
                prep tools.
              </p>
              <p className="text-gray-600 text-lg">
                AI chatbot tutoring, past question libraries, note summarizers,
                study planners, and practice quizzes — all in one place, all
                affordable, all on your phone.
              </p>
            </div>
            <div className="bg-[var(--color-paper)] rounded-2xl p-12 text-center">
              <div className="text-6xl font-bold text-[var(--color-gold)]">5M+</div>
              <p className="mt-2 text-gray-600 text-lg">Cameroonian students</p>
              <p className="text-gray-500">deserve better exam prep tools</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[var(--color-paper)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[var(--color-navy)] text-center mb-12">
            What We Believe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[var(--color-navy)] mb-3">
                Access for All
              </h3>
              <p className="text-gray-600">
                Quality exam prep shouldn&apos;t depend on your zip code or your
                parents&apos; income. Our free plan covers the essentials. Pro is
                priced for students.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[var(--color-navy)] mb-3">
                Mobile First
              </h3>
              <p className="text-gray-600">
                Most Cameroonian students access the internet through their
                phones. Looka is designed from the ground up for mobile — fast,
                lightweight, and easy to use.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[var(--color-navy)] mb-3">
                Built Locally
              </h3>
              <p className="text-gray-600">
                We understand the Cameroonian education system because we&apos;re
                part of it. GCE, BAC, Common Entrance — we know what matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-navy)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Join the Movement
          </h2>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto">
            Start preparing smarter today. It&apos;s free to begin.
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
