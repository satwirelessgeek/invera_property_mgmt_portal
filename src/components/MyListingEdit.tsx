"use client";

import React, { useEffect, useState } from "react";
import PropertyListingForm from "@/components/PropertyListingForm";
import { supabaseClient } from "@/lib/supabase/client";

type Props = {
  listingId: string;
};

export default function MyListingEdit({ listingId }: Props) {
  const [initialData, setInitialData] = useState<Record<string, any> | null>(
    null
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadListing = async () => {
      const { data: sessionData } = await supabaseClient.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) {
        setMessage("Please log in to edit your listing.");
        return;
      }

      const response = await fetch(`/api/property/my/${listingId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        setMessage("Unable to load listing.");
        return;
      }

      const data = await response.json();
      setInitialData(data.listing ?? null);
    };

    loadListing();
  }, [listingId]);

  if (message) {
    return <p className="text-sm text-muted-foreground">{message}</p>;
  }

  if (!initialData) {
    return <p className="text-sm text-muted-foreground">Loading listing...</p>;
  }

  return (
    <PropertyListingForm
      listingId={listingId}
      initialData={{
        listingType: initialData.listing_type ?? "Buy",
        propertyType: initialData.property_type ?? "Apartment",
        title: initialData.title ?? "",
        price: String(initialData.price ?? ""),
        deposit: String(initialData.deposit ?? ""),
        state: initialData.state ?? "Maharashtra",
        city: initialData.city ?? "",
        pincode: initialData.pincode ?? "",
        address: initialData.address ?? "",
        contactName: initialData.contact_name ?? "",
        contactPhone: initialData.contact_phone ?? "",
        contactEmail: initialData.contact_email ?? "",
        description: initialData.description ?? "",
        amenities: initialData.amenities
          ? initialData.amenities.split(",").map((item: string) => item.trim())
          : [],
      }}
    />
  );
}
