# 📚 Advanced Library Management System

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

**A production-ready, full-stack library management system with advanced features**

[Features](#-core-features) • [Tech Stack](#-tech-stack) • [Architecture](#-system-architecture) • [Quick Start](#-quick-start)

</div>

---

## 🎯 Project Overview

This Advanced Library Management System is a comprehensive, full-stack web application designed to streamline library operations with enterprise-grade features. Built with modern technologies and following best practices, it serves as an excellent demonstration of full-stack development capabilities, database design, and production-ready code quality.

The system manages books, authors, genres, user authentication, book borrowing/returning with fine calculations, and provides separate dashboards for regular users and administrators. It handles complex business logic including concurrent borrowing prevention, database transaction integrity, and secure JWT-based authentication.

---

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **TanStack Query** - Powerful data fetching and state management
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web application framework
- **Sequelize** - Promise-based ORM for PostgreSQL
- **PostgreSQL** - Robust relational database
- **JWT (JSON Web Tokens)** - Secure authentication
- **Zod** - Runtime type validation
- **bcrypt** - Password hashing
- **Helmet** - Security HTTP headers
- **Express Rate Limit** - Rate limiting middleware
- **CORS** - Cross-origin resource sharing

### Database & DevOps
- **PostgreSQL** - Production-grade database
- **Sequelize Transactions** - ACID compliance for data integrity
- **Database Migrations** - Version-controlled schema changes
- **Soft Deletes** - Paranoid mode for data recovery

---

## 🏗️ System Architecture

```
library-system-nodejs-with-postgres/
├── backend/
│   ├── config/              # Database & Sequelize configuration
│   ├── controllers/         # Request handlers (Auth, Books, Loans, etc.)
│   ├── middleware/          # Auth, validation, error handling
│   ├── models/              # Sequelize models with associations
│   ├── routes/              # API route definitions
│   ├── schemas/             # Zod validation schemas
│   ├── services/            # Business logic layer
│   ├── sql/                 # Database seed scripts
│   └── postman/             # API collection & environment
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios API clients
│   │   ├── components/     # Reusable React components
│   │   ├── context/        # React Context (Auth, Theme)
│   │   ├── layouts/        # Page layouts
│   │   ├── pages/          # Page components
│   │   └── routers/        # Route configuration
│   └── public/             # Static assets
└── README.md
```

---

## ✨ Core Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| **🔐 Secure Authentication** | JWT-based auth with access & refresh tokens, password hashing | bcrypt, JWT with 15min/7day expiry |
| **📖 Book Management** | CRUD operations with authors, genres, and multiple copies | Sequelize ORM with relationships |
| **🏦 Advanced Loan System** | Borrow books with 30-day duration, automatic fine calculation | Database transactions, locks |
| **👥 User Roles** | Separate dashboards for regular users and admins | Role-based access control |
| **🔒 Concurrency Control** | Prevents race conditions when borrowing the last copy | SELECT FOR UPDATE locks |
| **💰 Fine Calculation** | Automatic daily fines for overdue books | Business logic in service layer |
| **📊 Admin Dashboard** | Full management of books, users, authors, genres, loans | Protected routes with admin middleware |
| **🎨 Responsive UI** | Mobile-first design with Tailwind CSS | Tailwind CSS 4 |
| **🔄 Real-time State** | Optimistic updates with React Query | TanStack Query caching |
| **🛡️ Security Hardening** | Helmet, rate limiting, input validation | Express security middleware |

---

## 🏃 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mrshed21/Se-library.git
   cd Se-library
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure your database credentials
   ```

   Update `.env` with your PostgreSQL configuration:
   ```env
   DB_NAME=library_db
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your_super_secret_key
   PORT=3000
   ```

3. **Set up the Database**
   ```bash
   # Create the database in PostgreSQL
   createdb library_db  -- tillexemple

   # Run the seed script to populate initial data
   node sql/seed.js
   ```

4. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Run the Application**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   Backend runs on `http://localhost:3000`

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

6. **Access the Application**
   - Open `http://localhost:5173` in your browser
   - Register a new account or log in
   - Default admin user (if seeded): Check seed script for credentials

---

## 🔑 Key Technical Highlights

### Database Integrity & Concurrency

The loan system implements **Sequelize transactions** with row-level locking (`SELECT FOR UPDATE`) to ensure data integrity when multiple users attempt to borrow the same book simultaneously. This prevents race conditions and ensures only one user can borrow the last available copy.

```javascript
const bookCopy = await BookCopy.findOne({
  where: { book_id: book_copy_id, status: "AVAILABLE" },
  transaction: t,
  lock: t.LOCK.UPDATE, // Prevents concurrent modifications
});
```

### Security Architecture

- **JWT Access Tokens**: 15-minute expiry for short-lived sessions
- **JWT Refresh Tokens**: 7-day expiry for seamless authentication
- **Password Hashing**: bcrypt with salt rounds for secure storage
- **Input Validation**: Zod schemas validate all incoming data
- **Rate Limiting**: Prevents brute-force attacks on auth endpoints
- **Helmet**: Sets secure HTTP headers
- **CORS**: Configured for frontend-backend communication

### Business Logic Highlights

- **Loan Duration**: Fixed 30-day borrowing period
- **Daily Fines**: Automatic calculation (1 unit per overdue day)
- **Max Loans**: Users limited to 3 active loans
- **Barcode Generation**: Unique identifiers for book copies
- **Soft Deletes**: Paranoid mode for data recovery
- **Ownership Checks**: Users can only manage their own loans

---

## 📖 Documentation

- [Backend Documentation](./backend/README.md) - API endpoints, database schema, security details
- [Frontend Documentation](./frontend/README.md) - UI components, state management, setup guide

---

## 🛠️ Development

### Backend Scripts
```bash
npm start      # Production mode
npm run dev    # Development with nodemon
```

### Frontend Scripts
```bash
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview production build
```

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

Built with ❤️ using modern web technologies

**For recruiters:** This project demonstrates:
- Full-stack development expertise
- Database design and optimization
- Security best practices
- API design and documentation
- State management in React
- Production-ready code quality
- Testing and validation strategies

---

<div align="center">

**⭐ If you find this project helpful, consider giving it a star!**

</div>
