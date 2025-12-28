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

### Database Schema

TypeORM entities:
- **Resource Entity**: Physical assets available for booking
- **Booking Entity**: Reservation records with time slots
- **User Entity**: System users with roles and permissions
- **Approval Entity**: Approval requests and status tracking
- **BlockedSlot Entity**: Admin-defined unavailable time periods

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ or 18+ LTS
- npm or yarn package manager
- PostgreSQL 12+ or MySQL 8+
- Redis 6+ (for caching and session management)
- SMTP server (for email notifications)

### Installation

```bash
# Clone the repository
git clone https://github.com/Huseny/Shared-Resource-Scheduler.git
cd Shared-Resource-Scheduler

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run migration:run

# Start the development server
npm run start:dev
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

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# Swagger
SWAGGER_ENABLED=true
SWAGGER_PATH=api/docs
```

## 📡 API Endpoints

### Resources

```http
GET    /api/resources              # List all resources
GET    /api/resources/:id          # Get resource details
POST   /api/resources              # Create new resource (admin)
PUT    /api/resources/:id          # Update resource (admin)
DELETE /api/resources/:id          # Delete resource (admin)
GET    /api/resources/:id/availability  # Check availability
```

### Bookings

```http
GET    /api/bookings               # List user's bookings
GET    /api/bookings/:id           # Get booking details
POST   /api/bookings               # Create new booking
PUT    /api/bookings/:id           # Update booking
DELETE /api/bookings/:id           # Cancel booking
GET    /api/bookings/conflicts     # Check for conflicts
```

### Approvals

```http
GET    /api/approvals              # List pending approvals
POST   /api/approvals/:id/approve  # Approve booking
POST   /api/approvals/:id/reject   # Reject booking
```

### Admin

```http
POST   /api/admin/block-slot       # Block time slot
DELETE /api/admin/block-slot/:id   # Remove blocked slot
GET    /api/admin/reports          # Get utilization reports
GET    /api/admin/audit-log        # View audit trail
```

## 💻 Usage Examples

### Creating a Booking

```javascript
POST /api/bookings
Content-Type: application/json
Authorization: Bearer <token>

{
  "resourceId": "room-101",
  "startTime": "2024-01-15T09:00:00Z",
  "endTime": "2024-01-15T11:00:00Z",
  "purpose": "Team Meeting",
  "attendees": 10
}
```

### Checking Availability

```javascript
GET /api/resources/room-101/availability?date=2024-01-15

Response:
{
  "resourceId": "room-101",
  "date": "2024-01-15",
  "availableSlots": [
    { "start": "09:00", "end": "12:00" },
    { "start": "14:00", "end": "18:00" }
  ],
  "bookedSlots": [
    { "start": "12:00", "end": "14:00", "purpose": "Lunch Meeting" }
  ]
}
```

### Admin Blocking a Time Slot

```javascript
POST /api/admin/block-slot
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "resourceId": "room-101",
  "startTime": "2024-01-20T00:00:00Z",
  "endTime": "2024-01-21T00:00:00Z",
  "reason": "Maintenance - HVAC repair"
}
```

## 🧪 Testing

NestJS provides excellent testing utilities out of the box.

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov

# Watch mode for development
npm run test:watch
```

### Example Test (Jest)

```typescript
// booking.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: getRepositoryToken(Booking),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should detect booking conflicts', async () => {
    // Test implementation
  });
});
```

## 💡 NestJS Code Examples

### Entity Definition (TypeORM)

```typescript
// booking.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Resource } from '../resources/resource.entity';
import { User } from '../users/user.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Resource, resource => resource.bookings)
  resource: Resource;

  @Column()
  resourceId: string;

  @ManyToOne(() => User, user => user.bookings)
  user: User;

  @Column()
  userId: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column()
  purpose: string;

  @Column({ nullable: true })
  attendees: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### DTO (Data Transfer Object)

```typescript
// create-booking.dto.ts
import { IsString, IsDate, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  resourceId: string;

  @ApiProperty({ example: '2024-01-15T09:00:00Z' })
  @IsDate()
  @Type(() => Date)
  startTime: Date;

  @ApiProperty({ example: '2024-01-15T11:00:00Z' })
  @IsDate()
  @Type(() => Date)
  endTime: Date;

  @ApiProperty({ example: 'Team Meeting' })
  @IsString()
  purpose: string;

  @ApiProperty({ example: 10, required: false })
  @IsNumber()
  @IsOptional()
  attendees?: number;
}
```

