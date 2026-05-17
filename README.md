# 🚀 Content Ops Tool Backend

Production-grade backend API built with NestJS, TypeScript, Prisma ORM, PostgreSQL, and JWT authentication.

Designed with scalable backend architecture, modular system design, authentication flows, and production-ready deployment practices.

---

## 🌐 Live API

👉 https://scintillating-bravery-production.up.railway.app/

---

## 📚 Swagger Documentation

Interactive Swagger/OpenAPI documentation for testing and exploring backend endpoints.

👉 https://scintillating-bravery-production.up.railway.app/api/docs

### Swagger Preview

![Swagger Documentation](./screenshots/swagger-auth.png)

### API Features

* JWT Access & Refresh Token Authentication
* DTO Validation
* Role-Based Authorization
* Protected Routes & Guards
* Standardized API Responses
* Request Validation Pipelines
* Modular Route Structure
* OpenAPI Documentation

---

## ⚡ Engineering Highlights

* Modular NestJS backend architecture
* PostgreSQL + Prisma ORM integration
* JWT authentication & refresh token flow
* Role-based authorization
* DTO validation pipelines
* Global exception filters
* Response transformation interceptors
* Request logging middleware
* Environment-based configuration
* Swagger/OpenAPI integration
* Railway production deployment

---

## 🛠 Tech Stack

### Backend Engineering

* NestJS
* Node.js
* TypeScript

### Database & ORM

* PostgreSQL
* Prisma ORM

### Authentication & Security

* JWT Authentication
* Role Guards
* Protected Routes
* Password Hashing

### API & Architecture

* REST API Architecture
* Swagger/OpenAPI
* DTO Validation
* Exception Filters
* Interceptors

### Deployment

* Railway
* Environment Configuration

---

## 🏗 System Architecture

```text
Client Application
        ↓
NestJS REST API
        ↓
Authentication Layer
Content Module
Validation Layer
Business Logic Layer
        ↓
Prisma ORM
        ↓
PostgreSQL Database
```

### Project Structure

```text
src
├── auth
├── content
├── prisma
├── common
│   ├── decorators
│   ├── guards
│   ├── interceptors
│   └── pipes
├── filters
├── config
└── main.ts
```

The application follows a modular backend architecture with separation of concerns between controllers, services, DTO validation, authentication, and database access layers.

---

## 🔐 Authentication Module

### Endpoints

| Method | Endpoint         | Description                           |
| ------ | ---------------- | ------------------------------------- |
| POST   | `/auth/register` | Register a new user                   |
| POST   | `/auth/login`    | Authenticate user and generate tokens |
| POST   | `/auth/refresh`  | Generate new access token             |
| POST   | `/auth/logout`   | Logout authenticated user             |
| GET    | `/auth/profile`  | Access authenticated user profile     |
| GET    | `/auth/admin`    | Protected admin-only route            |

### Authentication Features

* JWT Access Token Authentication
* Refresh Token Flow
* Password Hashing
* Role Guards
* Protected Routes
* Authorization Middleware

---

## 📦 Content Module

### Endpoints

| Method | Endpoint       |
| ------ | -------------- |
| POST   | `/content`     |
| GET    | `/content`     |
| GET    | `/content/:id` |
| PATCH  | `/content/:id` |
| DELETE | `/content/:id` |

### Features

* CRUD Operations
* Pagination
* Query Filtering
* DTO Validation
* Prisma Database Integration
* Structured Service Layer

---

## 🔄 Request Lifecycle

```text
Incoming Request
        ↓
Controller Layer
        ↓
DTO Validation Pipeline
        ↓
Authentication & Guards
        ↓
Service Layer
        ↓
Prisma ORM
        ↓
PostgreSQL Database
        ↓
Response Transformation
        ↓
Client Response
```

---

## 🚀 Deployment Architecture

```text
Frontend Client
        ↓
Railway Hosted NestJS API
        ↓
Prisma ORM
        ↓
PostgreSQL Cloud Database
```

### Production Deployment Features

* Railway cloud hosting
* PostgreSQL cloud database
* Environment-based configuration
* Production-ready API structure
* Swagger/OpenAPI documentation
* Secure JWT authentication flow

---

## ⚙ Local Development Setup

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

### Run Development Server

```bash
npm run start:dev
```

### Build Production Version

```bash
npm run build
```

### Run Production Server

```bash
npm run start:prod
```

---

## 🗄 Database

The application uses Prisma ORM with PostgreSQL for type-safe database access and schema management.

### Generate Prisma Client

```bash
npx prisma generate
```

### Run Database Migrations

```bash
npx prisma migrate dev
```

---

## 📈 Planned Improvements

* Redis caching layer
* CI/CD pipeline integration
* API rate limiting
* Structured application logging
* Background job queues
* Observability & monitoring
* Docker container optimization
* Event-driven architecture exploration

---

## 👨‍💻 Author

Tosin Owolabi

Backend Engineer | Node.js, TypeScript & Cloud Systems

Open to backend engineering opportunities, remote collaboration, and international relocation opportunities.
