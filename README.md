# Content Ops Tool Backend

Production-grade backend API built with NestJS, Prisma, PostgreSQL, and JWT authentication.

## Live API

https://scintillating-bravery-production.up.railway.app/

## Swagger Documentation

https://scintillating-bravery-production.up.railway.app/api/docs

---

# Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger / OpenAPI
- Railway Deployment
- REST API Architecture

---

# Features

- User Registration
- User Login
- JWT Access Token Authentication
- Refresh Token Flow
- Role-based Authorization
- Content CRUD Operations
- Global Validation Pipeline
- Exception Filters
- Response Transformation
- Request Logging
- Production-ready Environment Configuration
- Swagger API Documentation

---

# Project Architecture

```bash
src/
├── auth/
├── content/
├── prisma/
├── common/
│   ├── interceptors/
│   ├── guards/
│   └── decorators/
├── filters/
├── config/
└── main.ts
```

---

# API Modules

## Authentication Module

Endpoints:

- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout
- GET /auth/profile

Features:

- JWT Authentication
- Password Hashing
- Protected Routes
- Role Guards

---

## Content Module

Endpoints:

- POST /content
- GET /content
- GET /content/:id
- PATCH /content/:id
- DELETE /content/:id

Features:

- Pagination
- Query Filtering
- DTO Validation
- Prisma Database Integration

---

# Local Development Setup

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

---

# Run Development Server

```bash
npm run start:dev
```

---

# Build Production Version

```bash
npm run build
```

---

# Run Production Server

```bash
npm run start:prod
```

---

# Database

Prisma ORM with PostgreSQL.

## Generate Prisma Client

```bash
npx prisma generate
```

## Run Migrations

```bash
npx prisma migrate dev
```

---

# API Documentation

Swagger documentation available at:

```bash
/api/docs
```

---

# Deployment

Deployed publicly on Railway with PostgreSQL cloud database integration.

---

# Author

Tosin Owolabi

Backend Engineer | Distributed Systems & Cloud Engineering
