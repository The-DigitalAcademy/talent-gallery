# Talent Gallery

Talent Gallery is a Next.js application used to showcase learner talent profiles and make them accessible to Workplace Experience (WPE) and employment/absorption partners.

# Quick Development Setup

```bash
# Clone repository
git clone <repository-url>
cd talent-gallery

# Install dependencies
pnpm install

# Configure.env with values for
# google client, Local site URLs

# Start local Supabase
pnpm supabase start

# Reset database and apply migrations + seed data
pnpm supabase db reset

# Configure .env
# Add the local Supabase credentials and required external service credentials

# Start Next.js
pnpm dev
```

---

# Local Development Setup

## Prerequisites

Before setting up the project, install the following:

- Node.js
- pnpm
- Docker Desktop — required to run Supabase locally.
- Git

## 1. Clone the Repository

Clone the repository and move into the project directory:

```bash
git clone <repository-url>
cd talent-gallery
```

## 2. Install Dependencies

Install the project's dependencies using pnpm:

```bash
pnpm install
```

## 3. Configure Environment Variables

Create a local environment file from the `env.example` file:

```bash
cp env.example .env
```

### Local Supabase values

After starting Supabase, run:

```
pnpm supabase status
```

This displays the local Supabase services and credentials. Use the API URL and publishable key provided by the CLI for:

```env
SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=

SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

### Local site URLs

For normal local development, the application will typically run at:

```env
SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

ADMIN_REDIRECT_URL=http://localhost:3000/admin/auth/callback
NEXT_PUBLIC_ADMIN_REDIRECT_URL=http://localhost:3000/admin/auth/callback
```

If the application uses a different local port or redirect path, update these values accordingly.

## 4. Apply the Database

The repository contains the project's Supabase configuration and database migrations in the `/supabase` directory.

After starting Supabase, apply the migrations with:

```
pnpm supabase migration up
```

If you are setting up the project for the first time, you can also reset the local database to apply all migrations and seed data:

```
pnpm supabase db reset
```

The project is configured to use:

```
supabase/seed.sql
```

for local seed data.

> **Warning:** `supabase db reset` is destructive. Any data currently stored in the local database will be deleted.

---

## 5. Start the Next.js Application

Once Supabase is running and your environment variables are configured:

```
pnpm dev
```

The application should be available at: http://localhost:3000

---

# Database Development

## Migrations

https://supabase.com/docs/guides/local-development/database-migrations

## Resetting the Local Database

To completely rebuild the local database:

```
pnpm supabase db reset
```

This will:

- Drop the existing local database.
- Recreate the database.
- Run all migrations in order.
- Run `supabase/seed.sql`.

Use this when:

- You need a clean database.
- A migration has changed.
- Your local database is in an inconsistent state.
- You want to verify that the database can be recreated from scratch.
- You need to reload the seed data.

**Do not use this if you need to preserve your local database data.**

---

# Supabase Google Authentication

Google authentication is enabled in the local Supabase configuration.

The following environment variables are used:
The local Supabase reads these values from a `.env` file. They must be placed in a file explicitly named `.env`

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

These values need to correspond to the Google OAuth application configured for local development.

[Setup Google OAuth Client](https://support.google.com/cloud/answer/15549257?sjid=9883916463429395100-EU)

---

# External Services

The application integrates with several external services using env variables.

## Vercel Blob

Used for application file/blob storage.

```env
BLOB_STORE_ID=
BLOB_READ_WRITE_TOKEN=

```

## Sentry

Used for application error monitoring.

```
SENTRY_AUTH_TOKEN=
NEXT_PUBLIC_SENTRY_DSN=
```

## Google Analytics

Used for website analytics.

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=s
```

## Brevo

Used for application email delivery.

```
BREVO_SENDER_NAME=
BREVO_API_KEY=
BREVO_SENDER_EMAIL=
BREVO_ADMIN_EMAIL=
```

These services may require access to the team's existing accounts/configuration.
