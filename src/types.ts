export type Listing = {
  id: string; transactionType: "buy" | "sell" | "rent"; title: string; description: string;
  price: number; currency: string; city: "Yangon" | "Mandalay" | "Bago"; address: string;
  propertyType: string; bedrooms: number; bathrooms: number; area: number; areaUnit: string;
  contactPreference: string; status: string; photos: { id: string; url: string; alt_text?: string; altText?: string; sort_order?: number; sortOrder?: number }[];
  publishedAt?: string | null; createdAt?: string; updatedAt?: string; ownerId?: string;
};
export type User = { id: string; email: string; name: string; role: "owner" | "admin" };

export type ListingInput = {
  transactionType: "buy" | "sell" | "rent"; title: string; description: string; price: number; currency: string;
  city: "Yangon" | "Mandalay" | "Bago"; address: string; propertyType: string; bedrooms: number; bathrooms: number;
  area: number; areaUnit: string; contactPreference: "phone" | "email" | "both";
};
