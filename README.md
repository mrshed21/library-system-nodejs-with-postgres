# Library Management System API

A comprehensive library management system built with **Express**, **Sequelize**, and **PostgreSQL** database. This system includes user authentication, role-based access control, book management, author management, genre management, loan tracking, and more. Features a simple static frontend for demonstration purposes.

This project has evolved from a simple library API to a full-featured management system with authentication, authorization, and advanced library operations.

---

## Prerequisites

Before you start, make sure you have:

- **Node.js** installed (e.g. from [nodejs.org](https://nodejs.org)).
- **PostgreSQL** installed and running. You need a database (the app expects one named `library_v7` by default; you can create it in pgAdmin or with `createdb library_v7` in the terminal).

---

## First time setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create the database** (if it does not exist yet). In PostgreSQL, create a database named `library_v7`, or use your own name and set the `DB_NAME` environment variable (see below).

3. **Optional: configure the database**  
   The app uses these environment variables (these are the defaults):

   | Variable     | Default      |
   |-------------|--------------|
   | `DB_NAME`   | `library_v7` |
   | `DB_USER`   | `postgres`   |
   | `DB_PASSWORD` | `postgres` |
   | `DB_HOST`   | `localhost`  |
   | `DB_PORT`   | `5432`       |

   If your PostgreSQL user, password, or database name is different, set these (e.g. in a `.env` file or in your shell).

4. **Seed the database (first time only)**  
   If the tables are empty, run the seed script so the app has data. You can run the SQL in `sql/SEED_DATA.sql` in pgAdmin (or with `psql`) after the tables have been created (e.g. by starting the app once so Sequelize creates them).

5. **Start the server**
   ```bash
   npm start
   ```
   Or, to auto-restart on file changes:
   ```bash
   npm run dev
   ```

6. **Open the frontend** in your browser: [http://localhost:3000/](http://localhost:3000/)

If the server starts without errors, you should see “Database and tables created!” (or similar) in the terminal and the library page in the browser.

---

## Run (after setup)

```bash
npm start
# or
npm run dev
```

- **Frontend:** [http://localhost:3000/](http://localhost:3000/)
- **API base:** `http://localhost:3000/api` (see list below)

---

## API endpoints

### Authentication
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST   | `/api/auth/register` | Register new user | None |
| POST   | `/api/auth/login` | User login | None |
| POST   | `/api/auth/refresh` | Refresh access token | None |
| POST   | `/api/auth/logout` | User logout | None |

### Authors (Admin only for create/update/delete)
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET    | `/api/authors` | List all authors | None |
| GET    | `/api/authors/:id` | Get author by ID | None |
| POST   | `/api/authors` | Create new author | Admin |
| PUT    | `/api/authors/:id` | Update author | Admin |
| DELETE | `/api/authors/:id` | Delete author | Admin |

### Books (Admin only for create/update/delete)
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET    | `/api/books` | List all books (with author and genres) | None |
| GET    | `/api/books/:id` | Get book by ID | None |
| POST   | `/api/books` | Create new book | Admin |
| PUT    | `/api/books/:id` | Update book | Admin |
| DELETE | `/api/books/:id` | Delete book | Admin |

### Genres (Admin only for create/update/delete)
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET    | `/api/genres` | List all genres | None |
| GET    | `/api/genres/:id` | Get genre by ID | None |
| POST   | `/api/genres` | Create new genre | Admin |
| PUT    | `/api/genres/:id` | Update genre | Admin |
| DELETE | `/api/genres/:id` | Delete genre | Admin |

### Users (Admin only for get all/get by id)
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET    | `/api/users` | List all users | Admin |
| GET    | `/api/users/:id` | Get user by ID | Admin |
| PUT    | `/api/users/:id` | Update user | Owner/Admin |
| DELETE | `/api/users/:id` | Delete user | Owner/Admin |

### Loans
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET    | `/api/loans` | List all loans | Authenticated |
| POST   | `/api/loans` | Create new loan | Authenticated |
| PUT    | `/api/loans/:id` | Update loan | Authenticated |
| DELETE | `/api/loans/:id` | Delete loan | Authenticated |

### Admin Routes
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET    | `/api/admin/stats` | Get system statistics | Admin |

---

## Backend packages

These are the npm packages the backend uses (see `package.json`):

### Core Dependencies
| Package     | Purpose |
|------------|---------|
| **express** | Web framework: routes, middleware, and serving the API and the static frontend. |
| **sequelize** | ORM (Object–Relational Mapping): defines models (Authors, Books, Genres, etc.) and runs queries for you instead of writing raw SQL. |
| **pg** | PostgreSQL driver. Sequelize uses it to talk to the database. |
| **pg-hstore** | Converts data for PostgreSQL; required by Sequelize when using the `pg` dialect. |
| **cors** | Lets the API be called from another origin (e.g. a different port or `frontend_external.html`). |

### Authentication & Security
| Package     | Purpose |
|------------|---------|
| **bcryptjs** | Password hashing for secure user authentication. |
| **jsonwebtoken** | JWT (JSON Web Tokens) for access token generation and verification. |
| **helmet** | Security middleware to set various HTTP headers for protection. |
| **express-rate-limit** | Rate limiting middleware to prevent brute force attacks. |

### Validation & Environment
| Package     | Purpose |
|------------|---------|
| **zod** | Schema validation for request bodies and parameters. |
| **dotenv** | Environment variable management for configuration. |

### Development Dependencies
| Package   | Purpose |
|----------|---------|
| **nodemon** | Restarts the server when you change a file, so you don't have to stop and start it yourself. Used when you run `npm run dev`. |

### Where they are used

- **server.js** – `express`, `path`, `cors`, `helmet`; and it loads `./config/sequelize` and `./models/models`.
- **config/sequelize.js** – creates the Sequelize instance (connection to the database).
- **models/** (authors, books, genres, bookGenres, Users, RefreshToken, Loan, etc.) – use `sequelize` (e.g. `DataTypes`, `define`) and require each other. Sequelize itself uses **pg** and **pg-hstore** when talking to PostgreSQL.
- **middleware/auth.js** – uses `jsonwebtoken` for token verification.
- **services/auth.service.js** – uses `bcryptjs`, `jsonwebtoken`, and `crypto` for authentication operations.
- **controllers/** – handle HTTP requests and responses using `express`.
- **middleware/validate.js** – uses `zod` for request validation.

---

## Troubleshooting

- **“Connection refused” or “ECONNREFUSED”**  
  PostgreSQL is probably not running, or `DB_HOST` / `DB_PORT` are wrong. Start PostgreSQL and check that the host and port match your setup.

- **“database … does not exist”**  
  Create the database (e.g. `library_v7`) in PostgreSQL, or set `DB_NAME` to a database that already exists.

- **“password authentication failed”**  
  Check `DB_USER` and `DB_PASSWORD`; they must match your PostgreSQL user.

---
