import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

type SignupPayload = {
  fullName: string;
  username: string;
  phone: string;
  email: string;
  password: string;
};

export async function POST(request: Request) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Missing Supabase service role key." },
      { status: 500 }
    );
  }

  const payload = (await request.json()) as SignupPayload;
  const { fullName, username, phone, email, password } = payload;

  if (!fullName || !username || !phone || !email || !password) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseServer.auth.admin.createUser({
    email,
    phone,
    password,
    email_confirm: false,
    phone_confirm: false,
    user_metadata: {
      fullName,
      username,
      phone,
    },
  });

  if (error || !data.user) {
    return NextResponse.json(
      { error: error?.message ?? "Failed to create user." },
      { status: 500 }
    );
  }

  const { error: profileError } = await supabaseServer.from("profiles").insert({
    id: data.user.id,
    full_name: fullName,
    username,
    phone,
    email,
  });

  if (profileError) {
    return NextResponse.json(
      { error: profileError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, userId: data.user.id });
}
