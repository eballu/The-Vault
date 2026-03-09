# Backend — Prisma & Supabase workflow

deployed on Render
https://vault-backend-0pjh.onrender.com
This document explains the recommended workflow for working with Prisma and Supabase in this project.

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

Key idea

- Use the Supabase pooler (pgbouncer) for running the application (keep `DATABASE_URL` pointing at the pooler).
- Use the direct database connection (`DIRECT_URL`) only for migrations, schema pushes, and Prisma Studio to avoid pooling/prepared-statement issues.

Available npm scripts (PowerShell-friendly)

- `npm run prisma:generate`
  - Regenerates Prisma Client after schema changes.

- `npm run db:push:direct`
  - Temporarily sets `DATABASE_URL` to `DIRECT_URL` for the command and runs `npx prisma db push`.
  - Use this to push schema changes directly to the database when you need to avoid pooler issues.

- `npm run migrate:deploy:direct`
  - Temporarily sets `DATABASE_URL` to `DIRECT_URL` and runs `npx prisma migrate deploy`.
  - Recommended for applying migrations in CI/production.

- `npm run studio:direct`
  - Open Prisma Studio connected to the direct DB. Useful when Studio can't list tables through the pooler.

How to run locally (PowerShell)

1. Install dependencies and generate client:

```powershell
cd backend
npm ci
npm run prisma:generate
```

2. Push schema (direct DB):

```powershell
cd backend
npm run db:push:direct
```

3. Open Prisma Studio (direct DB):

```powershell
cd backend
npm run studio:direct
```

CI / production recommendations

- Store `DIRECT_URL` and pooled `DATABASE_URL` as secrets in your CI/deployment environment (e.g., GitHub Secrets, Vercel environment variables).
- Run migrations in CI before deploying the new application release using the `DIRECT_URL` value.

Example GitHub Actions step (run migrations):

```yaml
- name: Run Prisma Migrations
  uses: actions/checkout@v4
  run: |
    cd backend
    npx prisma migrate deploy
  env:
    DATABASE_URL: ${{ secrets.DIRECT_URL }}
```

Security notes

- Never commit `.env`. Use `.env.example` for sample settings.
- Limit access to `DIRECT_URL` secret: only CI and admins should have it.
