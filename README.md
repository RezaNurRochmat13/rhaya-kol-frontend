# KOL Dashboard

Dashboard for monitoring KOL (Key Opinion Leader) performance and daily engagement across Instagram and TikTok.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS v4** (styling)
- **Recharts** (engagement trend charts)
- **Axios** (HTTP client)
- **Lucide React** (icons)

## Getting Started

```bash
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:5173` and expects the backend API at `http://localhost:8081`.

## Build

```bash
pnpm build
```

## Features

- View KOL posts with latest likes, comments, and shares
- 7-day engagement trend line chart per post
- Supports Instagram and TikTok platforms
- Auto-fetches from `/api/posts/summary` on load
