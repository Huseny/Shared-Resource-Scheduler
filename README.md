# Shared Resource Scheduling System

A robust backend system for managing shared resources such as meeting rooms, vehicles, and equipment. This system provides comprehensive scheduling capabilities with built-in conflict prevention, approval workflows, and administrative controls.

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

### Core Components

- **Resource Management**: CRUD operations for resources (rooms, vehicles, equipment)
- **Booking Engine**: Handles reservation creation, validation, and conflict detection
- **Approval Workflow**: Manages approval processes and notifications
- **User Management**: Authentication, authorization, and role-based access control
- **Notification System**: Email and in-app notifications for booking events
- **Reporting Module**: Analytics and utilization reports

### Database Schema

Key entities:
- **Resources**: Physical assets available for booking
- **Bookings**: Reservation records with time slots
- **Users**: System users with roles and permissions
- **Approvals**: Approval requests and status tracking
- **BlockedSlots**: Admin-defined unavailable time periods

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ / Python 3.8+ / Java 11+ (depending on implementation)
- PostgreSQL 12+ or MySQL 8+
- Redis (for caching and session management)
- SMTP server (for email notifications)

### Installation

```bash
# Clone the repository
git clone https://github.com/Huseny/Shared-Resource-Scheduler.git
cd Shared-Resource-Scheduler

# Install dependencies
npm install  # or pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run migrate  # or python manage.py migrate

# Start the server
npm start  # or python app.py
```

### Configuration

Create a `.env` file with the following variables:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=resource_scheduler
DB_USER=your_username
DB_PASSWORD=your_password

# Server
PORT=3000
NODE_ENV=development

# Authentication
JWT_SECRET=your_secret_key
JWT_EXPIRATION=24h

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
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

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run with coverage
npm run test:coverage
```

## 🔐 Security

- JWT-based authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- SQL injection prevention
- Rate limiting on API endpoints
- HTTPS enforcement in production

## 📊 Performance

- Database query optimization with indexes
- Redis caching for frequently accessed data
- Connection pooling
- Horizontal scaling support
- Response time SLA: < 200ms for 95th percentile

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- Code follows the project style guide
- All tests pass
- New features include tests
- Documentation is updated

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

- [ ] Mobile app integration
- [ ] Calendar sync (Google Calendar, Outlook)
- [ ] Advanced analytics dashboard
- [ ] Resource usage predictions with ML
- [ ] Multi-language support
- [ ] OAuth2 integration
- [ ] Webhook support for third-party integrations