"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ListingPreview = {
  id: string;
  title: string;
  city: string;
  state: string;
  price: number;
  listing_type: string;
  property_type: string;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

type ListingTypeFilter = "all" | "Buy" | "Rent";

type ListingColumnProps = {
  title: string;
  listings: ListingPreview[];
  emptyMessage: string;
};

function ListingColumn({ title, listings, emptyMessage }: ListingColumnProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <Button asChild size="sm" variant="outline">
          <Link href="/property/listings">View all</Link>
        </Button>
      </div>
      {listings.length === 0 ? (
        <Card className="border-border/50 bg-background/70">
          <CardContent className="p-6 text-sm text-muted-foreground">
            {emptyMessage}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {listings.map((listing) => (
            <Card
              key={listing.id}
              className="border-border/50 bg-background/70"
            >
              <CardContent className="space-y-3 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{listing.listing_type}</Badge>
                  <Badge variant="secondary">{listing.property_type}</Badge>
                </div>
                <h4 className="text-lg font-semibold text-white">
                  {listing.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {listing.city}, {listing.state}
                </p>
                <p className="text-xl font-semibold text-white">
                  {formatCurrency(listing.price)}
                  {listing.listing_type === "Rent" ? (
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      / month
                    </span>
                  ) : null}
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/property/listings/${listing.id}`}>
                    View details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

type HomeListingsProps = {
  listings: ListingPreview[];
};

export default function HomeListings({ listings }: HomeListingsProps) {
  const [typeFilter, setTypeFilter] = useState<ListingTypeFilter>("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const cityOptions = useMemo(
    () =>
      Array.from(new Set(listings.map((listing) => listing.city)))
        .filter(Boolean)
        .sort(),
    [listings]
  );

  const propertyTypeOptions = useMemo(
    () =>
      Array.from(new Set(listings.map((listing) => listing.property_type)))
        .filter(Boolean)
        .sort(),
    [listings]
  );

  const filteredListings = useMemo(() => {
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    return listings.filter((listing) => {
      if (cityFilter !== "all" && listing.city !== cityFilter) {
        return false;
      }

      if (
        propertyTypeFilter !== "all" &&
        listing.property_type !== propertyTypeFilter
      ) {
        return false;
      }

      if (typeFilter !== "all" && listing.listing_type !== typeFilter) {
        return false;
      }

      if (min !== null && listing.price < min) {
        return false;
      }

      if (max !== null && listing.price > max) {
        return false;
      }

      return true;
    });
  }, [listings, cityFilter, propertyTypeFilter, typeFilter, minPrice, maxPrice]);

  const buyListings = filteredListings.filter(
    (listing) => listing.listing_type === "Buy"
  );
  const rentListings = filteredListings.filter(
    (listing) => listing.listing_type === "Rent"
  );

  const showBuy = typeFilter === "all" || typeFilter === "Buy";
  const showRent = typeFilter === "all" || typeFilter === "Rent";

  return (
    <section className="container mx-auto px-4 pb-24">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-white">
          Browse verified listings
        </h2>
        <p className="text-sm text-muted-foreground">
          Filter by type, city, and price to find the right property.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <label className="text-xs font-semibold text-muted-foreground">
            Listing type
          </label>
          <Select
            value={typeFilter}
            onValueChange={(value) => setTypeFilter(value as ListingTypeFilter)}
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Buy">Buy</SelectItem>
              <SelectItem value="Rent">Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            City
          </label>
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="All cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {cityOptions.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Property type
          </label>
          <Select
            value={propertyTypeFilter}
            onValueChange={setPropertyTypeFilter}
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="All properties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {propertyTypeOptions.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">
            Price range (INR)
          </label>
          <div className="flex gap-2">
            <Input
              inputMode="numeric"
              placeholder="Min"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              className="bg-secondary/40"
            />
            <Input
              inputMode="numeric"
              placeholder="Max"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              className="bg-secondary/40"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {showBuy ? (
          <ListingColumn
            title="Buy listings"
            listings={buyListings}
            emptyMessage="No buy listings match your filters."
          />
        ) : null}
        {showRent ? (
          <ListingColumn
            title="Rent listings"
            listings={rentListings}
            emptyMessage="No rent listings match your filters."
          />
        ) : null}
      </div>
    </section>
  );
}
