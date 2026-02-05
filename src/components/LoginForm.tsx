"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabaseClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpContact, setOtpContact] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handlePasswordLogin = async () => {
    setMessage("");
    setIsLoading(true);
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signed in successfully.");
    }
    setIsLoading(false);
  };

  const handleSendOtp = async () => {
    setMessage("");
    setIsLoading(true);
    const isEmail = otpContact.includes("@");
    const { error } = await supabaseClient.auth.signInWithOtp(
      isEmail ? { email: otpContact } : { phone: otpContact }
    );
    if (error) {
      setMessage(error.message);
    } else {
      setOtpSent(true);
      setMessage("OTP sent. Enter it to verify.");
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    setMessage("");
    setIsLoading(true);
    const isEmail = otpContact.includes("@");
    const { error } = await supabaseClient.auth.verifyOtp({
      ...(isEmail ? { email: otpContact } : { phone: otpContact }),
      token: otpToken,
      type: isEmail ? "email" : "sms",
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signed in successfully.");
    }
    setIsLoading(false);
  };

  return (
    <div className="grid gap-6">
      <Card className="border-border/50 bg-background/70">
        <CardHeader>
          <CardTitle className="text-xl">Login with password</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="loginEmail">Email</Label>
            <Input
              id="loginEmail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@email.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="loginPassword">Password</Label>
            <Input
              id="loginPassword"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
            />
          </div>
          <Button onClick={handlePasswordLogin} disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-background/70">
        <CardHeader>
          <CardTitle className="text-xl">Login with OTP</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="otpContact">Email or mobile number</Label>
            <Input
              id="otpContact"
              value={otpContact}
              onChange={(event) => setOtpContact(event.target.value)}
              placeholder="+91 98765 43210 or you@email.com"
            />
          </div>
          <Button onClick={handleSendOtp} disabled={isLoading}>
            {isLoading ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
          </Button>
          <div className="grid gap-2">
            <Label htmlFor="otpToken">OTP code</Label>
            <Input
              id="otpToken"
              value={otpToken}
              onChange={(event) => setOtpToken(event.target.value)}
              placeholder="Enter OTP"
            />
          </div>
          <Button onClick={handleVerifyOtp} disabled={isLoading || !otpSent}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </CardContent>
      </Card>

      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </div>
  );
}
