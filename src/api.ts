import type { Listing, User } from "./types";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api/v1";
export const API_ORIGIN = import.meta.env.VITE_API_ORIGIN ?? "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const isMultipart = typeof FormData !== "undefined" && init?.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, { credentials: "include", headers: { ...(isMultipart ? {} : { "Content-Type": "application/json" }), ...(init?.headers ?? {}) }, ...init });
  if (response.status === 204) return undefined as T;
  const body = await response.json();
  if (!response.ok) throw new Error(body.error?.message ?? "Request failed");
  return body;
}

export function imageUrl(url?: string) { return url?.startsWith("http") ? url : `${API_ORIGIN}${url ?? ""}`; }
export const getListings = (query: string) => request<{ data: Listing[]; pagination: { page: number; total: number; totalPages: number } }>(`/listings${query}`);
export const getListing = (id: string) => request<{ data: Listing }>(`/listings/${id}`);
export const me = () => request<{ user: User }>("/auth/me");
export const login = (email: string, password: string) => request<{ user: User }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
export const register = (name: string, email: string, password: string) => request<{ user: User }>("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
export const logout = () => request<void>("/auth/logout", { method: "POST" });
export const getMyListings = () => request<{ data: Listing[] }>("/me/listings");
export const createListing = (input: import("./types").ListingInput) => request<{ data: Listing }>("/me/listings", { method: "POST", body: JSON.stringify(input) });
export const uploadListingPhoto = (listingId: string, file: File) => { const form = new FormData(); form.append("photo", file); return request<{ data: { id: string; url: string } }>(`/me/listings/${listingId}/photos`, { method: "POST", body: form }); };
export const publishListing = (listingId: string) => request<{ data: Listing }>(`/me/listings/${listingId}/publish`, { method: "POST" });
export const pauseListing = (listingId: string) => request<{ data: Listing }>(`/me/listings/${listingId}/pause`, { method: "POST" });
export const deleteListing = (listingId: string) => request<void>(`/me/listings/${listingId}`, { method: "DELETE" });
export const getAdminStats = () => request<{ data: { listings: Record<string, number>; owners: number } }>("/admin/stats");
export const getAdminListings = (status = "") => request<{ data: Listing[] }>(`/admin/listings${status ? `?status=${encodeURIComponent(status)}` : ""}`);
export const updateAdminListingStatus = (listingId: string, status: "draft" | "published" | "paused" | "deleted") => request<{ data: Listing }>(`/admin/listings/${listingId}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
