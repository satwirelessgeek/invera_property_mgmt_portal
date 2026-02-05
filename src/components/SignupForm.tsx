"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabaseClient } from "@/lib/supabase/client";

export default function SignupForm() {
  const [formState, setFormState] = useState({
    fullName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [phoneSent, setPhoneSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error ?? "Signup failed.");
      }

      setSubmitted(true);
      setVerificationStep(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Signup failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendEmailOtp = async () => {
    setSubmitError("");
    const { error } = await supabaseClient.auth.signInWithOtp({
      email: formState.email,
    });
    if (error) {
      setSubmitError(error.message);
      return;
    }
    setEmailSent(true);
  };

  const handleSendPhoneOtp = async () => {
    setSubmitError("");
    const { error } = await supabaseClient.auth.signInWithOtp({
      phone: formState.phone,
    });
    if (error) {
      setSubmitError(error.message);
      return;
    }
    setPhoneSent(true);
  };

  const handleVerifyEmailOtp = async () => {
    setSubmitError("");
    const { error } = await supabaseClient.auth.verifyOtp({
      email: formState.email,
      token: emailOtp,
      type: "email",
    });
    if (error) {
      setSubmitError(error.message);
      return;
    }
    setEmailVerified(true);
  };

  const handleVerifyPhoneOtp = async () => {
    setSubmitError("");
    const { error } = await supabaseClient.auth.verifyOtp({
      phone: formState.phone,
      token: phoneOtp,
      type: "sms",
    });
    if (error) {
      setSubmitError(error.message);
      return;
    }
    setPhoneVerified(true);
  };

  return (
    <Card className="border-border/50 bg-background/70">
      <CardHeader>
        <CardTitle className="text-2xl">Create your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              placeholder="Your name"
              value={formState.fullName}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  fullName: event.target.value,
                }))
              }
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Create a public username"
              value={formState.username}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  username: event.target.value,
                }))
              }
              required
            />
            <p className="text-xs text-muted-foreground">
              Username is created using your mobile number and email.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="phone">Mobile number</Label>
              <Input
                id="phone"
                placeholder="+91 98765 43210"
                value={formState.phone}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    phone: event.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@email.com"
                value={formState.email}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formState.password}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              required
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary">OTP ready</Badge>
            <span>Verify phone and email to activate your account.</span>
          </div>

          <Button type="submit" className="w-full md:w-fit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create account"}
          </Button>

          {submitted ? (
            <p className="text-sm text-emerald-400">
              Account created. Please verify your phone and email.
            </p>
          ) : null}
          {verificationStep ? (
            <div className="grid gap-4 rounded-lg border border-border/60 p-4">
              <div className="grid gap-2">
                <p className="text-sm font-medium">Email verification</p>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" onClick={handleSendEmailOtp}>
                    {emailSent ? "Resend email OTP" : "Send email OTP"}
                  </Button>
                  <Input
                    placeholder="Enter email OTP"
                    value={emailOtp}
                    onChange={(event) => setEmailOtp(event.target.value)}
                  />
                  <Button type="button" onClick={handleVerifyEmailOtp}>
                    {emailVerified ? "Email verified" : "Verify email"}
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <p className="text-sm font-medium">Phone verification</p>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" onClick={handleSendPhoneOtp}>
                    {phoneSent ? "Resend SMS OTP" : "Send SMS OTP"}
                  </Button>
                  <Input
                    placeholder="Enter SMS OTP"
                    value={phoneOtp}
                    onChange={(event) => setPhoneOtp(event.target.value)}
                  />
                  <Button type="button" onClick={handleVerifyPhoneOtp}>
                    {phoneVerified ? "Phone verified" : "Verify phone"}
                  </Button>
                </div>
              </div>
              {emailVerified && phoneVerified ? (
                <p className="text-sm text-emerald-400">
                  Both verifications complete. Your account is active.
                </p>
              ) : null}
            </div>
          ) : null}
          {submitError ? (
            <p className="text-sm text-red-400">{submitError}</p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
