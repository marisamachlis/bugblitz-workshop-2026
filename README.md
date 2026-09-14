# Bug Blitz Workshop 2026 — The Green Nook

An Angular storefront for house plants and care supplies, with intentionally
baked-in bugs for a hands-on debugging workshop.

Originally developed for a planned Grace Hopper Celebration 2026 session.

See the [Bug Blitz guide](https://dianagracie.github.io/bugblitz-guide-ghc2026/index.html)
for workshop instructions & activities.

## Run locally

You need **Node 22 or later**, which includes npm. If needed, install Node from
[nodejs.org](https://nodejs.org/).

Clone this repo, then run from the project root:

```bash
npm install && npm start
```

This starts the app and its local mock API server. Open **http://localhost:4200**.

Edit the source files to work through the exercises; the app updates as you save.

Skip the local setup and run the workshop in your browser with StackBlitz. See
the [StackBlitz setup guide](https://dianagracie.github.io/bugblitz-guide-ghc2026/index.html#setup).

## Mock data and orders

Products and coupons use sample data. Orders placed through checkout can be
looked up by email on **My Orders**. Orders are stored in memory and reset when
the mock API server restarts. Orders stay on your local server and aren’t shared
with other participants.

## Project layout

```text
src/
├── app/
│   ├── components/       # Storefront UI components and pages
│   ├── data/             # Data normalization helpers and product images
│   ├── models/           # Shared application interfaces
│   ├── services/         # Storefront state, behavior, and data access
│   └── workshop-setup/   # Local mock API adapter — outside the bug exercises
└── main.ts               # Application bootstrap and routes
workshop-setup/           # Local mock API and dev tooling — outside the bug exercises
```
