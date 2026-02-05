import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";

export async function GET(request: Request) {
  const { error } = await requireAdmin(request);
  if (error) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? "";

  if (!query) {
    return NextResponse.json({ suggestions: [] });
  }

  const { data, error: fetchError } = await supabaseServer
    .from("listings")
    .select("title")
    .ilike("title", `%${query}%`)
    .limit(10);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const unique = Array.from(
    new Set((data ?? []).map((item: { title: string }) => item.title).filter(Boolean))
  );

  return NextResponse.json({ suggestions: unique });
}
