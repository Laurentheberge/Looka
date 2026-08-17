"use client";

import { useState } from "react";
import {
  Check,
  Crown,
  Loader2,
  Phone,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/auth-context";
import { PLANS } from "@/lib/payment/payamgo";
import { cn } from "@/lib/utils";

export default function SubscriptionPage() {
  const { user, userData, isPro, loading } = useAuth();
  const [view, setView] = useState<"plans" | "checkout" | "processing" | "done">(
    isPro ? "done" : "plans"
  );
  const [phone, setPhone] = useState("");
  const [provider, setProvider] = useState<"mtn" | "orange">("mtn");
  const [error, setError] = useState("");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[var(--color-gold)] animate-spin" />
      </div>
    );
  }

  async function handleSubscribe() {
    if (!user || !phone) return;
    setView("processing");
    setError("");

    try {
      // Initiate payment
      const initRes = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          amount: PLANS.pro.price,
          phone,
          provider,
          planName: "Pro",
        }),
      });

      const initData = await initRes.json();
      if (!initRes.ok) throw new Error(initData.error || "Payment failed");

      // If there's a payment URL (some providers redirect), go there
      if (initData.paymentUrl) {
        window.location.href = initData.paymentUrl;
        return;
      }

      // Otherwise poll for verification
      const txId = initData.transactionId;
      let attempts = 0;
      const maxAttempts = 30; // 30 * 2s = 60s max

      const poll = async (): Promise<boolean> => {
        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transactionId: txId, userId: user.uid }),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.status === "successful") return true;
        if (verifyData.status === "failed" || verifyData.status === "cancelled") {
          throw new Error("Payment was not completed");
        }

        attempts++;
        if (attempts >= maxAttempts) {
          throw new Error("Payment verification timed out. Please check your phone.");
        }

        await new Promise((r) => setTimeout(r, 2000));
        return poll();
      };

      const success = await poll();

      if (success) {
        setView("done");
        window.location.reload(); // Refresh to update isPro
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
      setView("checkout");
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-navy)]">
          Subscription
        </h1>
        <p className="text-gray-600 mt-1">
          Choose the plan that fits your study needs
        </p>
      </div>

      {/* Already Pro */}
      {isPro && view === "done" && (
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center mx-auto mb-6">
            <Crown className="text-[var(--color-gold)]" size={36} />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-2">
            You&apos;re on Pro!
          </h2>
          <p className="text-gray-600 mb-6">
            You have unlimited access to all features including the AI Study
            Planner.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-gold)]/10 rounded-full text-sm font-medium text-[var(--color-navy)]">
            <Crown size={16} className="text-[var(--color-gold)]" />
            Active Pro subscription
          </div>
        </div>
      )}

      {/* Plans */}
      {view === "plans" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="border-2 border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[var(--color-navy)]">
              {PLANS.free.name}
            </h3>
            <p className="text-3xl font-bold text-[var(--color-navy)] mt-2">
              0 <span className="text-base font-normal text-gray-500">XAF/mo</span>
            </p>
            <ul className="mt-6 space-y-3">
              {PLANS.free.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-[var(--color-green)] mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full"
                disabled
              >
                Current plan
              </Button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="border-2 border-[var(--color-gold)] rounded-2xl p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-[var(--color-gold)] text-[var(--color-navy)] text-xs font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </span>
            </div>
            <h3 className="text-lg font-bold text-[var(--color-navy)]">
              {PLANS.pro.name}
            </h3>
            <p className="text-3xl font-bold text-[var(--color-navy)] mt-2">
              {PLANS.pro.price.toLocaleString()}{" "}
              <span className="text-base font-normal text-gray-500">XAF/mo</span>
            </p>
            <ul className="mt-6 space-y-3">
              {PLANS.pro.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-[var(--color-green)] mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button
                onClick={() => setView("checkout")}
                className="w-full bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[#D4922E] font-semibold gap-2"
              >
                <Crown size={16} />
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout */}
      {view === "checkout" && (
        <div className="max-w-md mx-auto">
          <div className="border-2 border-[var(--color-gold)] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[var(--color-navy)] mb-1">
              Subscribe to Pro
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Pay with Mobile Money — {PLANS.pro.price.toLocaleString()} XAF/month
            </p>

            {/* Provider */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment method
            </label>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setProvider("mtn")}
                className={cn(
                  "flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all text-sm font-medium",
                  provider === "mtn"
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)]/5"
                    : "border-gray-200 text-gray-600"
                )}
              >
                <Smartphone size={18} />
                MTN MoMo
              </button>
              <button
                onClick={() => setProvider("orange")}
                className={cn(
                  "flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all text-sm font-medium",
                  provider === "orange"
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)]/5"
                    : "border-gray-200 text-gray-600"
                )}
              >
                <Smartphone size={18} />
                Orange Money
              </button>
            </div>

            {/* Phone */}
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              <Phone size={14} className="inline mr-1" />
              Mobile Money number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="6XX XXX XXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 mb-2"
            />
            <p className="text-xs text-gray-400 mb-6">
              You&apos;ll receive a USSD prompt on your phone to confirm the payment.
            </p>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => { setView("plans"); setError(""); }}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleSubscribe}
                disabled={!phone || phone.length < 9}
                className="flex-1 bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[#D4922E] font-semibold"
              >
                Pay {PLANS.pro.price.toLocaleString()} XAF
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Processing */}
      {view === "processing" && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-[var(--color-gold)] animate-spin mb-4" />
          <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-1">
            Processing Payment
          </h3>
          <p className="text-gray-500 text-sm">
            Check your phone for the USSD prompt and confirm the payment.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            This may take up to 60 seconds...
          </p>
        </div>
      )}
    </div>
  );
}
