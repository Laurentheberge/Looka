"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-navy)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Get in <span className="text-[var(--color-gold)]">Touch</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Have a question, feedback, or need help? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          {submitted ? (
            <div className="text-center py-16">
              <CheckCircle className="mx-auto text-[var(--color-green)]" size={64} />
              <h2 className="mt-6 text-2xl font-bold text-[var(--color-navy)]">
                Message Sent!
              </h2>
              <p className="mt-4 text-gray-600">
                Thank you for reaching out. We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-[var(--color-navy)] mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all"
                  placeholder="e.g. Marie Kamga"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[var(--color-navy)] mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-[var(--color-navy)] mb-2"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all"
                >
                  <option>General Question</option>
                  <option>Bug Report</option>
                  <option>Feature Request</option>
                  <option>Account Help</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-[var(--color-navy)] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] font-bold rounded-lg hover:bg-[#D4922E] transition-colors inline-flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          )}

          {/* Direct Contact */}
          <div className="mt-16 text-center">
            <p className="text-gray-600">
              Or email us directly at{" "}
              <a
                href="mailto:support@looka.cm"
                className="text-[var(--color-gold)] font-semibold hover:underline"
              >
                support@looka.cm
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
