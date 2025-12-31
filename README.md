# Shared Resource Scheduling System

A robust **NestJS + PostgreSQL** backend for managing shared resources such as meeting rooms, vehicles, and equipment.
Built with **TypeORM 0.3+**, this system provides conflict-free scheduling, approval workflows, and enterprise-grade administrative controls.

---

## 🎯 Overview

The Shared Resource Scheduling System solves organizational scheduling problems by:

• Preventing double bookings
• Enforcing approval workflows
• Providing auditability & reporting
• Supporting scalable, multi-resource environments

---

## ✨ Key Features

### 🗓️ Smart Reservations

* Time-based bookings (start / end)
* Recurring reservations (daily, weekly, monthly)
* Buffer time rules
* Timezone-aware scheduling

### 🚫 Conflict Prevention

* Real-time overlap detection
* Optimistic locking
* Grace periods
* Atomic transaction booking

### ✅ Approval & Cancellation

* Configurable approval chains
* Auto-approval for trusted roles
* Cancellation windows & penalties
* Audit trails

### 🔒 Admin Controls

* Maintenance blocks
* Emergency cancellation
* Utilization analytics
* Resource availability rules

---

## 🏗️ Architecture

Built on **NestJS** and **TypeORM (DataSource API)**.

### Technology Stack

| Layer      | Tech              |
| ---------- | ----------------- |
| Framework  | NestJS            |
| ORM        | TypeORM v0.3+     |
| Database   | PostgreSQL 12+    |
| Cache      | Redis             |
| Auth       | Passport + JWT    |
| Validation | class-validator   |
| Docs       | Swagger / OpenAPI |
| Migrations | TypeORM CLI       |

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* pnpm
* PostgreSQL 12+

---

### Installation

```bash
git clone https://github.com/Huseny/Shared-Resource-Scheduler.git
cd Shared-Resource-Scheduler

pnpm install

cp .env.example .env
# edit your env file

pnpm run migration:run

pnpm run start:dev
```

---

## ⚙️ Environment Variables

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=resource_scheduler
DB_LOGGING=true

JWT_SECRET=supersecret
JWT_EXPIRATION=24h

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASSWORD=password
EMAIL_FROM=noreply@example.com

SWAGGER_ENABLED=true
SWAGGER_PATH=api/docs
```

---

## 🧬 Migrations

This project uses **TypeORM DataSource migrations**.

```bash
pnpm run migration:generate --name=create-bookings
pnpm run migration:run
pnpm run migration:revert
```

> `synchronize` is disabled in production — schema changes are handled only via migrations.

---

## 🔐 Security

* JWT Authentication
* Role-based access control (RBAC)
* SQL injection prevention via parameterized queries
* API rate limiting
* Helmet & CORS
* HTTPS enforcement in production

---

## 📊 Performance

* Redis caching
* Connection pooling
* Pagination on all list endpoints
* DB indexing
* Query builders for heavy reports
* SLA target <200ms (P95)

---

## 🧪 Development

```bash
pnpm run start:dev
pnpm run lint
pnpm run format
pnpm run test
pnpm run test:e2e
```

Generate components:

```bash
nest g module bookings
nest g controller bookings
nest g service bookings
```

---

## 🤝 Contributing

1. Fork
2. Create feature branch
3. Commit
4. Push
5. Open PR

---

## 🗺️ Roadmap

* GraphQL API
* WebSockets notifications
* Calendar integrations
* Docker & Kubernetes
* Monitoring & Prometheus
* Mobile SDK
* ML-based utilization predictions
* OAuth2 login
* Webhooks

---

## 📝 License

MIT

---

## 👥 Author

**Huseny** — [https://github.com/Huseny](https://github.com/Huseny)

---