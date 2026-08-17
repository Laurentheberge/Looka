import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-3xl font-bold text-[var(--color-navy)]"
          >
            Looka
          </Link>
          <p className="text-gray-600 mt-2">
            AI-powered exam prep for Cameroon students
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
