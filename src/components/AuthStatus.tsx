"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase/client";

type UserInfo = {
  email?: string;
  phone?: string;
};

export default function AuthStatus() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabaseClient.auth.getSession();
      const currentUser = data?.session?.user;
      if (currentUser) {
        setUser({
          email: currentUser.email ?? undefined,
          phone: currentUser.phone ?? undefined,
        });
      } else {
        setUser(null);
      }
    };

    loadSession();

    const { data: subscription } = supabaseClient.auth.onAuthStateChange(
      () => loadSession()
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/auth/login">Log in</Link>
        </Button>
        <Button asChild size="sm" className="rounded-full px-4">
          <Link href="/auth/signup">Sign up</Link>
        </Button>
      </div>
    );
  }

  const label = user.email ?? user.phone ?? "Account";

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-xs text-muted-foreground md:block">
        Signed in: {label}
      </span>
      <Button asChild variant="outline" size="sm">
        <Link href="/property/my">My Listings</Link>
      </Button>
      <Button variant="ghost" size="sm" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
}
