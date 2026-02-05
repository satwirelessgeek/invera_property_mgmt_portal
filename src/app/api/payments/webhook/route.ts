import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET ?? "";
  if (!secret) {
    return NextResponse.json(
      { error: "Missing Razorpay webhook secret." },
      { status: 500 }
    );
  }

  const signature = request.headers.get("x-razorpay-signature") ?? "";
  const body = await request.text();

  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (expected !== signature) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const payload = JSON.parse(body) as any;
  const orderId =
    payload?.payload?.payment?.entity?.order_id ??
    payload?.payload?.order?.entity?.id ??
    "";

  if (!orderId) {
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabaseServer
    .from("memberships")
    .update({ status: "active" })
    .eq("razorpay_order_id", orderId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
