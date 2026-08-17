export default function TermsPage() {
  return (
    <>
      <section className="bg-[var(--color-navy)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Terms of <span className="text-[var(--color-gold)]">Service</span>
          </h1>
          <p className="mt-4 text-gray-300">Last updated: August 2026</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl prose prose-gray">
          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mb-6">
            By creating an account or using Looka, you agree to these Terms of Service. If you are under 18, you must have consent from a parent or guardian.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">2. What Looka Is</h2>
          <p className="text-gray-600 mb-6">
            Looka is an AI-assisted exam preparation platform. We provide AI-generated study tools, past question libraries, and practice quizzes. Looka is <strong>not</strong> a substitute for classroom learning or official exam preparation.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">3. User Accounts</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
            <li>You must provide accurate information when creating an account</li>
            <li>You are responsible for keeping your account credentials secure</li>
            <li>You may not share your account with others</li>
            <li>You may not create multiple accounts to abuse free tier limits</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">4. Acceptable Use</h2>
          <p className="text-gray-600 mb-4">You agree NOT to:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
            <li>Use Looka to cheat on official exams</li>
            <li>Attempt to hack, exploit, or bypass rate limits</li>
            <li>Upload malicious content, viruses, or harmful files</li>
            <li>Scrape, copy, or redistribute Looka content</li>
            <li>Use the platform for any illegal purpose</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">5. Subscriptions & Payments</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
            <li>Free tier is available without payment</li>
            <li>Pro subscriptions are billed monthly via Mobile Money</li>
            <li>You may cancel anytime; access continues until the billing period ends</li>
            <li>Refunds are handled case-by-case — contact support@looka.cm</li>
            <li>Prices are in XAF and may change with 30 days notice</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">6. AI Content Disclaimer</h2>
          <p className="text-gray-600 mb-6">
            AI-generated content (chat responses, summaries, practice questions) may contain errors. Always verify important information with textbooks or teachers. Looka is not responsible for inaccuracies in AI-generated content.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">7. Intellectual Property</h2>
          <p className="text-gray-600 mb-6">
            The Looka platform, including its design, code, and branding, is owned by Looka. You retain ownership of content you upload (notes, etc.). By uploading, you grant us a limited license to process and store your content to provide the service.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">8. Limitation of Liability</h2>
          <p className="text-gray-600 mb-6">
            Looka is provided &quot;as is.&quot; We do not guarantee that exam scores will improve from using our platform. We are not liable for any damages arising from use of the service.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">9. Changes to Terms</h2>
          <p className="text-gray-600 mb-6">
            We may update these terms at any time. Significant changes will be communicated via email or through the app. Continued use after changes constitutes acceptance.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">10. Contact</h2>
          <p className="text-gray-600">
            Questions? Email{" "}
            <a href="mailto:legal@looka.cm" className="text-[var(--color-gold)] hover:underline">
              legal@looka.cm
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
