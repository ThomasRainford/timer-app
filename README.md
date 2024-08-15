# Timer App

A React Next.js app for creating and running a series of customisable timers.

## Local Development

### Local Postgres Database

This app uses a Postgres database that can be run locally. The migrations and a seeder will then need to be run.

To start the local Postgres database:

```bash
docker-compose up
```

Then run the migrations:

```bash
npm run db:migrate:reset
```

Then run the seeder:

```bash
npx prisma db seed
```

### Developemnt Server

To start the development server:

```bash
npm run dev
```
