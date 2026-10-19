# Web app feature specification

This file describes browser features that may evolve over time. Stable technology choices and repository constraints are in `AGENTS.md`; local setup is in `README.md`.

## Public experience

- The home page introduces the marketplace, links to supported cities, and shows featured listings.
- Search and city pages browse published listings across Yangon, Mandalay, and Bago.
- Search supports keyword, city, transaction type, and sort order. Filter state is represented in the URL so links can be shared and browser navigation works.
- Listing detail pages show property details, photos, and the preferred contact method.
- A light/dark appearance choice is available and remembered in the browser.

## Accounts and owner workspace

- People can register with name, email, and password or sign in with existing credentials.
- The dashboard provides owner listing management.
- Owners can create a listing, upload photos, publish when a photo is present, pause, and delete their listings.
- Listing fields include transaction type, title, description, price and currency, city, address, property type, bedrooms, bathrooms, area and unit, and contact preference.

## Administrator workspace

Users with administrator access can review marketplace listings, view summary counts, filter listings by status, and change listing status.

## Interaction requirements

- Show loading, empty, and error states for asynchronous data.
- Preserve understandable validation and API failure feedback in forms.
- Keep controls labeled and usable with keyboard navigation and responsive browser layouts.
- Do not show unpublished listings in public browsing.
