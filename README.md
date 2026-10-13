# Bug Blitz Workshop 2026 — Leafy Co.

An Angular storefront for house plants and care supplies, with intentionally
baked-in bugs for a hands-on debugging workshop.

Originally developed for a planned Grace Hopper Celebration 2026 session.

See the [Bug Blitz guide](https://dianagracie.github.io/bugblitz-guide-ghc2026/index.html)
for workshop activities.

## Start in StackBlitz

1. Open the workshop’s StackBlitz project and **Fork** it to create your own copy.
2. Wait for dependencies to install and the app to start.
3. Open the app in the **Preview** pane. Products should be displayed even though
   the app contains intentional bugs.

If the app doesn’t start automatically, run this in the StackBlitz terminal:

```bash
npm install && npm start
```

This workshop uses StackBlitz WebContainers to run the app and mock API in your
browser. No local installation is needed.

Edit files in the StackBlitz editor to work through the exercises, and **Save**
your project to keep your changes. You can use **Open in New Window** above the
preview to open the app in a separate tab for browser DevTools.

## Mock data and orders

Products and coupons use sample data. Orders placed through checkout can be
looked up by email on **My Orders**. Orders are stored in memory and reset when
the mock API server restarts. Orders are saved only in your workspace and aren’t shared with other participants.

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
