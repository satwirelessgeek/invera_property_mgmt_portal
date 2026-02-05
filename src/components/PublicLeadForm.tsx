"use client";

import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  listingId: string;
};

export default function PublicLeadForm({ listingId }: Props) {
  const [formState, setFormState] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    field: "fullName" | "phone" | "email" | "message",
    value: string
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("fullName", formState.fullName);
      payload.append("phone", formState.phone);
      payload.append("email", formState.email);
      payload.append("message", formState.message);

      const response = await fetch(`/api/property/leads?listingId=${listingId}`, {
        method: "POST",
        headers: { "X-Requested-With": "fetch" },
        body: payload,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error ?? "Unable to send inquiry.");
      }

      toast.success("Inquiry sent to owner.");
      setFormState({ fullName: "", phone: "", email: "", message: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to send inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <input
        name="fullName"
        placeholder="Full name"
        className="h-10 rounded-md border border-border bg-background/60 px-3 text-sm text-muted-foreground"
        required
        value={formState.fullName}
        onChange={(event) => handleChange("fullName", event.target.value)}
      />
      <input
        name="phone"
        placeholder="Mobile number"
        className="h-10 rounded-md border border-border bg-background/60 px-3 text-sm text-muted-foreground"
        required
        value={formState.phone}
        onChange={(event) => handleChange("phone", event.target.value)}
      />
      <input
        name="email"
        type="email"
        placeholder="Email address"
        className="h-10 rounded-md border border-border bg-background/60 px-3 text-sm text-muted-foreground"
        value={formState.email}
        onChange={(event) => handleChange("email", event.target.value)}
      />
      <textarea
        name="message"
        placeholder="Message to owner"
        className="min-h-[120px] rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground"
        required
        value={formState.message}
        onChange={(event) => handleChange("message", event.target.value)}
      />
      <button
        type="submit"
        className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send inquiry"}
      </button>
      <p className="text-xs text-muted-foreground">
        Your details will be shared with the listing owner.
      </p>
    </form>
  );
}
