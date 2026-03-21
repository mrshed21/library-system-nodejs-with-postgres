# 📚 Library System Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

**RESTful API with enterprise-grade security and data integrity**

[API Documentation](#-api-documentation) • [Security](#-security) • [Database](#-database-schema) • [Tech](#-technical-architecture)

</div>

---

## 🎯 Overview

This backend API powers the Advanced Library Management System, providing a robust, secure, and scalable foundation for library operations. Built with Express.js and Sequelize ORM, it handles complex business logic including book borrowing with concurrency control, JWT-based authentication, and comprehensive CRUD operations.

### Key Features

- **🔒 JWT Authentication** - Access & Refresh token strategy
- **🔐 Role-Based Access Control** - Admin & User roles
- **⚡ Concurrency Control** - Row-level locking for loan operations
- **💾 ACID Transactions** - Database integrity guaranteed
- **🛡️ Security Hardening** - Helmet, rate limiting, input validation
- **📊 Comprehensive API** - Full CRUD for all entities
- **🔄 Soft Deletes** - Paranoid mode for data recovery

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Create database
createdb library_db

# Seed database with initial data
node sql/seed.js

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_NAME=library_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_chars

# Server Configuration
PORT=3000
NODE_ENV=development

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🔐 Security Architecture

### Authentication Flow

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │ 1. Login (email, password)
       ▼
┌─────────────┐
│   API       │
└──────┬──────┘
       │ 2. Validate credentials
       ▼
┌─────────────┐
│  bcrypt     │  ← Password comparison
└──────┬──────┘
       │ 3. Generate tokens
       ▼
┌─────────────────────────┐
│ Access Token (15 min)   │
│ + Refresh Token (7 days) │
└────────────┬────────────┘
             │ 4. Return to client
             ▼
         ┌───────┐
         │ Client│
         └───────┘
```

### JWT Token Strategy

**Access Token**
- **Expiry**: 15 minutes
- **Purpose**: Short-lived authentication for API requests
- **Storage**: Memory (React state)

**Refresh Token**
- **Expiry**: 7 days
- **Purpose**: Obtain new access tokens without re-authentication
- **Storage**: Database (encrypted) & HTTP-only cookie
- **Rotation**: Old tokens invalidated on refresh

### Security Measures

| Security Feature | Implementation | Purpose |
|-----------------|----------------|---------|
| **Password Hashing** | bcrypt with salt rounds | Secure password storage |
| **Input Validation** | Zod schemas | Prevent injection attacks |
| **Rate Limiting** | Express Rate Limiter | Prevent brute-force attacks |
| **Helmet** | Security headers | XSS, clickjacking protection |
| **CORS** | Configured origins | Cross-origin security |
| **Row-Level Locking** | SELECT FOR UPDATE | Prevent race conditions |
| **Transaction Rollback** | Sequelize transactions | Data integrity |
| **Role-Based Access** | Middleware | Authorization control |

---

## 🔒 Technical Challenges & Solutions

### 1. Concurrency Control in Loan System

**Challenge:** When multiple users attempt to borrow the last available copy of a book simultaneously, race conditions can occur, allowing more users to borrow than available copies.

**Solution:** Implemented row-level locking with Sequelize transactions:

```javascript
const createLoan = async (user_id, book_copy_id) => {
  const t = await sequelize.transaction();
  try {
    // Lock the book copy row to prevent concurrent modifications
    const bookCopy = await BookCopy.findOne({
      where: { book_id: book_copy_id, status: "AVAILABLE" },
      transaction: t,
      lock: t.LOCK.UPDATE, // ← Key: SELECT FOR UPDATE
    });

    if (!bookCopy || bookCopy.status !== "AVAILABLE") {
      throw new Error("No available copy");
    }

    // Business logic checks...
    // Create loan and update status atomically
    await Loan.create({...}, { transaction: t });
    await bookCopy.update({ status: "BORROWED" }, { transaction: t });
    
    await t.commit();
    return loan;
  } catch (error) {
    await t.rollback(); // ← Rollback on any failure
    throw error;
  }
};
```

**Benefits:**
- Guarantees only one user can borrow the last copy
- Prevents double-booking scenarios
- Maintains data consistency under high concurrency

### 2. Database Integrity with Transactions

**Challenge:** Loan operations involve multiple table updates (Loans table and BookCopies table). Failures mid-operation could corrupt data.

**Solution:** ACID transactions ensure all-or-nothing operations:

```javascript
const returnLoan = async (user_id, loan_id) => {
  const t = await sequelize.transaction();
  try {
    // Calculate fines
    const overdueDays = Math.max(0, Math.ceil((now - loan.dueDate) / (1000 * 60 * 60 * 24)));
    const fine = overdueDays * DAILY_FINE;

    // Update loan status and fine
    await loan.update({
      returnDate: now,
      fine: fine,
      status: overdueDays > 0 ? "overdue" : "returned"
    }, { transaction: t });

    // Release book copy back to available
    await bookCopy.update({ status: "AVAILABLE" }, { transaction: t });

    await t.commit(); // ← Both updates succeed or none do
    return loan;
  } catch (error) {
    await t.rollback(); // ← Undo all changes on error
    throw error;
  }
};
```

**Benefits:**
- Atomic operations prevent partial updates
- Automatic rollback on errors
- Consistent database state at all times

### 3. Fine Calculation Logic

**Challenge:** Accurately calculate overdue fines based on loan duration and return date.

**Solution:**
```javascript
const LOAN_DURATION = 30; // days
const DAILY_FINE = 1; // currency unit

// Calculate overdue days
const overdueDays = Math.max(
  0,
  Math.ceil((now - loan.dueDate) / (1000 * 60 * 60 * 24))
);

const fine = overdueDays * DAILY_FINE;
```

---

## 💾 Database Schema

### Entity Relationships

```
┌─────────────────┐
│     Authors     │
└────────┬────────┘
         │ 1:N
         ▼
┌─────────────────┐       ┌─────────────────┐
│      Books      │◄──────│     Genres      │
└────────┬────────┘       └─────────────────┘
         │ 1:N            (Many-to-Many)
         ▼
┌─────────────────┐
│   BookCopies    │
└────────┬────────┘
         │ 1:N
         ▼
┌─────────────────┐       ┌─────────────────┐
│     Loans      │◄──────│     Users       │
└─────────────────┘       └─────────────────┘
                                 │
                                 │ 1:N
                                 ▼
                        ┌─────────────────┐
                        │ RefreshTokens   │
                        └─────────────────┘

┌─────────────────┐
│ FavoriteBooks  │ (Users ↔ Books)
└─────────────────┘
```

### Table Descriptions

| Table | Purpose | Key Features |
|-------|---------|--------------|
| **Users** | User accounts | `role` (admin/user), `paranoid: true` |
| **RefreshTokens** | Token management | Encrypted tokens, rotation support |
| **Authors** | Book authors | Name, bio |
| **Books** | Book catalog | Title, ISBN, publication year |
| **Genres** | Book categories | Name, description |
| **BookGenres** | Junction table | Many-to-many relationship |
| **BookCopies** | Physical copies | `status` (AVAILABLE/BORROWED), barcode |
| **Loans** | Loan records | Borrow/return dates, fines, status |
| **FavoriteBooks** | User favorites | Junction table |

### Key Model Features

**Soft Deletes (Paranoid Mode)**
```javascript
// Users model example
Users.init({
  // ... fields
}, {
  sequelize,
  paranoid: true, // ← Adds deletedAt timestamp
  timestamps: true,
});
```

**Automatic Barcode Generation**
```javascript
// BookCopy model
barcode: {
  type: DataTypes.STRING,
  unique: true,
  defaultValue: () => `BC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
```

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Access Level | Description |
|--------|----------|--------------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | User login |
| POST | `/api/auth/refresh-token` | Public | Refresh access token |
| POST | `/api/auth/logout` | User | User logout |

### Books Endpoints

| Method | Endpoint | Access Level | Description |
|--------|----------|--------------|-------------|
| GET | `/api/books` | Public | Get all books (with pagination) |
| GET | `/api/books/:id` | Public | Get book by ID |
| POST | `/api/books` | Admin | Create new book |
| PUT | `/api/books/:id` | Admin | Update book |
| DELETE | `/api/books/:id` | Admin | Delete book (soft) |

### Book Copies Endpoints

| Method | Endpoint | Access Level | Description |
|--------|----------|--------------|-------------|
| GET | `/api/books/:id/copies` | Public | Get book copies |
| POST | `/api/books/:id/copies` | Admin | Add book copy |
| PUT | `/api/copies/:id` | Admin | Update copy status |
| DELETE | `/api/copies/:id` | Admin | Delete copy (soft) |

### Loans Endpoints

| Method | Endpoint | Access Level | Description |
|--------|----------|--------------|-------------|
| GET | `/api/loans` | Admin | Get all loans |
| GET | `/api/loans/my` | User | Get my loans |
| GET | `/api/loans/:id` | Admin/User (own) | Get loan by ID |
| POST | `/api/loans/borrow` | User | Borrow a book |
| PUT | `/api/loans/:id/return` | User | Return a book |
| PUT | `/api/admin/loans/:id/return` | Admin | Force return book |

### Authors Endpoints

| Method | Endpoint | Access Level | Description |
|--------|----------|--------------|-------------|
| GET | `/api/authors` | Public | Get all authors |
| GET | `/api/authors/:id` | Public | Get author by ID |
| POST | `/api/authors` | Admin | Create author |
| PUT | `/api/authors/:id` | Admin | Update author |
| DELETE | `/api/authors/:id` | Admin | Delete author (soft) |

### Genres Endpoints

| Method | Endpoint | Access Level | Description |
|--------|----------|--------------|-------------|
| GET | `/api/genres` | Public | Get all genres |
| GET | `/api/genres/:id` | Public | Get genre by ID |
| POST | `/api/genres` | Admin | Create genre |
| PUT | `/api/genres/:id` | Admin | Update genre |
| DELETE | `/api/genres/:id` | Admin | Delete genre (soft) |

### Users Endpoints

| Method | Endpoint | Access Level | Description |
|--------|----------|--------------|-------------|
| GET | `/api/users` | Admin | Get all users |
| GET | `/api/users/:id` | Admin | Get user by ID |
| PUT | `/api/users/:id` | Admin | Update user |
| DELETE | `/api/users/:id` | Admin | Delete user (soft) |

### Favorites Endpoints

| Method | Endpoint | Access Level | Description |
|--------|----------|--------------|-------------|
| GET | `/api/favorites` | User | Get my favorites |
| POST | `/api/favorites/:bookId` | User | Add to favorites |
| DELETE | `/api/favorites/:bookId` | User | Remove from favorites |

---

## 🧩 Middleware Stack

```
Request → Helmet → CORS → Rate Limiter → JSON Parser → 
Auth Middleware → Validation Middleware → Route Handler → 
Error Handler → Response
```

### Middleware Descriptions

| Middleware | Purpose | Configuration |
|------------|---------|---------------|
| **Helmet** | Security headers | Default settings |
| **CORS** | Cross-origin requests | Frontend origin allowed |
| **Rate Limiter** | DDoS prevention | 100 req/15min |
| **express.json()** | Body parsing | 1MB limit |
| **authMiddleware** | JWT verification | Bearer token required |
| **adminonly** | Role verification | Admin role required |
| **validate** | Input validation | Zod schemas |
| **errorHandler** | Error formatting | Centralized error handling |
| **idParamValidation** | ID validation | UUID/Integer check |

---

## 🔧 Technical Architecture

### Layered Architecture

```
┌─────────────────────────────────┐
│        Routes Layer             │ ← Endpoint definitions
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│     Controllers Layer           │ ← Request/response handling
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│      Services Layer             │ ← Business logic
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│       Models Layer              │ ← Database interactions
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│      PostgreSQL DB              │ ← Data persistence
└─────────────────────────────────┘
```

### Service Layer Examples

**Loan Service** - Complex business logic:
```javascript
const createLoan = async (user_id, book_copy_id) => {
  // Transaction management
  // Concurrency control
  // Business rules enforcement
  // Fine calculations
}
```

**Auth Service** - Security operations:
```javascript
const register = async (userData) => {
  // Password hashing
  // User creation
  // Token generation
}
```

---

## 🧪 Validation with Zod

Example schema for book creation:

```javascript
const bookSchema = z.object({
  title: z.string().min(1).max(255),
  isbn: z.string().length(13),
  publicationYear: z.number().int().min(1000).max(new Date().getFullYear()),
  author_id: z.number().int().positive(),
  genres: z.array(z.number().int().positive())
});
```

All endpoints validate input using Zod schemas before processing.

---

## 📊 Error Handling

Centralized error handling with status codes:

| Status Code | Error Type | Example |
|-------------|------------|---------|
| 400 | Validation Error | Invalid input data |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate entry |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server | Unexpected error |

Error response format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors (if any)
}
```

---

## 🔄 Database Transactions

All write operations use Sequelize transactions:

```javascript
const t = await sequelize.transaction();
try {
  // Multiple operations
  await Model1.create({...}, { transaction: t });
  await Model2.update({...}, { transaction: t });
  
  await t.commit(); // All operations succeed
} catch (error) {
  await t.rollback(); // Undo all changes
  throw error;
}
```

---

## 📦 Project Structure

```
backend/
├── config/
│   └── sequelize.config.js    # Database connection
├── controllers/               # Request handlers
│   ├── auth.controller.js
│   ├── book.controller.js
│   ├── loan.controller.js
│   └── ...
├── middleware/                # Express middleware
│   ├── auth.js               # JWT verification
│   ├── validate.js           # Zod validation
│   ├── limiter.js            # Rate limiting
│   └── errorHandler.js       # Error handling
├── models/                   # Sequelize models
│   ├── Users.js
│   ├── Books.js
│   ├── Loan.js
│   └── Index.js              # Model associations
├── routes/                   # API routes
│   ├── auth.routes.js
│   ├── books.routes.js
│   └── Index.js              # Route aggregation
├── schemas/                  # Zod validation schemas
│   ├── user.schema.js
│   ├── book.schema.js
│   └── ...
├── services/                 # Business logic
│   ├── auth.service.js
│   ├── loan.service.js       # Complex loan logic
│   └── ...
├── sql/                      # Database scripts
│   ├── seed.js              # Initial data
│   └── add_books_copeis.sql
├── postman/                  # API collection
│   ├── Se library.postman_collection.json
│   └── Library-Dev.postman_environment.json
├── server.js                 # Express app
└── package.json
```

---

## 🛠️ Development

### Scripts

```bash
npm start      # Production mode
npm run dev    # Development with nodemon
```

### Testing with Postman

Import the Postman collection from `postman/` directory:
- `Se library.postman_collection.json` - API endpoints
- `Library-Dev.postman_environment.json` - Environment variables

---

## 📝 Key Business Rules

1. **Loan Duration**: Fixed 30 days from borrow date
2. **Daily Fine**: 1 unit per overdue day
3. **Max Active Loans**: 3 loans per user
4. **Borrowing Restrictions**: Cannot borrow same book twice
5. **Copy Availability**: Only AVAILABLE copies can be borrowed
6. **Admin Overrides**: Admins can return any user's loan
7. **Soft Deletes**: Deleted records marked with `deletedAt` timestamp
8. **Token Refresh**: Old refresh tokens invalidated on refresh

---

## 🎓 Learning Resources

- [Sequelize Documentation](https://sequelize.org/)
- [Express.js Guide](https://expressjs.com/)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Zod Validation](https://zod.dev/)

---

<div align="center">

**Built with enterprise-grade standards for production use**

</div>