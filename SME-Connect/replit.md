# SME Connect

SME Connect is a React/Vite and Node.js/Express web application for SME membership, programmes, marketplace services, events, e-mobility, business support and donations.

## Hostinger deployment

This repository has been prepared to run the React frontend and Express API as one Node.js application. See `HOSTINGER.md` for deployment settings and environment variables.

- `pnpm run hostinger:build` — build the frontend and API and place the frontend inside the API distribution.
- `pnpm start` — start the production Node.js application.
- `pnpm run typecheck` — type-check the workspace.
- `pnpm run db:push` — apply the Drizzle database schema.

## Stack

- React + Vite
- Node.js + Express 5
- PostgreSQL + Drizzle ORM
- Stripe Checkout and Stripe webhooks
- TypeScript

## Production environment

Required values are documented in `.env.example`. Stripe no longer depends on Replit connectors; it uses `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
