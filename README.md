# Timer App

A React Next.js application that allows users to create and manage customizable timer sequences. Perfect for workout intervals, cooking, presentations, or any time-based activities.

## Features

- Create multiple timers with custom durations
- Run timer sequences
- Customizable timer settings
- Persistent storage using PostgreSQL database
- Modern, responsive interface built with React and Next.js

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v20 or higher)
- Docker and Docker Compose
- npm package manager

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ThomasRainford/timer-app
cd timer-app
```

### 2. Install Dependences

```bash
npm install
```

### 3. Environment Setup

Create a .env file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/timer_db"
```

### 4. Database Setup

The application uses PostgreSQL as its database. Follow these steps to set up the database:

##### 1. Start the local PostgreSQL database:

```bash
docker-compose up
```

##### 2. Run database migrations:

```bash
npm run db:migrate:reset
```

##### 3. Seed the database with initial data:

```bash
npx prisma db seed
```

### 5. Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run db:migrate:reset` - Reset and run database migrations
- `npm run test` - Run test suite

### Database Management

- The application uses Prisma as the ORM
- Migrations are stored in `prisma/migrations`
- Database schema is defined in `prisma/schema.prisma`
