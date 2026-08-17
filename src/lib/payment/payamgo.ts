/**
 * Payment provider abstraction layer.
 *
 * Replace the internals of `initiatePayment` and `verifyPayment`
 * with your real provider (CinetPay, Monetbil, ElyonPay, etc.).
 *
 * Env vars needed:
 *   PAYAMGO_API_KEY
 *   PAYAMGO_SECRET_KEY
 *   NEXT_PUBLIC_APP_URL
 */

const PAYAMGO_API_URL = process.env.PAYAMGO_API_URL || "https://api.payamgo.com/v1";
const API_KEY = process.env.PAYAMGO_API_KEY || "";
const SECRET_KEY = process.env.PAYAMGO_SECRET_KEY || "";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export interface PaymentInitParams {
  userId: string;
  amount: number;
  currency: string;
  phone: string;
  provider: "mtn" | "orange";
  planName: string;
}

export interface PaymentInitResult {
  transactionId: string;
  paymentUrl?: string;
  status: "pending" | "error";
  message?: string;
}

export interface PaymentStatus {
  transactionId: string;
  status: "pending" | "successful" | "failed" | "cancelled";
  amount?: number;
  currency?: string;
}

/**
 * Initiate a Mobile Money payment via Payamgo.
 *
 * TODO: Replace the fetch calls below with your real provider's API.
 * The shape below follows a generic Mobile Money flow:
 *   1. POST /payments — create a payment request
 *   2. User confirms on phone (USSD prompt)
 *   3. GET /payments/:id — check status
 */
export async function initiatePayment(
  params: PaymentInitParams
): Promise<PaymentInitResult> {
  const { userId, amount, currency, phone, provider, planName } = params;

  // --- PAYAMGO INTEGRATION ---
  // Replace this with your real API call.
  // Example with a generic REST API:

  try {
    const response = await fetch(`${PAYAMGO_API_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "X-Secret-Key": SECRET_KEY,
      },
      body: JSON.stringify({
        amount,
        currency,
        phone,
        provider, // "mtn" | "orange"
        description: `Looka ${planName} subscription`,
        metadata: { userId, planName },
        callback_url: `${APP_URL}/api/payment/webhook`,
        return_url: `${APP_URL}/payment/success`,
        cancel_url: `${APP_URL}/payment/cancel`,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Payamgo init error:", error);
      return { transactionId: "", status: "error", message: "Payment initiation failed" };
    }

    const data = await response.json();

    return {
      transactionId: data.transaction_id || data.id,
      paymentUrl: data.payment_url,
      status: "pending",
    };
  } catch (err) {
    console.error("Payamgo connection error:", err);
    return { transactionId: "", status: "error", message: "Could not connect to payment provider" };
  }
}

/**
 * Verify a payment status with Payamgo.
 *
 * TODO: Replace with your real provider's verification endpoint.
 */
export async function verifyPayment(
  transactionId: string
): Promise<PaymentStatus> {
  try {
    const response = await fetch(
      `${PAYAMGO_API_URL}/payments/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "X-Secret-Key": SECRET_KEY,
        },
      }
    );

    if (!response.ok) {
      return { transactionId, status: "pending" };
    }

    const data = await response.json();

    // Map provider status to our status
    const statusMap: Record<string, PaymentStatus["status"]> = {
      successful: "successful",
      completed: "successful",
      failed: "failed",
      cancelled: "cancelled",
      pending: "pending",
    };

    return {
      transactionId,
      status: statusMap[data.status] || "pending",
      amount: data.amount,
      currency: data.currency,
    };
  } catch (err) {
    console.error("Payamgo verify error:", err);
    return { transactionId, status: "pending" };
  }
}

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    currency: "XAF",
    interval: "forever",
    features: [
      "1 project",
      "100 AI messages/day",
      "3 summaries/project",
      "Practice mode (any subject)",
      "Past questions browser",
    ],
  },
  pro: {
    name: "Pro",
    price: 2000,
    currency: "XAF",
    interval: "month",
    features: [
      "Unlimited projects",
      "Unlimited AI messages",
      "Unlimited summaries",
      "Practice mode (any subject)",
      "Past questions browser",
      "AI Study Planner",
      "Priority support",
    ],
  },
} as const;
