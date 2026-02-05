"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabaseClient } from "@/lib/supabase/client";

type ReviewItem = {
  mediaId: string;
  fileName: string;
  contentType: string;
  status: "pending" | "approved" | "changes_requested" | "rejected";
  listingTitle: string;
  location: string;
  submittedBy: string;
};

const INITIAL_QUEUE: ReviewItem[] = [
  {
    mediaId: "MEDIA-1001",
    fileName: "living-room.jpg",
    contentType: "image/jpeg",
    status: "pending",
    listingTitle: "3BHK Lake View Apartment",
    location: "Powai, Mumbai",
    submittedBy: "Priya Sharma",
  },
  {
    mediaId: "MEDIA-1002",
    fileName: "storefront.mp4",
    contentType: "video/mp4",
    status: "pending",
    listingTitle: "Retail Space in Tech Park",
    location: "Whitefield, Bengaluru",
    submittedBy: "Arjun Mehta",
  },
  {
    mediaId: "MEDIA-1003",
    fileName: "garden.jpeg",
    contentType: "image/jpeg",
    status: "pending",
    listingTitle: "Gated Villa with Garden",
    location: "Gurugram, Haryana",
    submittedBy: "Sana Khan",
  },
];

export default function AdminReviewQueue() {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadQueue = async () => {
      try {
        const { data: sessionData } = await supabaseClient.auth.getSession();
        const accessToken = sessionData?.session?.access_token;
        const response = await fetch("/api/admin/review", {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        });
        if (!response.ok) {
          setErrorMessage("Admin access required to load the review queue.");
          return;
        }
        const data = await response.json();
        if (data?.queue?.length) {
          const normalized = data.queue.map((item: any) => ({
            mediaId: item.id,
            fileName: item.file_name ?? "media",
            contentType: item.content_type ?? "file",
            status: item.status ?? "pending",
            listingTitle: item.listings?.title ?? "Listing",
            location: `${item.listings?.city ?? ""}, ${item.listings?.state ?? ""}`.trim(),
            submittedBy: item.listings?.contact_name ?? "Owner",
          }));
          setQueue(normalized);
        }
      } catch {
        setErrorMessage("Unable to load review queue.");
      } finally {
        setIsLoading(false);
      }
    };

    loadQueue();
  }, []);

  const updateStatus = async (mediaId: string, status: ReviewItem["status"]) => {
    setQueue((prev) =>
      prev.map((item) => (item.mediaId === mediaId ? { ...item, status } : item))
    );

    const { data: sessionData } = await supabaseClient.auth.getSession();
    const accessToken = sessionData?.session?.access_token;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    await fetch("/api/admin/review", {
      method: "POST",
      headers,
      body: JSON.stringify({ mediaId, status }),
    });
  };

  return (
    <div className="grid gap-6">
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading review queue...</p>
      ) : null}
      {errorMessage ? (
        <p className="text-sm text-red-400">{errorMessage}</p>
      ) : null}
      {queue.map((item) => (
        <Card key={item.mediaId} className="border-border/50 bg-background/70">
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-xl">{item.listingTitle}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {item.location} - Submitted by {item.submittedBy}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{item.fileName}</Badge>
              <Badge>{item.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 md:flex md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              Review media for clarity, compliance, and ownership proof.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={() => updateStatus(item.mediaId, "approved")}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateStatus(item.mediaId, "changes_requested")}
              >
                Request changes
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => updateStatus(item.mediaId, "rejected")}
              >
                Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
