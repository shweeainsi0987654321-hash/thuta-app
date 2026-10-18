import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getListings, imageUrl } from "./api";
import type { Listing } from "./types";
import "./search.css";

const cities = ["Yangon", "Mandalay", "Bago"];
const properties = ["Condo", "House", "Apartment", "Townhouse", "Studio"];

const money = (value: number, currency: string) => `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)} ${currency}`;

function ResultCard({ listing }: { listing: Listing }) {
  const photo = listing.photos?.[0];
  return <Link className="result-card" to={`/listings/${listing.id}`}>
    <div className="result-card-image">
      {photo ? <img src={imageUrl(photo.url)} alt={photo.altText ?? listing.title} /> : <div className="image-placeholder">{listing.city}</div>}
      <span className="pill">{listing.transactionType}</span>
      <span className="photo-count">▧ {listing.photos?.length ?? 0}</span>
    </div>
    <div className="result-card-body">
      <div className="result-card-title"><h3>{listing.title}</h3><strong>{money(listing.price, listing.currency)}</strong></div>
      <p className="result-location">{listing.city} <span>·</span> {listing.propertyType}</p>
      <div className="result-facts"><span>{listing.bedrooms} bed</span><span>{listing.bathrooms} bath</span><span>{listing.area} {listing.areaUnit}</span></div>
    </div>
  </Link>;
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="filter-field"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}><option value="">Any</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

export default function SearchView() {
  const { city } = useParams();
  const [params, setParams] = useSearchParams();
  const queryParams = new URLSearchParams(params);
  if (city && !queryParams.get("city")) queryParams.set("city", city);
  const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
  const listings = useQuery({ queryKey: ["listings", query], queryFn: () => getListings(query) });

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    next.delete("page");
    setParams(next);
  };
  const clearFilters = () => setParams(city ? new URLSearchParams({ city }) : new URLSearchParams());
  const activeFilters = useMemo(() => ["keyword", "city", "transactionType", "propertyType", "minPrice", "maxPrice", "minBedrooms", "minBathrooms"].filter((key) => queryParams.get(key)), [queryParams]);
  const heading = city ? `Homes in ${city}` : params.get("keyword") ? `Homes for “${params.get("keyword")}"` : "Find your next address";

  return <section className="search-page">
    <div className="search-intro"><div><p className="eyebrow">Explore properties</p><h1>{heading}<span>.</span></h1><p>Compare homes across Myanmar with filters that stay in your URL.</p></div><div className="search-summary"><strong>{listings.data?.pagination.total ?? 0}</strong><span>published homes</span></div></div>
    <div className="filter-panel">
      <div className="filter-main"><label className="filter-search"><span>Search</span><input value={params.get("keyword") ?? ""} onChange={(event) => update("keyword", event.target.value)} placeholder="City, neighborhood, or property" /></label><FilterSelect label="City" value={params.get("city") ?? city ?? ""} options={cities} onChange={(value) => update("city", value)} /><FilterSelect label="Listing type" value={params.get("transactionType") ?? ""} options={["buy", "sell", "rent"]} onChange={(value) => update("transactionType", value)} /><FilterSelect label="Property" value={params.get("propertyType") ?? ""} options={properties} onChange={(value) => update("propertyType", value)} /></div>
      <div className="filter-secondary"><label className="filter-field"><span>Min price</span><input inputMode="numeric" value={params.get("minPrice") ?? ""} onChange={(event) => update("minPrice", event.target.value)} placeholder="MMK" /></label><label className="filter-field"><span>Max price</span><input inputMode="numeric" value={params.get("maxPrice") ?? ""} onChange={(event) => update("maxPrice", event.target.value)} placeholder="MMK" /></label><FilterSelect label="Bedrooms" value={params.get("minBedrooms") ?? ""} options={["1", "2", "3", "4", "5"]} onChange={(value) => update("minBedrooms", value)} /><FilterSelect label="Bathrooms" value={params.get("minBathrooms") ?? ""} options={["1", "2", "3", "4"]} onChange={(value) => update("minBathrooms", value)} /><label className="filter-field sort-field"><span>Sort by</span><select value={params.get("sort") ?? ""} onChange={(event) => update("sort", event.target.value)}><option value="">Newest</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option></select></label></div>
    </div>
    <div className="results-toolbar"><div className="active-filters">{activeFilters.length ? <>{activeFilters.map((key) => <button key={key} className="filter-chip" onClick={() => update(key, "")}>{key === "transactionType" ? params.get(key)?.toUpperCase() : params.get(key)} ×</button>)}<button className="clear-filters" onClick={clearFilters}>Clear all</button></> : <span>Showing every published listing</span>}</div><span className="results-count">{listings.data?.pagination.total ?? 0} results</span></div>
    {listings.isError ? <div className="state error"><h3>Could not load listings.</h3><p>Check that the API is running on port 4001.</p></div> : listings.isLoading ? <div className="loading">Finding places that fit…</div> : listings.data?.data.length ? <div className="results-grid">{listings.data.data.map((listing) => <ResultCard key={listing.id} listing={listing} />)}</div> : <div className="state"><h3>No homes match those filters.</h3><p>Try clearing one of the filters to widen your search.</p><button className="button" onClick={clearFilters}>Clear filters</button></div>}
  </section>;
}
