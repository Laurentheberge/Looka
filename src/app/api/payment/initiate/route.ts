import { NextRequest, NextResponse } from "next/server";
import { initiatePayment, PLANS } from "@/lib/payment/payamgo";
import { verifyAuthToken } from "@/lib/firebase/admin";

export async function POST(req: NextRequest) {
  try {
    const token = await verifyAuthToken(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Derive userId from authenticated session, never from request body
    const userId = token.uid;

    const { amount, phone, provider, planName } = await req.json();

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    if (provider !== "mtn" && provider !== "orange") {
      return NextResponse.json(
        { error: "Provider must be 'mtn' or 'orange'" },
        { status: 400 }
      );
    }

    // Validate amount server-side — never trust client
    const plan = PLANS[planName as keyof typeof PLANS] || PLANS.pro;
    const validAmount = plan.price;

    if (validAmount === 0) {
      return NextResponse.json(
        { error: "Free plan does not require payment" },
        { status: 400 }
      );
    }

    const result = await initiatePayment({
      userId,
      amount: validAmount,
      currency: "XAF",
      phone,
      provider,
      planName: plan.name,
    });

    if (result.status === "error") {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Payment initiate error:", err);
    return NextResponse.json(
      { error: "Failed to initiate payment" },
      { status: 500 }
    );
  }
}
