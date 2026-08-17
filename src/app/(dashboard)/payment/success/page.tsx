"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <div className="max-w-md mx-auto text-center py-20">
      <div className="w-20 h-20 rounded-full bg-[var(--color-green)]/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="text-[var(--color-green)]" size={40} />
      </div>
      <h1 className="text-2xl font-bold text-[var(--color-navy)] mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-600 mb-8">
        Your Pro subscription is now active. You have access to all features
        including the AI Study Planner.
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/dashboard">
          <Button className="bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[#D4922E] font-semibold">
            Go to Dashboard
          </Button>
        </Link>
        <Link href="/study-plan">
          <Button variant="outline">
            Try Study Planner
          </Button>
        </Link>
      </div>
    </div>
  );
}
