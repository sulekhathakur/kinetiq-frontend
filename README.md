# Kinetiq — Frontend

React frontend for [Kinetiq](https://github.com/sulekhathakur/Kinetiq) — an AI-powered career progress tracker. This repo contains the client application; the backend (Java/Spring Boot, deployed separately on Render) lives in the linked repo above.

**Live app:** [kinetiq-frontend.vercel.app](https://kinetiq-frontend.vercel.app)

**Status:** Fully deployed and functional. Auth, check-in submission with evidence, momentum tracking, and AI-generated weekly recommendations all work end-to-end against the live backend.

## Tech stack

- React
- Vite
- Tailwind CSS v4 (custom theme tokens — navy/amber palette)
- React Router
- Axios

## Features

- Register / login with JWT stored in `localStorage`, attached automatically to every request via an Axios interceptor
- Dashboard showing live momentum score and the latest AI-generated weekly recommendation
- Check-in form (type, description, date, optional evidence link)
- On-demand AI recommendation generation, pulling from real check-in history

## Local setup

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file in the project root:
VITE_API_URL=http://localhost:8080/api (Falls back to this same value automatically if unset — only needed if you want to point at a different backend.)
4. Run `npm run dev`
5. Open `http://localhost:5173`

## Roadmap

- [x] Project scaffold (Vite + React)
- [x] Tailwind CSS v4 configured with custom theme tokens
- [x] Auth pages (register/login)
- [x] Check-in submission form with evidence
- [x] Dashboard with live momentum data
- [x] Weekly recommendation display and on-demand generation
- [x] Deployed to Vercel, connected to live backend
- [ ] Momentum trend chart
- [ ] Evidence history view

## Author

**Sulekha Thakur** — [GitHub](https://github.com/sulekhathakur)