"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabaseClient } from "@/lib/supabase/client";

type Listing = {
  id: string;
  title: string;
  city: string;
  state: string;
  price: number;
  listing_type: string;
  property_type: string;
  status: string;
  media_count: number;
};

export default function MyListingsDashboard() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  const loadListings = async () => {
    setLoading(true);
    setMessage("");
    const { data: sessionData } = await supabaseClient.auth.getSession();
    const accessToken = sessionData?.session?.access_token;

    if (!accessToken) {
      setMessage("Please log in to view your listings.");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/property/my", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      setMessage("Unable to load listings.");
      setLoading(false);
      return;
    }

    const data = await response.json();
    setListings(data.listings ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadListings();
  }, []);

  const handleDelete = async (listingId: string) => {
    const { data: sessionData } = await supabaseClient.auth.getSession();
    const accessToken = sessionData?.session?.access_token;
    if (!accessToken) return;

    await fetch(`/api/property/my/${listingId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    await loadListings();
  };

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading listings...</p>;
  }

  const statusLabel = (value: string) =>
    value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  const statusVariant = (value: string) => {
    if (value === "approved") return "bg-emerald-500/20 text-emerald-200 border-emerald-500/30";
    if (value === "rejected") return "bg-red-500/20 text-red-200 border-red-500/30";
    if (value === "changes_requested") return "bg-amber-500/20 text-amber-200 border-amber-500/30";
    return "bg-slate-500/20 text-slate-200 border-slate-500/30";
  };

  const filteredListings = listings.filter((listing) => {
    const matchesStatus =
      statusFilter === "all" || listing.status === statusFilter;
    const matchesText =
      !searchText ||
      listing.title.toLowerCase().includes(searchText.toLowerCase()) ||
      `${listing.city} ${listing.state}`
        .toLowerCase()
        .includes(searchText.toLowerCase());
    return matchesStatus && matchesText;
  });

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-muted-foreground">Filter status</label>
        <select
          className="h-9 rounded-md border border-border bg-background/60 px-3 text-sm text-muted-foreground"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="changes_requested">Changes requested</option>
        </select>
        <input
          className="h-9 flex-1 rounded-md border border-border bg-background/60 px-3 text-sm text-muted-foreground md:max-w-sm"
          placeholder="Search by title or city"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
      {!message && filteredListings.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You do not have any listings yet.
        </p>
      ) : null}
      {filteredListings.map((listing) => (
        <Card key={listing.id} className="border-border/50 bg-background/70">
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-xl">{listing.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {listing.city}, {listing.state}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge>{listing.listing_type}</Badge>
              <Badge variant="secondary">{listing.property_type}</Badge>
              <Badge
                className={statusVariant(listing.status)}
                variant="outline"
              >
                {statusLabel(listing.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 md:flex md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Price: {listing.price ? `₹${listing.price}` : "On request"}
              </p>
              <p className="text-xs text-muted-foreground">
                Media files: {listing.media_count}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="ghost" asChild>
                <a href={`/property/my/${listing.id}`}>View details</a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href={`/property/my/${listing.id}/edit`}>Edit listing</a>
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(listing.id)}
              >
                Remove listing
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
