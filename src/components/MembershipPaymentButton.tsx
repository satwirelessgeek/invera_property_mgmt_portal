"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase/client";

type Props = {
  planName: string;
  amount: number;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

export default function MembershipPaymentButton({ planName, amount }: Props) {
  const [isPaying, setIsPaying] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    setMessage("");
    setIsPaying(true);

    try {
      const { data: sessionData } = await supabaseClient.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) {
        throw new Error("Please sign in to purchase membership.");
      }

      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ planName, amount }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error ?? "Unable to create payment order.");
      }

      const data = await response.json();

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded.");
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Invera Property",
        description: `${planName} membership`,
        order_id: data.orderId,
        handler: () => {
          setMessage("Payment successful. Membership will activate shortly.");
        },
        theme: {
          color: "#111827",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Payment failed.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="grid gap-2">
      <Button onClick={handlePayment} disabled={isPaying}>
        {isPaying ? "Processing..." : "Pay with Razorpay"}
      </Button>
      {message ? <p className="text-xs text-muted-foreground">{message}</p> : null}
    </div>
  );
}