### Controller

```typescript
// booking.controller.ts
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('bookings')
@ApiBearerAuth()
@Controller('api/bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created successfully' })
  @ApiResponse({ status: 409, description: 'Booking conflict detected' })
  async create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    return this.bookingService.create(createBookingDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings for current user' })
  async findAll(@Request() req) {
    return this.bookingService.findByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  async findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancel a booking' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.bookingService.cancel(id, req.user.id);
  }
}
```

### Service with Overlap Prevention

```typescript
// booking.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto, userId: string): Promise<Booking> {
    // Check for overlapping bookings
    const hasConflict = await this.checkConflict(
      createBookingDto.resourceId,
      createBookingDto.startTime,
      createBookingDto.endTime,
    );

    if (hasConflict) {
      throw new ConflictException('Time slot is already booked');
    }

    const booking = this.bookingRepository.create({
      ...createBookingDto,
      userId,
      status: 'pending',
    });

    return this.bookingRepository.save(booking);
  }

  async checkConflict(
    resourceId: string,
    startTime: Date,
    endTime: Date,
    excludeBookingId?: string,
  ): Promise<boolean> {
    const query = this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.resourceId = :resourceId', { resourceId })
      .andWhere('booking.status NOT IN (:...statuses)', { 
        statuses: ['cancelled', 'rejected'] 
      })
      .andWhere(
        '(booking.startTime < :endTime AND booking.endTime > :startTime)',
        { startTime, endTime }
      );

    if (excludeBookingId) {
      query.andWhere('booking.id != :excludeBookingId', { excludeBookingId });
    }

    const conflictingBooking = await query.getOne();
    return !!conflictingBooking;
  }

  async findByUser(userId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { userId },
      relations: ['resource'],
      order: { startTime: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['resource', 'user'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async cancel(id: string, userId: string): Promise<Booking> {
    const booking = await this.findOne(id);

    if (booking.userId !== userId) {
      throw new ConflictException('You can only cancel your own bookings');
    }

    booking.status = 'cancelled';
    return this.bookingRepository.save(booking);
  }
}
```

### Module Configuration

```typescript
// booking.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { Resource } from '../resources/resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Resource])],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
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

### Security Configuration Example

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(helmet());
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

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

### Performance Configuration

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
      extra: {
        max: 20, // connection pool size
        connectionTimeoutMillis: 2000,
      },
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: 300, // seconds
    }),
  ],
})
export class AppModule {}
```

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
npm run format

# Linting
npm run lint
```

## 📁 Project Structure

```
src/
├── app.module.ts              # Root module
├── main.ts                    # Application entry point
├── auth/                      # Authentication module
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   └── guards/
│       ├── jwt-auth.guard.ts
│       └── roles.guard.ts
├── users/                     # User management
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   ├── entities/
│   │   └── user.entity.ts
│   └── dto/
│       └── create-user.dto.ts
├── resources/                 # Resource management
│   ├── resources.module.ts
│   ├── resources.service.ts
│   ├── resources.controller.ts
│   └── entities/
│       └── resource.entity.ts
├── bookings/                  # Booking management
│   ├── bookings.module.ts
│   ├── bookings.service.ts
│   ├── bookings.controller.ts
│   ├── entities/
│   │   └── booking.entity.ts
│   └── dto/
│       ├── create-booking.dto.ts
│       └── update-booking.dto.ts
├── approvals/                 # Approval workflow
│   ├── approvals.module.ts
│   ├── approvals.service.ts
│   └── approvals.controller.ts
├── notifications/             # Notification system
│   ├── notifications.module.ts
│   └── notifications.service.ts
├── admin/                     # Admin operations
│   ├── admin.module.ts
│   ├── admin.service.ts
│   └── admin.controller.ts
├── common/                    # Shared utilities
│   ├── decorators/
│   ├── filters/
│   ├── interceptors/
│   └── pipes/
└── config/                    # Configuration
    └── database.config.ts

test/
├── unit/                      # Unit tests
└── e2e/                       # End-to-end tests

migrations/                    # TypeORM migrations
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Huseny** - [GitHub Profile](https://github.com/Huseny)

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this system
- Inspired by real-world resource management challenges

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: support@example.com
- Documentation: [Wiki](https://github.com/Huseny/Shared-Resource-Scheduler/wiki)

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