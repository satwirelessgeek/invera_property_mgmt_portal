"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseClient } from "@/lib/supabase/client";

type LeadItem = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  message: string;
  created_at: string;
  listings?: {
    id: string;
    title: string;
    city: string;
    state: string;
  };
};

export default function AdminLeadsDashboard() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [message, setMessage] = useState("Loading leads...");
  const [searchText, setSearchText] = useState("");
  const [city, setCity] = useState("");
  const [listingTitle, setListingTitle] = useState("");
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (searchText) params.set("q", searchText);
    if (city) params.set("city", city);
    if (listingTitle) params.set("listing", listingTitle);
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);
    const query = params.toString();
    return query ? `?${query}` : "";
  };

  const loadLeads = async () => {
      const { data: sessionData } = await supabaseClient.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) {
        setMessage("Please log in with an admin account.");
        return;
      }

      const response = await fetch(`/api/admin/leads${buildQuery()}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        setMessage("Admin access required.");
        return;
      }

      const data = await response.json();
      setLeads(data.leads ?? []);
      setMessage("");
  };

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    if (!listingTitle || listingTitle.length < 2) {
      setTitleSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const { data: sessionData } = await supabaseClient.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) return;

      const response = await fetch(
        `/api/admin/listings/suggest?query=${encodeURIComponent(listingTitle)}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!response.ok) return;
      const data = await response.json();
      setTitleSuggestions(data.suggestions ?? []);
    }, 300);

    return () => clearTimeout(timeout);
  }, [listingTitle]);

  if (message) {
    return <p className="text-sm text-muted-foreground">{message}</p>;
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Latest leads</h2>
        <Button asChild variant="outline">
          <Link href={`/api/admin/leads/export${buildQuery()}`}>Export CSV</Link>
        </Button>
      </div>
      <div className="grid gap-3 rounded-lg border border-border/60 p-4 md:grid-cols-5">
        <input
          className="h-9 rounded-md border border-border bg-background/60 px-3 text-sm text-muted-foreground"
          placeholder="Search name, phone, email"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <input
          className="h-9 rounded-md border border-border bg-background/60 px-3 text-sm text-muted-foreground"
          placeholder="City"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <input
          className="h-9 rounded-md border border-border bg-background/60 px-3 text-sm text-muted-foreground"
          placeholder="Listing title"
          value={listingTitle}
          onChange={(event) => setListingTitle(event.target.value)}
          list="listing-title-suggestions"
        />
        <datalist id="listing-title-suggestions">
          {titleSuggestions.map((title) => (
            <option key={title} value={title} />
          ))}
        </datalist>
        <input
          className="h-9 rounded-md border border-border bg-background/60 px-3 text-sm text-muted-foreground"
          type="date"
          value={fromDate}
          onChange={(event) => setFromDate(event.target.value)}
        />
        <input
          className="h-9 rounded-md border border-border bg-background/60 px-3 text-sm text-muted-foreground"
          type="date"
          value={toDate}
          onChange={(event) => setToDate(event.target.value)}
        />
        <Button onClick={loadLeads} className="md:col-span-5">
          Apply filters
        </Button>
      </div>
      {leads.map((lead) => (
        <Card key={lead.id} className="border-border/50 bg-background/70">
          <CardHeader>
            <CardTitle className="text-xl">
              {lead.full_name} - {lead.phone}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {lead.email || "Email not provided"} -{" "}
              {new Date(lead.created_at).toLocaleString("en-IN")}
            </p>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                {lead.listings?.title ?? "Listing"}
              </Badge>
              <Badge variant="outline">
                {lead.listings?.city}, {lead.listings?.state}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{lead.message}</p>
          </CardContent>
        </Card>
      ))}
      {leads.length === 0 ? (
        <p className="text-sm text-muted-foreground">No leads yet.</p>
      ) : null}
    </div>
  );
}
