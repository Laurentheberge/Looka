"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="max-w-md mx-auto text-center py-20">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
        <XCircle className="text-red-400" size={40} />
      </div>
      <h1 className="text-2xl font-bold text-[var(--color-navy)] mb-2">
        Payment Cancelled
      </h1>
      <p className="text-gray-600 mb-8">
        No worries! You can upgrade to Pro anytime.
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/subscription">
          <Button className="bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[#D4922E] font-semibold">
            Try Again
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
