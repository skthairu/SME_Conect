# SME Kenya Connect — Hostinger deployment

This version is prepared to run the React/Vite frontend and Node.js/Express API from **one Hostinger Node.js application**.

## Production build

Use:

```bash
pnpm run hostinger:build
```

The build produces the React site in `artifacts/kenya-smes/dist/public` and copies it into the API distribution so Express can serve the website and `/api/*` routes from the same domain.

## Start command

```bash
pnpm run start
```

## Required environment variables

Set these in Hostinger; do not commit real secrets:

- `NODE_ENV=production`
- `PORT` — supplied by Hostinger for the Node.js application
- `DATABASE_URL` — Hostinger PostgreSQL connection string
- `SESSION_SECRET` — long random secret
- `STRIPE_SECRET_KEY` — Stripe secret key
- `STRIPE_WEBHOOK_SECRET` — signing secret for the Stripe webhook endpoint

## Stripe webhook

Create a Stripe webhook pointing to:

`https://YOUR-DOMAIN/api/stripe/webhook`

Use the webhook signing secret as `STRIPE_WEBHOOK_SECRET`.

## Database

Run the Drizzle schema push from the project root after configuring `DATABASE_URL`:

```bash
pnpm --filter @workspace/db push
```

Back up the database before applying schema changes to an existing production database.
