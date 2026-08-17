export default function PrivacyPage() {
  return (
    <>
      <section className="bg-[var(--color-navy)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Privacy <span className="text-[var(--color-gold)]">Policy</span>
          </h1>
          <p className="mt-4 text-gray-300">Last updated: August 2026</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl prose prose-gray">
          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">1. Information We Collect</h2>
          <p className="text-gray-600 mb-6">
            When you use Looka, we collect the information you provide directly:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
            <li><strong>Account information:</strong> name, email address, and authentication method (Google, Apple, or email)</li>
            <li><strong>Usage data:</strong> chat messages, practice sessions, uploaded notes, study plans, and past question searches</li>
            <li><strong>Payment data:</strong> transaction IDs and payment status (we do NOT store your Mobile Money PIN or card details)</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
            <li>To provide and improve the Looka platform</li>
            <li>To generate AI-powered summaries, chat responses, and study plans</li>
            <li>To track your progress and personalize your experience</li>
            <li>To process payments and manage subscriptions</li>
            <li>To communicate with you about updates and support</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">3. Data Storage & Security</h2>
          <p className="text-gray-600 mb-6">
            Your data is stored securely using Google Firebase (Firestore and Authentication). All data is encrypted in transit and at rest. We implement industry-standard security practices to protect your information.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">4. AI Processing</h2>
          <p className="text-gray-600 mb-6">
            Your chat messages and uploaded notes are sent to Google Gemini AI for processing. This data is used solely to generate responses for you and is not used to train AI models. We do not share your personal study content with third parties.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">5. Data Sharing</h2>
          <p className="text-gray-600 mb-6">
            We do not sell, trade, or rent your personal information to anyone. We may share anonymized, aggregated data (e.g., usage statistics) that cannot identify you personally.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">6. Your Rights</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
            <li>You can access, update, or delete your account at any time</li>
            <li>You can request a copy of all data we hold about you</li>
            <li>You can delete your account from Settings, which removes all your data</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">7. Children&apos;s Privacy</h2>
          <p className="text-gray-600 mb-6">
            Looka is designed for students aged 13 and above. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided personal information, we will delete it immediately.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">8. Changes to This Policy</h2>
          <p className="text-gray-600 mb-6">
            We may update this policy from time to time. We will notify you of significant changes via email or through the app.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">9. Contact Us</h2>
          <p className="text-gray-600">
            Questions about this policy? Email us at{" "}
            <a href="mailto:privacy@looka.cm" className="text-[var(--color-gold)] hover:underline">
              privacy@looka.cm
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
