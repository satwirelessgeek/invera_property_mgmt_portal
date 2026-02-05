import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/auth";

export async function GET(request: Request) {
  const { error } = await requireAdmin(request);
  if (error) {
    return NextResponse.json({ error }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
