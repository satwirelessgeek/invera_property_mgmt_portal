"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseClient } from "@/lib/supabase/client";
import { GripVertical } from "lucide-react";
import { toast } from "sonner";

type MediaItem = {
  id: string;
  file_name: string;
  content_type: string;
  status: string;
  caption?: string;
  url: string;
};

type Listing = {
  id: string;
  title: string;
  city: string;
  state: string;
  price: number;
  listing_type: string;
  property_type: string;
  status: string;
  description: string;
  address: string;
};

type Props = {
  listingId: string;
};

export default function MyListingDetail({ listingId }: Props) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const ensureGhost = () => {
    if (ghostRef.current) return ghostRef.current;
    const ghost = document.createElement("div");
    ghost.style.position = "absolute";
    ghost.style.top = "-1000px";
    ghost.style.left = "-1000px";
    ghost.style.padding = "8px 12px";
    ghost.style.borderRadius = "8px";
    ghost.style.background = "rgba(15, 23, 42, 0.9)";
    ghost.style.color = "#e2e8f0";
    ghost.style.fontSize = "12px";
    ghost.style.border = "1px dashed rgba(148, 163, 184, 0.6)";
    ghost.style.boxShadow = "0 8px 24px rgba(0,0,0,0.35)";
    ghost.style.pointerEvents = "none";
    ghostRef.current = ghost;
    document.body.appendChild(ghost);
    return ghost;
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    mediaItem: MediaItem
  ) => {
    setDragId(mediaItem.id);
    const ghost = ensureGhost();
    ghost.textContent = `Moving: ${mediaItem.file_name}`;
    event.dataTransfer.setDragImage(ghost, 10, 10);
  };

  useEffect(() => {
    return () => {
      if (ghostRef.current) {
        ghostRef.current.remove();
        ghostRef.current = null;
      }
    };
  }, []);

  const [timeline, setTimeline] = useState<
    { id: string; status: string; note: string; created_at: string }[]
  >([]);
  const [message, setMessage] = useState("Loading listing...");

  useEffect(() => {
    const loadData = async () => {
      const { data: sessionData } = await supabaseClient.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) {
        setMessage("Please log in to view this listing.");
        return;
      }

      const listingResponse = await fetch(`/api/property/my/${listingId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!listingResponse.ok) {
        setMessage("Unable to load listing.");
        return;
      }

      const listingData = await listingResponse.json();
      setListing(listingData.listing ?? null);

      const mediaResponse = await fetch(`/api/property/my/${listingId}/media`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (mediaResponse.ok) {
        const mediaData = await mediaResponse.json();
        setMedia(mediaData.media ?? []);
      }

      const timelineResponse = await fetch(
        `/api/property/my/${listingId}/timeline`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (timelineResponse.ok) {
        const timelineData = await timelineResponse.json();
        setTimeline(timelineData.timeline ?? []);
      }

      setMessage("");
    };

    loadData();
  }, [listingId]);

  const refreshMedia = async () => {
    const { data: sessionData } = await supabaseClient.auth.getSession();
    const accessToken = sessionData?.session?.access_token;
    if (!accessToken) return;
    const mediaResponse = await fetch(`/api/property/my/${listingId}/media`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (mediaResponse.ok) {
      const mediaData = await mediaResponse.json();
      setMedia(mediaData.media ?? []);
    }
  };

  const handleDeleteMedia = async (mediaId: string) => {
    const { data: sessionData } = await supabaseClient.auth.getSession();
    const accessToken = sessionData?.session?.access_token;
    if (!accessToken) return;
    await fetch(`/api/property/my/${listingId}/media/${mediaId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    await refreshMedia();
  };

  const persistOrder = async (next: MediaItem[]) => {
    const { data: sessionData } = await supabaseClient.auth.getSession();
    const accessToken = sessionData?.session?.access_token;
    if (!accessToken) return;
    const response = await fetch(`/api/property/my/${listingId}/media/order`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order: next.map((item) => item.id) }),
    });
    if (response.ok) {
      toast.success("Media order saved.");
    } else {
      toast.error("Failed to save order.");
    }
  };

  const handleDrop = async (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const currentIndex = media.findIndex((item) => item.id === dragId);
    const targetIndex = media.findIndex((item) => item.id === targetId);
    if (currentIndex < 0 || targetIndex < 0) return;
    const next = [...media];
    const [moved] = next.splice(currentIndex, 1);
    next.splice(targetIndex, 0, moved);
    setMedia(next);
    setDragId(null);
    setDragOverId(null);
    await persistOrder(next);
  };

  const handleCaptionSave = async (mediaId: string, caption: string) => {
    const { data: sessionData } = await supabaseClient.auth.getSession();
    const accessToken = sessionData?.session?.access_token;
    if (!accessToken) return;
    const response = await fetch(`/api/property/my/${listingId}/media/${mediaId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ caption }),
    });
    if (response.ok) {
      toast.success("Caption saved.");
    } else {
      toast.error("Failed to save caption.");
    }
  };

  if (message) {
    return <p className="text-sm text-muted-foreground">{message}</p>;
  }

  if (!listing) {
    return <p className="text-sm text-muted-foreground">Listing not found.</p>;
  }

  return (
    <div className="grid gap-6">
      <Card className="border-border/50 bg-background/70">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{listing.listing_type}</Badge>
            <Badge variant="secondary">{listing.property_type}</Badge>
            <Badge variant="outline">{listing.status}</Badge>
          </div>
          <CardTitle className="text-2xl">{listing.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {listing.address}, {listing.city}, {listing.state}
          </p>
        </CardHeader>
        <CardContent className="grid gap-3">
          <p className="text-sm text-muted-foreground">{listing.description}</p>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <h2 className="text-xl font-semibold text-white">Media previews</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {media.map((item, index) => (
            <Card
              key={item.id}
              className={`border-border/50 bg-background/70 transition-all duration-200 ${
                dragOverId === item.id ? "ring-2 ring-primary/60" : ""
              }`}
            >
              <CardContent className="grid gap-3 p-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                    {index + 1}
                  </span>
                  <Badge variant="secondary">{item.file_name}</Badge>
                  <Badge variant="outline">{item.status}</Badge>
                </div>
                <div
                  className={`flex items-center gap-2 rounded-md border border-dashed border-border/60 p-2 text-xs transition-all duration-200 ${
                    dragOverId === item.id
                      ? "bg-primary/10 text-primary animate-pulse"
                      : "text-muted-foreground"
                  }`}
                  draggable
                  onDragStart={(event) => handleDragStart(event, item)}
                  onDragEnd={() => setDragOverId(null)}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragOverId(item.id);
                  }}
                  onDragLeave={() => setDragOverId(null)}
                  onDrop={() => handleDrop(item.id)}
                >
                  <GripVertical className="h-4 w-4" />
                  Drag to reorder
                </div>
                {item.content_type.startsWith("video") ? (
                  <video controls className="w-full rounded-md">
                    <source src={item.url} />
                  </video>
                ) : (
                  <img
                    src={item.url}
                    alt={item.file_name}
                    className="w-full rounded-md object-cover"
                  />
                )}
                <input
                  className="h-9 rounded-md border border-border bg-background/60 px-3 text-sm text-muted-foreground"
                  placeholder="Add a caption"
                  defaultValue={item.caption ?? ""}
                  onBlur={(event) =>
                    handleCaptionSave(item.id, event.target.value)
                  }
                />
                <button
                  type="button"
                  className="rounded-md border border-red-500/40 px-2 py-1 text-sm text-red-300"
                  onClick={async () => {
                    await handleDeleteMedia(item.id);
                    toast.success("Media removed.");
                  }}
                >
                  Delete media
                </button>
              </CardContent>
            </Card>
          ))}
          {media.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No media uploaded yet.
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4">
        <h2 className="text-xl font-semibold text-white">Approval timeline</h2>
        <div className="grid gap-3">
          {timeline.map((event) => (
            <Card key={event.id} className="border-border/50 bg-background/70">
              <CardContent className="grid gap-1 p-4">
                <Badge variant="outline">{event.status}</Badge>
                <p className="text-sm text-muted-foreground">{event.note}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(event.created_at).toLocaleString("en-IN")}
                </p>
              </CardContent>
            </Card>
          ))}
          {timeline.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No status updates yet.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
