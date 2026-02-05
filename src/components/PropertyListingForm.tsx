"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabaseClient } from "@/lib/supabase/client";
 
 const STATES = [
   "Andhra Pradesh",
   "Delhi",
   "Gujarat",
   "Karnataka",
   "Maharashtra",
   "Rajasthan",
   "Tamil Nadu",
   "Telangana",
   "Uttar Pradesh",
   "West Bengal",
 ];
 
 const PROPERTY_TYPES = [
   "Apartment",
   "Independent House",
   "Villa",
   "Plot",
   "Commercial",
   "Co-working",
 ];
 
 const LISTING_TYPES = ["Buy", "Rent"];
 
 const AMENITIES = [
   "Parking",
   "Lift",
   "Power Backup",
   "Water Supply",
   "Security",
   "Furnished",
 ];
 
type ListingFormData = {
  listingType: string;
  propertyType: string;
  title: string;
  price: string;
  deposit: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  description: string;
  amenities: string[];
};

type PropertyListingFormProps = {
  initialData?: Partial<ListingFormData>;
  listingId?: string;
};

export default function PropertyListingForm({
  initialData,
  listingId,
}: PropertyListingFormProps) {
   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
   const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formState, setFormState] = useState<ListingFormData>({
     listingType: "Buy",
     propertyType: "Apartment",
     title: "",
     price: "",
     deposit: "",
     state: "Maharashtra",
     city: "",
     pincode: "",
     address: "",
     contactName: "",
     contactPhone: "",
     contactEmail: "",
     description: "",
     amenities: [] as string[],
    ...initialData,
   });
 
   const pricePreview = useMemo(() => {
     const value = Number(formState.price);
     if (!value) return "";
     return new Intl.NumberFormat("en-IN", {
       style: "currency",
       currency: "INR",
       maximumFractionDigits: 0,
     }).format(value);
   }, [formState.price]);
 
   const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const files = Array.from(event.target.files ?? []);
     setSelectedFiles(files);
   };
 
   const toggleAmenity = (amenity: string) => {
     setFormState((prev) => {
       const exists = prev.amenities.includes(amenity);
       return {
         ...prev,
         amenities: exists
           ? prev.amenities.filter((item) => item !== amenity)
           : [...prev.amenities, amenity],
       };
     });
   };
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
     event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const { data: sessionData } = await supabaseClient.auth.getSession();
    const accessToken = sessionData?.session?.access_token;
    if (!accessToken) {
      setSubmitError("Please sign in to submit a listing.");
      setIsSubmitting(false);
      return;
    }

    const payload = new FormData();
    payload.append("listingType", formState.listingType);
    payload.append("propertyType", formState.propertyType);
    payload.append("title", formState.title);
    payload.append("price", formState.price);
    payload.append("deposit", formState.deposit);
    payload.append("state", formState.state);
    payload.append("city", formState.city);
    payload.append("pincode", formState.pincode);
    payload.append("address", formState.address);
    payload.append("description", formState.description);
    payload.append("amenities", formState.amenities.join(", "));
    payload.append("contactName", formState.contactName);
    payload.append("contactPhone", formState.contactPhone);
    payload.append("contactEmail", formState.contactEmail);
    selectedFiles.forEach((file) => payload.append("media", file));

    try {
    const response = await fetch(
      listingId ? `/api/property/my/${listingId}` : "/api/property/listings",
      {
        method: listingId ? "PATCH" : "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: payload,
      }
    );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error ?? "Failed to submit listing.");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
   };
 
   return (
     <Card className="border-border/50 bg-background/70">
       <CardHeader>
         <CardTitle className="text-2xl">Create a property listing</CardTitle>
       </CardHeader>
       <CardContent>
         <form onSubmit={handleSubmit} className="grid gap-6">
           <div className="grid gap-4 md:grid-cols-2">
             <div className="grid gap-2">
               <Label>Listing type</Label>
               <Select
                 value={formState.listingType}
                 onValueChange={(value) =>
                   setFormState((prev) => ({ ...prev, listingType: value }))
                 }
               >
                 <SelectTrigger className="w-full">
                   <SelectValue placeholder="Select listing type" />
                 </SelectTrigger>
                 <SelectContent>
                   {LISTING_TYPES.map((type) => (
                     <SelectItem key={type} value={type}>
                       {type}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
             <div className="grid gap-2">
               <Label>Property type</Label>
               <Select
                 value={formState.propertyType}
                 onValueChange={(value) =>
                   setFormState((prev) => ({ ...prev, propertyType: value }))
                 }
               >
                 <SelectTrigger className="w-full">
                   <SelectValue placeholder="Select property type" />
                 </SelectTrigger>
                 <SelectContent>
                   {PROPERTY_TYPES.map((type) => (
                     <SelectItem key={type} value={type}>
                       {type}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
           </div>
 
           <div className="grid gap-4 md:grid-cols-2">
             <div className="grid gap-2">
               <Label htmlFor="title">Listing title</Label>
               <Input
                 id="title"
                 placeholder="e.g., 2BHK with sea view"
                 value={formState.title}
                 onChange={(event) =>
                   setFormState((prev) => ({
                     ...prev,
                     title: event.target.value,
                   }))
                 }
                 required
               />
             </div>
             <div className="grid gap-2">
               <Label htmlFor="price">
                 {formState.listingType === "Rent" ? "Monthly rent" : "Price"}
               </Label>
               <Input
                 id="price"
                 type="number"
                 min="0"
                 placeholder="Enter amount in INR"
                 value={formState.price}
                 onChange={(event) =>
                   setFormState((prev) => ({
                     ...prev,
                     price: event.target.value,
                   }))
                 }
                 required
               />
               {pricePreview ? (
                 <p className="text-xs text-muted-foreground">
                   Displayed as {pricePreview}
                 </p>
               ) : null}
             </div>
           </div>
 
           {formState.listingType === "Rent" ? (
             <div className="grid gap-2 md:max-w-xs">
               <Label htmlFor="deposit">Security deposit (optional)</Label>
               <Input
                 id="deposit"
                 type="number"
                 min="0"
                 placeholder="e.g., 100000"
                 value={formState.deposit}
                 onChange={(event) =>
                   setFormState((prev) => ({
                     ...prev,
                     deposit: event.target.value,
                   }))
                 }
               />
             </div>
           ) : null}
 
           <div className="grid gap-4 md:grid-cols-3">
             <div className="grid gap-2">
               <Label>State</Label>
               <Select
                 value={formState.state}
                 onValueChange={(value) =>
                   setFormState((prev) => ({ ...prev, state: value }))
                 }
               >
                 <SelectTrigger className="w-full">
                   <SelectValue placeholder="Select state" />
                 </SelectTrigger>
                 <SelectContent>
                   {STATES.map((state) => (
                     <SelectItem key={state} value={state}>
                       {state}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
             <div className="grid gap-2">
               <Label htmlFor="city">City</Label>
               <Input
                 id="city"
                 placeholder="e.g., Pune"
                 value={formState.city}
                 onChange={(event) =>
                   setFormState((prev) => ({
                     ...prev,
                     city: event.target.value,
                   }))
                 }
                 required
               />
             </div>
             <div className="grid gap-2">
               <Label htmlFor="pincode">Pincode</Label>
               <Input
                 id="pincode"
                 placeholder="e.g., 411001"
                 value={formState.pincode}
                 onChange={(event) =>
                   setFormState((prev) => ({
                     ...prev,
                     pincode: event.target.value,
                   }))
                 }
                 required
               />
             </div>
           </div>
 
           <div className="grid gap-2">
             <Label htmlFor="address">Full address</Label>
             <Input
               id="address"
               placeholder="Street, locality, landmark"
               value={formState.address}
               onChange={(event) =>
                 setFormState((prev) => ({
                   ...prev,
                   address: event.target.value,
                 }))
               }
               required
             />
           </div>
 
           <div className="grid gap-2">
             <Label htmlFor="description">Property description</Label>
             <Textarea
               id="description"
               placeholder="Share layout, nearby amenities, and highlights"
               value={formState.description}
               onChange={(event) =>
                 setFormState((prev) => ({
                   ...prev,
                   description: event.target.value,
                 }))
               }
             />
           </div>
 
           <div className="grid gap-3">
             <Label>Key amenities</Label>
             <div className="flex flex-wrap gap-2">
               {AMENITIES.map((amenity) => (
                 <Button
                   key={amenity}
                   type="button"
                   variant={
                     formState.amenities.includes(amenity)
                       ? "default"
                       : "outline"
                   }
                   size="sm"
                   className="rounded-full"
                   onClick={() => toggleAmenity(amenity)}
                 >
                   {amenity}
                 </Button>
               ))}
             </div>
           </div>
 
           <div className="grid gap-2">
             <Label htmlFor="media">Upload photos or videos</Label>
             <Input
               id="media"
               type="file"
               accept="image/*,video/*"
               multiple
               onChange={handleFilesChange}
             />
             <p className="text-xs text-muted-foreground">
               Admin approval is required before media is published.
             </p>
             {selectedFiles.length ? (
               <div className="flex flex-wrap gap-2">
                 {selectedFiles.map((file) => (
                   <Badge key={file.name} variant="secondary">
                     {file.name}
                   </Badge>
                 ))}
               </div>
             ) : null}
           </div>
 
           <div className="grid gap-4 md:grid-cols-2">
             <div className="grid gap-2">
               <Label htmlFor="contactName">Contact name</Label>
               <Input
                 id="contactName"
                 placeholder="Owner / agent name"
                 value={formState.contactName}
                 onChange={(event) =>
                   setFormState((prev) => ({
                     ...prev,
                     contactName: event.target.value,
                   }))
                 }
                 required
               />
             </div>
             <div className="grid gap-2">
               <Label htmlFor="contactPhone">Mobile number</Label>
               <Input
                 id="contactPhone"
                 placeholder="+91 98765 43210"
                 value={formState.contactPhone}
                 onChange={(event) =>
                   setFormState((prev) => ({
                     ...prev,
                     contactPhone: event.target.value,
                   }))
                 }
                 required
               />
             </div>
           </div>
 
           <div className="grid gap-2 md:max-w-md">
             <Label htmlFor="contactEmail">Email address</Label>
             <Input
               id="contactEmail"
               type="email"
               placeholder="name@email.com"
               value={formState.contactEmail}
               onChange={(event) =>
                 setFormState((prev) => ({
                   ...prev,
                   contactEmail: event.target.value,
                 }))
               }
               required
             />
           </div>
 
           <div className="rounded-lg border border-dashed border-border/60 p-4 text-sm text-muted-foreground">
             Listings are visible after membership payment and admin approval.
           </div>
 
           <Button type="submit" className="w-full md:w-fit" disabled={isSubmitting}>
             {isSubmitting
               ? "Submitting..."
               : listingId
               ? "Save changes"
               : "Submit for review"}
           </Button>
 
           {submitted ? (
             <p className="text-sm text-emerald-400">
               {listingId
                 ? "Listing updated. It may require re-approval."
                 : "Thanks! Your listing is in review. We will notify you after approval."}
             </p>
           ) : null}
           {submitError ? (
             <p className="text-sm text-red-400">{submitError}</p>
           ) : null}
         </form>
       </CardContent>
     </Card>
   );
 }
