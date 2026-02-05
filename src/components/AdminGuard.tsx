"use client";

import React, { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";

type Props = {
  children: React.ReactNode;
};

export default function AdminGuard({ children }: Props) {
  const [allowed, setAllowed] = useState(false);
  const [message, setMessage] = useState("Checking admin access...");

  useEffect(() => {
    const verifyAdmin = async () => {
      const { data: sessionData } = await supabaseClient.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) {
        setMessage("Please log in with an admin account.");
        return;
      }

      const response = await fetch("/api/admin/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        setMessage("Admin access required.");
        return;
      }

      setAllowed(true);
      setMessage("");
    };

    verifyAdmin();
  }, []);

  if (!allowed) {
    return <p className="text-sm text-muted-foreground">{message}</p>;
  }

  return <>{children}</>;
}
