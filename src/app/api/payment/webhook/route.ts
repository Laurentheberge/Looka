import { NextRequest, NextResponse } from "next/server";
import { verifyPayment } from "@/lib/payment/payamgo";
import {
  createSubscription,
  updateSubscription,
} from "@/lib/firebase/firestore";

/**
 * Webhook handler for Payamgo payment notifications.
 * The provider POSTs here when payment status changes.
 *
 * TODO: Replace the signature check below with your real provider's scheme.
 */
export async function POST(req: NextRequest) {
  try {
    // Basic signature verification — replace with real provider scheme
    const signature = req.headers.get("x-payamgo-signature");
    const webhookSecret = process.env.PAYAMGO_WEBHOOK_SECRET;

    if (webhookSecret && signature !== webhookSecret) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const body = await req.json();
    const transactionId = body.transaction_id || body.id;

    if (!transactionId || typeof transactionId !== "string") {
      return NextResponse.json({ error: "Missing transaction ID" }, { status: 400 });
    }

    const result = await verifyPayment(transactionId);

    if (result.status === "successful") {
      const userId = body.metadata?.userId;
      if (userId && typeof userId === "string") {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);

        await createSubscription(userId, {
          planName: "Pro",
          amount: result.amount || 2000,
          currency: result.currency || "XAF",
          transactionId,
          status: "active",
          expiresAt,
        });

        await updateSubscription(userId, "active");
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
