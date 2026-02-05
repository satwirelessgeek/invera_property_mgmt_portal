"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MembershipPaymentButton from "@/components/MembershipPaymentButton";

const PLANS = [
  {
    name: "Starter",
    price: 1999,
    period: "per month",
    features: [
      "1 active listing",
      "Basic analytics",
      "Standard support",
      "Admin review included",
    ],
  },
  {
    name: "Growth",
    price: 3999,
    period: "per month",
    features: [
      "5 active listings",
      "Priority placement",
      "Lead alerts",
      "Faster media approvals",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: 8999,
    period: "per month",
    features: [
      "Unlimited listings",
      "Dedicated account manager",
      "Custom branding",
      "API access",
    ],
  },
];

export default function MembershipPlans() {
  const [selectedPlan, setSelectedPlan] = useState("Growth");
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {PLANS.map((plan) => {
        const isSelected = selectedPlan === plan.name;
        return (
          <Card
            key={plan.name}
            className={`border-border/50 bg-background/70 ${
              plan.highlight ? "shadow-lg shadow-primary/10" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                {plan.highlight ? (
                  <Badge className="rounded-full">Popular</Badge>
                ) : null}
              </div>
              <div className="mt-4 text-3xl font-semibold">
                {formatter.format(plan.price)}
              </div>
              <p className="text-sm text-muted-foreground">{plan.period}</p>
            </CardHeader>
            <CardContent className="grid gap-4">
              <ul className="grid gap-2 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature}>- {feature}</li>
                ))}
              </ul>
              <Button
                variant={isSelected ? "default" : "outline"}
                onClick={() => setSelectedPlan(plan.name)}
              >
                {isSelected ? "Selected plan" : "Choose plan"}
              </Button>
              {isSelected ? (
                <MembershipPaymentButton
                  planName={plan.name}
                  amount={plan.price}
                />
              ) : null}
              <p className="text-xs text-muted-foreground">
                Payments are processed in Indian Rupees (INR).
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
