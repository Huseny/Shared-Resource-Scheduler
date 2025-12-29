# Shared Resource Scheduling System

A robust NestJS backend system for managing shared resources such as meeting rooms, vehicles, and equipment. Built with TypeORM for database management, this system provides comprehensive scheduling capabilities with built-in conflict prevention, approval workflows, and administrative controls.

## 🎯 Overview

The Shared Resource Scheduling System addresses the common challenges organizations face when managing shared resources. It ensures efficient allocation, prevents double-booking, and provides administrative oversight for resource management.

## ✨ Key Features

### 🗓️ Time-Based Reservations
- Create reservations with specific start and end times
- Support for recurring bookings (daily, weekly, monthly)
- Buffer time configuration between bookings
- Timezone-aware scheduling

### 🚫 Overlap Prevention
- Real-time conflict detection
- Automatic validation of booking availability
- Grace period handling
- Concurrent booking prevention with optimistic locking

### ✅ Approval & Cancellation Rules
- Configurable approval workflows
- Multi-level approval chains
- Automatic approval for trusted users
- Cancellation policies with notice periods
- Cancellation fees and penalties support

### 🔒 Admin Controls
- Block time slots for maintenance
- Emergency cancellations
- Resource availability management
- Booking history and audit trails
- Resource utilization reports

## 🏗️ Architecture

Built with **NestJS** framework and **TypeORM** for robust, scalable backend development.

### Technology Stack

- **Framework**: NestJS (Node.js framework for building efficient, scalable server-side applications)
- **ORM**: TypeORM (TypeScript-based ORM for database operations)
- **Database**: PostgreSQL 12+ (primary), MySQL 8+ (supported)
- **Caching**: Redis (for session management and performance optimization)
- **Authentication**: Passport.js with JWT strategy
- **Validation**: class-validator and class-transformer
- **API Documentation**: Swagger/OpenAPI

### Core Components

- **Resource Module**: CRUD operations for resources (rooms, vehicles, equipment)
- **Booking Module**: Handles reservation creation, validation, and conflict detection
- **Approval Module**: Manages approval processes and notifications
- **User Module**: Authentication, authorization, and role-based access control (RBAC)
- **Notification Module**: Email and in-app notifications for booking events
- **Reporting Module**: Analytics and utilization reports


## 🚀 Getting Started

### Prerequisites

- Node.js 18+ LTS
- pnpm package manager
- PostgreSQL 12+

### Installation

```bash
# Clone the repository
git clone https://github.com/Huseny/Shared-Resource-Scheduler.git
cd Shared-Resource-Scheduler

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
pnpm run migration:run

# Start the development server
pnpm run start:dev
```

### Configuration

Create a `.env` file with the following variables:

```env
# Application
PORT=3000
NODE_ENV=development

# Database (TypeORM)
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=resource_scheduler
DB_SYNCHRONIZE=false
DB_LOGGING=true

# Authentication
JWT_SECRET=your_secret_key_here
JWT_EXPIRATION=24h

# Email (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_password
EMAIL_FROM=noreply@example.com

# Swagger
SWAGGER_ENABLED=true
SWAGGER_PATH=api/docs
```

## 🔐 Security

NestJS provides built-in security features and integrations:

- **JWT Authentication**: Using Passport.js JWT strategy
- **Role-Based Access Control (RBAC)**: Custom decorators and guards
- **Input Validation**: class-validator for DTO validation
- **SQL Injection Prevention**: TypeORM parameterized queries
- **Rate Limiting**: @nestjs/throttler for API rate limiting
- **CORS**: Configured in main.ts
- **Helmet**: Security headers middleware
- **HTTPS**: Enforced in production environments

## 📊 Performance

Optimizations for production-ready NestJS applications:

- **TypeORM Query Optimization**: Proper indexing and query builders
- **Redis Caching**: @nestjs/cache-manager with Redis store
- **Connection Pooling**: TypeORM connection pool configuration
- **Compression**: Using compression middleware
- **Lazy Loading**: Dynamic module imports
- **Query Pagination**: Implemented on all list endpoints
- **Response Interceptors**: For data transformation and caching
- **Database Indexes**: On frequently queried columns
- **Response Time**: SLA target < 200ms for 95th percentile

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- Code follows NestJS best practices and style guide
- All tests pass (`npm run test` and `npm run test:e2e`)
- New features include unit and e2e tests
- DTOs have proper validation decorators
- API endpoints are documented with Swagger decorators
- Documentation is updated

### Development Guidelines

```bash
# Follow NestJS CLI for generating components
nest generate module bookings
nest generate controller bookings
nest generate service bookings

# Code formatting
pnpm run format

# Linting
pnpm run lint
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Huseny** - [GitHub Profile](https://github.com/Huseny)

## 🗺️ Roadmap

- [ ] GraphQL API support (@nestjs/graphql)
- [ ] Microservices architecture with NestJS
- [ ] WebSocket support for real-time notifications
- [ ] Mobile app integration
- [ ] Calendar sync (Google Calendar, Outlook)
- [ ] Advanced analytics dashboard with Chart.js
- [ ] Resource usage predictions with ML
- [ ] Multi-language support (i18n)
- [ ] OAuth2 integration (Google, Microsoft, GitHub)
- [ ] Webhook support for third-party integrations
- [ ] Docker and Kubernetes deployment configs
- [ ] Health checks and monitoring (Prometheus metrics)