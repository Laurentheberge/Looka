import { NextRequest, NextResponse } from "next/server";
import { verifyPayment } from "@/lib/payment/payamgo";
import {
  createSubscription,
  updateSubscription,
} from "@/lib/firebase/firestore";
import { verifyAuthToken } from "@/lib/firebase/admin";

export async function POST(req: NextRequest) {
  try {
    const token = await verifyAuthToken(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { transactionId } = await req.json();
    const userId = token.uid;

    if (!transactionId || typeof transactionId !== "string") {
      return NextResponse.json(
        { error: "Missing transactionId" },
        { status: 400 }
      );
    }

    const result = await verifyPayment(transactionId);

    if (result.status === "successful") {
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

    return NextResponse.json(result);
  } catch (err) {
    console.error("Payment verify error:", err);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
