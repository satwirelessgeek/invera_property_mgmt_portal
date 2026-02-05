import { supabaseServer } from "@/lib/supabase/server";

export async function getUserFromRequest(request: Request) {
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    return { error: "Missing authorization token." };
  }

  const { data, error } = await supabaseServer.auth.getUser(token);

  if (error || !data.user) {
    return { error: error?.message ?? "Invalid user token." };
  }

  return { user: data.user };
}

export async function requireAdmin(request: Request) {
  const { user, error } = await getUserFromRequest(request);

  if (error || !user) {
    return { error: error ?? "Unauthorized." };
  }

  const { data, error: profileError } = await supabaseServer
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError) {
    return { error: profileError.message };
  }

  if (data?.role !== "admin") {
    return { error: "Admin access required." };
  }

  return { user };
}
