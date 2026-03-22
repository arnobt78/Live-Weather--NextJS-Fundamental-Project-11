# AI-Powered Weather & Farming Advisory Dashboard - Next.js, React, TypeScript, OpenWeather API, Agro API, Unsplash API, TailwindCSS, Framer Motion Fundamental Project 11

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Agro API](https://img.shields.io/badge/Agro_API-1.0-green?logo=agro&logoColor=white)](https://agro.com/)
[![Unsplash API](https://img.shields.io/badge/Unsplash_API-1.0-blue?logo=unsplash&logoColor=white)](https://unsplash.com/)
[![OpenWeather API](https://img.shields.io/badge/OpenWeather_API-1.0-yellow?logo=openweather&logoColor=white)](https://openweathermap.org/)

An **educational, full-stack style** weather application that goes beyond a simple temperature readout: it combines **live OpenWeather data**, **5-day forecast**, **air quality**, **dynamic Unsplash backgrounds**, **AI-generated weather summaries and farming tips** (via server API routes), and a **glassmorphism UI** built with **Next.js App Router**, **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It is designed so you can read the code, trace data from UI → Route Handler → external API, and reuse pieces (hooks, UI primitives, context) in your own apps.

**Live demo:** [https://weather-farming.vercel.app/](https://weather-farming.vercel.app/)

---

## Table of contents

1. [What you will learn](#what-you-will-learn)
2. [Features at a glance](#features-at-a-glance)
3. [Technology stack](#technology-stack)
4. [Dependencies & libraries (why they exist)](#dependencies--libraries-why-they-exist)
5. [Project structure](#project-structure)
6. [App routes & pages](#app-routes--pages)
7. [API routes (backend in Next.js)](#api-routes-backend-in-nextjs)
8. [How the app works (data flow walkthrough)](#how-the-app-works-data-flow-walkthrough)
9. [Environment variables (`.env`)](#environment-variables-env)
10. [Installation & how to run](#installation--how-to-run)
11. [Reusing components & patterns in other projects](#reusing-components--patterns-in-other-projects)
12. [Code snippets (illustrative)](#code-snippets-illustrative)
13. [Keywords](#keywords)
14. [Conclusion](#conclusion)
15. [License](#license)
16. [Happy coding](#happy-coding)

---

## What you will learn

- How a **Next.js 16** app uses the **App Router** (`app/`), **Server Components** for initial data (e.g. home weather + SEO), and **Client Components** (`"use client"`) for interactivity.
- How to call **external REST APIs** safely: **server-only** keys in **Route Handlers** (`app/api/.../route.ts`), not exposed to the browser.
- How **React Context** can hold city, coordinates, saved cities, and current weather for the whole UI.
- How **Tailwind CSS** + small **UI primitives** (Card, Button, Input, **SafeImage**) keep styling consistent.
- How **`SafeImage`** wraps **`next/image`** and falls back to a native **`<img>`** if optimization fails (e.g. Vercel Image Optimization **402**), so remote photos still load.
- How **Framer Motion** adds enter/exit animations without blocking data logic.
- Optional: **AI fallbacks** (Gemini → Groq → OpenRouter) and **Unsplash** for imagery.

---

## Features at a glance

| Area                | What it does                                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **City search**     | Navbar search navigates to `/?city=...`; home page loads weather for that city.                                   |
| **Current weather** | Temperature, feels-like, humidity, wind, pressure, visibility, sunrise/sunset, country, coordinates.              |
| **Weather visuals** | OpenWeather icons + local/GIF overlays by condition; hero cards use glass styling.                                |
| **5-day forecast**  | Aggregated daily view from OpenWeather 5-day/3-hour API.                                                          |
| **Air quality**     | AQI + pollutants (PM2.5, PM10, O₃, NO₂, SO₂, CO, etc.) with short “quick guide” copy.                             |
| **AI insights**     | Buttons call `/api/ai/summary` and `/api/ai/farming-tips` with JSON body; streamed or plain text response.        |
| **TTS (optional)**  | `/api/ai/tts` can turn text to speech when configured (see env).                                                  |
| **Backgrounds**     | `WeatherBackground` + SSR/cookie-aware preload; Unsplash when `UNSPLASH_ACCESS_KEY` is set.                       |
| **Gallery**         | `/gallery` — browse Unsplash photos by weather-related keyword.                                                   |
| **Remote images**   | **`SafeImage`** (`Components/ui/safe-image.tsx`) — uses **`next/image`** first; on error switches to unoptimized **`<img>`** (home icons + gallery grid). |
| **Persistence**     | City + saved cities + background URL synced via **cookies** (SSR-friendly) and **localStorage** where applicable. |
| **SEO**             | Rich `metadata` in `src/app/layout.tsx` (title, description, Open Graph, author).                                 |

---

## Technology stack

| Layer            | Choice                                          | Role                                                                |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------------------- |
| **Framework**    | [Next.js](https://nextjs.org/) 16               | Routing, SSR/RSC, API routes, image optimization, deployment story. |
| **UI library**   | [React](https://react.dev/) 19                  | Components, hooks, client islands.                                  |
| **Language**     | [TypeScript](https://www.typescriptlang.org/)   | Types for API responses (`src/types/*`).                            |
| **Styling**      | [Tailwind CSS](https://tailwindcss.com/)        | Utility-first layout, glassmorphism-style tokens.                   |
| **Animation**    | [Framer Motion](https://www.framer.com/motion/) | `motion.div`, presence, staggered lists.                            |
| **Icons**        | [Lucide React](https://lucide.dev/)             | Consistent SVG icons.                                               |
| **Weather data** | [OpenWeather](https://openweathermap.org/)      | Current weather, geocoding, forecast, air pollution.                |
| **Images**       | [Unsplash API](https://unsplash.com/developers) + `next/image` | Optional backgrounds/gallery; **`SafeImage`** adds **`<img>`** fallback if the optimizer fails. |
| **AI**           | Gemini / Groq / OpenRouter (optional)           | Text generation behind server routes.                               |
| **Lint**         | ESLint + `eslint-config-next`                   | `npm run lint`.                                                     |

---

## Dependencies & libraries (why they exist)

- **`next`, `react`, `react-dom`** — Core framework and UI runtime.
- **`framer-motion`** — Declarative animations (e.g. list stagger, card fade-in).
- **`lucide-react`** — Tree-shakeable icons (`CloudRain`, `MapPin`, etc.).
- **`clsx` + `tailwind-merge` + `class-variance-authority`** — Composing class names safely (see `src/lib/utils.ts` and UI variants). **CVA** helps “button has 3 visual variants” without string chaos.
- **`edge-tts-universal`** — Used when building TTS responses on the server (if your `tts` route is wired to it).

**Dev:** `typescript`, `@types/*`, `tailwindcss`, `postcss`, `autoprefixer`, `eslint`, `eslint-config-next`.

---

## Project structure

High-level map (paths under `src/` unless noted):

```bash
weather-farming/
├── public/                    # Static assets (favicon, weather PNGs, GIF backgrounds)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout: metadata SEO, fonts, providers, navbar, footer, background
│   │   ├── page.tsx           # Home (SSR weather + passes props)
│   │   ├── globals.css        # Global CSS, scrollbar utilities, animations
│   │   ├── gallery/page.tsx   # Gallery route
│   │   └── api/               # Route handlers = “backend”
│   │       ├── forecast/route.ts
│   │       ├── air-quality/route.ts
│   │       ├── unsplash/route.ts
│   │       └── ai/
│   │           ├── summary/route.ts
│   │           ├── farming-tips/route.ts
│   │           └── tts/route.ts
│   ├── Components/
│   │   ├── pages/             # Large page-level UIs (home-page, gallery-page)
│   │   ├── shared/            # Navbar, Footer, WeatherBackground, preload helpers
│   │   └── ui/                # Reusable: Card, Input, Badge, Skeleton, RippleButton, SafeImage (next/image + img fallback), …
│   ├── context/               # WeatherContext — city, lat/lon, saved cities, current weather
│   ├── hooks/                 # e.g. useWeather — fetch + state for city search flow
│   ├── lib/                   # openweather, unsplash, ai, background, tts, utils
│   ├── types/                 # TypeScript models for API JSON
│   ├── data/constants.ts      # Default city, weather→image/GIF/Unsplash query maps, cookie keys
│   └── provider/              # AppProvider (extension point)
├── .env.example               # Documented environment variables (copy → .env.local)
├── next.config.ts             # Next config (e.g. remote image patterns)
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## App routes & pages

| Route             | File                                              | Purpose                                                                    |
| ----------------- | ------------------------------------------------- | -------------------------------------------------------------------------- |
| **`/`**           | `app/page.tsx` + `Components/pages/home-page.tsx` | Main dashboard: weather, forecast, AQI, AI cards, search via query string. |
| **`/gallery`**    | `app/gallery/page.tsx` + `gallery-page.tsx`       | Photo grid from Unsplash by keyword.                                       |
| **`/_not-found`** | Next.js built-in                                  | 404 handling.                                                              |

---

## API routes (backend in Next.js)

These are **server-side** endpoints. They can use **secret** env vars; the browser only calls your origin (`/api/...`), not OpenWeather/Gemini directly.

| Method | Path                           | Role                                                         |
| ------ | ------------------------------ | ------------------------------------------------------------ |
| `GET`  | `/api/forecast?lat=&lon=`      | Proxies OpenWeather 5-day forecast.                          |
| `GET`  | `/api/air-quality?lat=&lon=`   | Proxies OpenWeather air pollution.                           |
| `GET`  | `/api/unsplash?keyword=&page=` | Returns Unsplash search JSON (used by background + gallery). |
| `POST` | `/api/ai/summary`              | Body: city + weather snapshot → AI paragraph.                |
| `POST` | `/api/ai/farming-tips`         | Body: city + weather → AI farming tips.                      |
| `POST` | `/api/ai/tts`                  | Body: text → audio (when TTS stack configured).              |

**Security note:** Keep `OPENWEATHER_API_KEY`, `GOOGLE_GEMINI_API_KEY`, `UNSPLASH_ACCESS_KEY`, etc. in **server** env only. Prefer `OPENWEATHER_API_KEY` over `NEXT_PUBLIC_*` for weather if you want zero key exposure to the client bundle.

---

## How the app works (data flow walkthrough)

1. **First load of `/`**
   - `app/page.tsx` runs on the server: reads cookies (city, saved cities, optional background URL), fetches weather for the resolved city, may fetch initial background URL via `getInitialBackgroundUrl`.
   - HTML is sent with meaningful content for SEO and faster paint.

2. **Client hydration**
   - `WeatherProvider` receives initial city/saved list from cookies so **navbar** and **home** don’t fight (hydration-safe).
   - `HomePage` uses `useWeather` + `useSearchParams` to react to `?city=`.
   - **Images:** `home-page` and `gallery-page` use **`SafeImage`** so Unsplash/OpenWeather URLs still render if **`/_next/image`** returns an error (e.g. quota **402** on Vercel).

3. **After weather is “ready”**
   - `lat`/`lon` from context drive `useEffect` fetches to `/api/forecast` and `/api/air-quality`.

4. **AI buttons**
   - POST JSON to `/api/ai/summary` or `/api/ai/farming-tips`.
   - Server builds a prompt, calls `generateWithAI` in `lib/ai.ts` (Gemini → Groq → OpenRouter).
   - If no AI key is set, routes typically return an error JSON — UI should show a message.

5. **Background**
   - `WeatherBackground` uses current weather’s keyword to refetch Unsplash client-side; initial image may come from SSR/cookie for consistency across navigations.

---

## Environment variables (`.env`)

You **do** need configuration for a **fully working** demo on your machine:

| Variable                                                       | Required?                | Purpose                                                                          |
| -------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------- |
| `OPENWEATHER_API_KEY` **or** `NEXT_PUBLIC_OPENWEATHER_API_KEY` | **Yes** for real weather | Without a key, `fetchWeatherByCity` returns `null` and the app has no live data. |
| `NEXT_PUBLIC_APP_TITLE`                                        | Optional                 | Overrides default `<title>` segment (see `layout.tsx`).                          |
| `NEXT_PUBLIC_SITE_URL`                                         | Optional                 | Canonical / Open Graph base URL (e.g. `https://weather-farming.vercel.app`).     |
| `UNSPLASH_ACCESS_KEY`                                          | Optional                 | Dynamic backgrounds + gallery; without it, those features degrade or error.      |
| `GOOGLE_GEMINI_API_KEY`                                        | Optional (AI)            | First choice for AI text.                                                        |
| `GROQ_API_KEY`                                                 | Optional (AI)            | Second fallback.                                                                 |
| `OPENROUTER_API_KEY`                                           | Optional (AI)            | Third fallback.                                                                  |
| `AGRO_API_KEY`                                                 | Optional                 | Reserved for Agro-related integrations if you extend the app.                    |
| `ELEVENLABS_API_KEY`                                           | Optional                 | If you wire premium TTS.                                                         |

**There is no `.env` committed** — copy **`.env.example`** → **`.env.local`** (Next.js loads it automatically in dev/build).

### How to obtain keys (quick)

1. **OpenWeather** — Sign up at [openweathermap.org](https://openweathermap.org/api), create an API key, paste into `OPENWEATHER_API_KEY`.
2. **Unsplash** — [Unsplash Developers](https://unsplash.com/developers): create an app, copy **Access Key** → `UNSPLASH_ACCESS_KEY`.
3. **Gemini** — [Google AI Studio](https://aistudio.google.com/) → API key → `GOOGLE_GEMINI_API_KEY`.
4. **Groq** — [console.groq.com](https://console.groq.com/) → `GROQ_API_KEY`.
5. **OpenRouter** — [openrouter.ai](https://openrouter.ai/) → `OPENROUTER_API_KEY`.

---

## Installation & how to run

```bash
git clone <your-repo-url>
cd weather-farming
npm install
cp .env.example .env.local
# Edit .env.local — at minimum set OPENWEATHER_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Command         | Description                        |
| ------ | --------------- | ---------------------------------- |
| Dev    | `npm run dev`   | Next.js dev server (Turbopack).    |
| Build  | `npm run build` | Production build + typecheck.      |
| Start  | `npm run start` | Run production server after build. |
| Lint   | `npm run lint`  | ESLint across the repo.            |

**Deploy:** Vercel (see `vercel.json`). Set the same env vars in the Vercel project settings.

---

## Reusing components & patterns in other projects

| Piece                                       | Reuse idea                                                                                          |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **`WeatherProvider` + `useWeatherContext`** | Copy pattern for any “global session” state (locale, cart, theme).                                  |
| **`useWeather` hook**                       | Template for `useCallback` + `useState` + API error/not-found handling.                             |
| **`Components/ui/*`**                       | Drop `Card`, `Input`, `RippleButton` into another Tailwind app; keep `cn()` from `lib/utils.ts`.    |
| **`SafeImage`**                             | Copy `safe-image.tsx` anywhere you use **`next/image`** with remote URLs and want a **native `<img>`** fallback on load failure. |
| **Route handlers**                          | Copy `app/api/forecast/route.ts` pattern: validate query → call server `lib` → `NextResponse.json`. |
| **`lib/openweather.ts`**                    | Single place for all OpenWeather URLs and typing — extend with one-call API or maps.                |
| **Metadata object in `layout.tsx`**         | Template for SEO on your next marketing or dashboard site.                                          |

---

## Code snippets (illustrative)

**Server fetch in a page (conceptual):**

```ts
// app/page.tsx — simplified idea
const data = await fetchWeatherByCity(cityName);
```

**Client calling your API route (never put the secret key here):**

```ts
const res = await fetch("/api/forecast?lat=51.5&lon=-0.12");
const forecast = await res.json();
```

**Merging Tailwind classes safely:**

```ts
import { cn } from "@/lib/utils";
<div className={cn("p-4", isActive && "bg-sky-500/20")} />
```

---

## Keywords

Next.js, React, TypeScript, OpenWeather API, Agro API, weather dashboard, farming advisory, AI weather summary, air quality, AQI, forecast, Unsplash, next/image, SafeImage, Tailwind CSS, Framer Motion, App Router, Route Handlers, server components, glassmorphism, Vercel, full-stack learning, Arnob Mahmud

---

## Conclusion

**AI-Powered Weather & Farming Advisory Dashboard** is a practical playground for modern React and Next.js: typed APIs, server/client boundaries, environmental configuration, and a polished UI. Start by tracing one user action end-to-end (e.g. search city → `useWeather` → OpenWeather), then extend with your own card, route, or AI prompt.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy coding! 🎉

This is an **open-source project** — feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
