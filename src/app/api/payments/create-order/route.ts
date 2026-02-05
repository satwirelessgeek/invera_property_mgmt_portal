import { NextResponse } from "next/server";
import { razorpayClient } from "@/lib/razorpay";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserFromRequest } from "@/lib/supabase/auth";

type OrderPayload = {
  planName: string;
  amount: number;
};

export async function POST(request: Request) {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json(
      { error: "Missing Razorpay keys." },
      { status: 500 }
    );
  }

  const { user, error: authError } = await getUserFromRequest(request);
  if (authError || !user) {
    return NextResponse.json({ error: authError }, { status: 401 });
  }

  const payload = (await request.json()) as OrderPayload;
  const { planName, amount } = payload;

  if (!planName || !amount) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const order = await razorpayClient.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt: `membership_${planName}_${Date.now()}`,
    notes: {
      planName,
    },
  });

  const { error: membershipError } = await supabaseServer
    .from("memberships")
    .insert({
      profile_id: user.id,
      plan_name: planName,
      status: "pending",
      razorpay_order_id: order.id,
    });

  if (membershipError) {
    return NextResponse.json(
      { error: membershipError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.RAZORPAY_KEY_ID,
  });
}
