import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserFromRequest } from "@/lib/supabase/auth";

export async function GET(request: Request) {
  const { user, error } = await getUserFromRequest(request);
  if (error || !user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const { data, error: fetchError } = await supabaseServer
    .from("listings")
    .select(
      "id, title, city, state, price, listing_type, property_type, status, listing_media(count)"
    )
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const listings =
    data?.map((item: any) => ({
      ...item,
      media_count: item.listing_media?.[0]?.count ?? 0,
    })) ?? [];

  return NextResponse.json({ listings });
}
