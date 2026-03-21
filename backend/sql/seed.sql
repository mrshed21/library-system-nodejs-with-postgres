-- Library System Database Seed Script
-- This script creates the database schema and inserts sample data for testing

-- Create ENUM types
CREATE TYPE "enum_book_copies_status" AS ENUM ('AVAILABLE', 'BORROWED', 'DAMAGED', 'LOST');
CREATE TYPE "enum_loans_status" AS ENUM ('borrowed', 'returned', 'overdue');

-- Create Authors table
CREATE TABLE IF NOT EXISTS "Authors" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year_of_birth INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deletedAt" TIMESTAMP WITH TIME ZONE
);

-- Create Genres table
CREATE TABLE IF NOT EXISTS "Genres" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deletedAt" TIMESTAMP WITH TIME ZONE
);

-- Create Books table
CREATE TABLE IF NOT EXISTS "Books" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    author_id INTEGER NOT NULL REFERENCES "Authors"(id) ON DELETE CASCADE,
    isbn VARCHAR(255) NOT NULL UNIQUE,
    publication_year SMALLINT NOT NULL,
    language VARCHAR(50) NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    pages INTEGER NOT NULL,
    cover_image_url VARCHAR(255),
    edition VARCHAR(255),
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deletedAt" TIMESTAMP WITH TIME ZONE
);

-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deletedAt" TIMESTAMP WITH TIME ZONE
);

-- Create BookCopies table
CREATE TABLE IF NOT EXISTS book_copies (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL REFERENCES "Books"(id) ON DELETE CASCADE,
    status "enum_book_copies_status" NOT NULL DEFAULT 'AVAILABLE',
    "shelfLocation" VARCHAR(255),
    notes TEXT,
    barcode VARCHAR(255) NOT NULL UNIQUE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deletedAt" TIMESTAMP WITH TIME ZONE
);

-- Create Loans table
CREATE TABLE IF NOT EXISTS loans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_copy_id INTEGER NOT NULL REFERENCES book_copies(id) ON DELETE CASCADE,
    status "enum_loans_status" NOT NULL DEFAULT 'borrowed',
    "borrowDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "dueDate" TIMESTAMP WITH TIME ZONE NOT NULL,
    "returnDate" TIMESTAMP WITH TIME ZONE,
    fine DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deletedAt" TIMESTAMP WITH TIME ZONE
);

-- Create FavoriteBooks table
CREATE TABLE IF NOT EXISTS "FavoriteBooks" (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id INTEGER NOT NULL REFERENCES "Books"(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY (user_id, book_id)
);

-- Create BookGenres junction table
CREATE TABLE IF NOT EXISTS book_genres (
    book_id INTEGER NOT NULL REFERENCES "Books"(id) ON DELETE CASCADE,
    genre_id INTEGER NOT NULL REFERENCES "Genres"(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, genre_id)
);

-- Create RefreshTokens table
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Insert Authors data
INSERT INTO "Authors" (id, name, year_of_birth, "createdAt", "updatedAt", "deletedAt") VALUES
(1, 'Author Name 1', 1950, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(2, 'Author Name 2', 1951, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(3, 'Author Name 3', 1952, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(4, 'Author Name 4', 1953, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(5, 'Author Name 5', 1954, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(6, 'Author Name 6', 1955, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(7, 'Author Name 7', 1956, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(8, 'Author Name 8', 1957, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(9, 'Author Name 9', 1958, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(10, 'Author Name 10', 1959, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(11, 'Author Name 11', 1960, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(12, 'Author Name 12', 1961, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(13, 'Author Name 13', 1962, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(14, 'Author Name 14', 1963, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(15, 'Author Name 15', 1964, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(16, 'Author Name 16', 1965, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(17, 'Author Name 17', 1966, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(18, 'Author Name 18', 1967, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(19, 'Author Name 19', 1968, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(20, 'Author Name 20', 1969, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(21, 'Author Name 21', 1970, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(22, 'Author Name 22', 1971, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(23, 'Author Name 23', 1972, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(24, 'Author Name 24', 1973, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(25, 'Author Name 25', 1974, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(26, 'Author Name 26', 1975, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(27, 'Author Name 27', 1976, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(28, 'Author Name 28', 1977, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(29, 'Author Name 29', 1978, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(30, 'Author Name 30', 1979, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(31, 'Author Name 31', 1980, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(32, 'Author Name 32', 1981, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(33, 'Author Name 33', 1982, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(34, 'Author Name 34', 1983, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(35, 'Author Name 35', 1984, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(36, 'Author Name 36', 1985, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(37, 'Author Name 37', 1986, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(38, 'Author Name 38', 1987, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(39, 'Author Name 39', 1988, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(40, 'Author Name 40', 1989, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(41, 'Author Name 41', 1990, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(42, 'Author Name 42', 1991, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(43, 'Author Name 43', 1992, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(44, 'Author Name 44', 1993, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(45, 'Author Name 45', 1994, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(46, 'Author Name 46', 1995, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(47, 'Author Name 47', 1996, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(48, 'Author Name 48', 1997, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(49, 'Author Name 49', 1998, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(50, 'Author Name 50', 1999, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(51, 'Author Name 51', 1950, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(52, 'Author Name 52', 1951, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(53, 'Author Name 53', 1952, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(54, 'Author Name 54', 1953, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(55, 'Author Name 55', 1954, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(56, 'Author Name 56', 1955, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(57, 'Author Name 57', 1956, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(58, 'Author Name 58', 1957, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(59, 'Author Name 59', 1958, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(60, 'Author Name 60', 1959, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(61, 'Author Name 61', 1960, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(62, 'Author Name 62', 1961, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(63, 'Author Name 63', 1962, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(64, 'Author Name 64', 1963, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(65, 'Author Name 65', 1964, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(66, 'Author Name 66', 1965, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(67, 'Author Name 67', 1966, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(68, 'Author Name 68', 1967, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(69, 'Author Name 69', 1968, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(70, 'Author Name 70', 1969, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(71, 'Author Name 71', 1970, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(72, 'Author Name 72', 1971, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(73, 'Author Name 73', 1972, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(74, 'Author Name 74', 1973, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(75, 'Author Name 75', 1974, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(76, 'Author Name 76', 1975, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(77, 'Author Name 77', 1976, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(78, 'Author Name 78', 1977, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(79, 'Author Name 79', 1978, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(80, 'Author Name 80', 1979, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(81, 'Author Name 81', 1980, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(82, 'Author Name 82', 1981, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(83, 'Author Name 83', 1982, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(84, 'Author Name 84', 1983, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(85, 'Author Name 85', 1984, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(86, 'Author Name 86', 1985, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(87, 'Author Name 87', 1986, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(88, 'Author Name 88', 1987, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(89, 'Author Name 89', 1988, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(90, 'Author Name 90', 1989, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(91, 'Author Name 91', 1990, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(92, 'Author Name 92', 1991, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(93, 'Author Name 93', 1992, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(94, 'Author Name 94', 1993, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(95, 'Author Name 95', 1994, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(96, 'Author Name 96', 1995, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(97, 'Author Name 97', 1996, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(98, 'Author Name 98', 1997, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(99, 'Author Name 99', 1998, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(100, 'Author Name 100', 1999, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL),
(101, 'Author Name 101', 1950, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00', NULL);

-- Insert Genres data
INSERT INTO "Genres" (id, name, "createdAt", "updatedAt", "deletedAt") VALUES
(1, 'test2', '2026-03-14 21:42:41.871+00', '2026-03-14 21:42:41.871+00', NULL),
(2, 'action', '2026-03-21 10:32:44.663+00', '2026-03-21 10:32:44.663+00', NULL),
(13, 'Science Fiction', '2026-03-21 10:46:12.822309+00', '2026-03-21 10:46:12.822309+00', NULL),
(14, 'Fantasy', '2026-03-21 10:46:12.822309+00', '2026-03-21 10:46:12.822309+00', NULL),
(15, 'Mystery', '2026-03-21 10:46:12.822309+00', '2026-03-21 10:46:12.822309+00', NULL),
(16, 'Biography', '2026-03-21 10:46:12.822309+00', '2026-03-21 10:46:12.822309+00', NULL),
(17, 'History', '2026-03-21 10:46:12.822309+00', '2026-03-21 10:46:12.822309+00', NULL),
(18, 'Technology', '2026-03-21 10:46:12.822309+00', '2026-03-21 10:46:12.822309+00', NULL),
(19, 'Classic', '2026-03-21 10:46:12.822309+00', '2026-03-21 10:46:12.822309+00', NULL),
(20, 'Romance', '2026-03-21 10:46:12.822309+00', '2026-03-21 10:46:12.822309+00', NULL),
(21, 'Self-Help', '2026-03-21 10:46:12.822309+00', '2026-03-21 10:46:12.822309+00', NULL),
(22, 'Thriller', '2026-03-21 10:46:12.822309+00', '2026-03-21 10:46:12.822309+00', NULL);

-- Insert sample Books data (first 10 books for brevity)
INSERT INTO "Books" (id, title, description, price, author_id, isbn, publication_year, language, publisher, pages, cover_image_url, edition, "createdAt", "updatedAt", "deletedAt") VALUES
(1, 'new test with new filter 2', NULL, 22.00, 1, 'sdf', 1990, 'english', 'sdfdsf', 300, 'södlfölsdfsdf', 'öalksdjf', '2026-03-14 21:46:05.462+00', '2026-03-14 21:46:05.462+00', NULL),
(3, 'test2', 'sdfjsd', 22.00, 1, 'aass', 1990, 'english', 'sdfdsf', 300, 'södlfölsdfsdf', 'öalksdjf', '2026-03-14 23:37:50.16+00', '2026-03-14 23:37:50.16+00', NULL),
(4, 'Test', NULL, 10.00, 1, '1234', 2020, 'En', 'Pub', 100, NULL, NULL, '2026-03-15 14:21:14.187+00', '2026-03-15 14:21:14.187+00', NULL),
(6, 'test4', 'sdfjsd', 22.00, 1, 'aasdfasss', 1990, 'english', 'sdfdsf', 300, 'södlfölsdfsdf', 'öalksdjf', '2026-03-15 14:42:36.98+00', '2026-03-15 14:42:36.98+00', NULL),
(7, 'sdf', '', 12312.00, 1, 'dsfadsf', 23, 'english', 'sldkfj', 234, NULL, NULL, '2026-03-15 14:52:07.812+00', '2026-03-15 14:52:07.812+00', NULL),
(8, 'dfsgdfghf', '', 234.00, 1, 'sdfsdafdsf', 3423, 'english', 'sdfdsf', 234, NULL, NULL, '2026-03-15 19:15:11.38+00', '2026-03-15 19:15:11.38+00', NULL),
(9, 'asdf', '', 234.00, 1, 'sdfasdf', 32, 'english', 'sldkfj', 234, NULL, NULL, '2026-03-21 10:33:05.455+00', '2026-03-21 10:33:05.455+00', NULL),
(110, 'The Great Book Volume 1', 'Detailed description for book number 1. This is a sample text to test large text fields.', 23.38, 52, 'ISBN-1001-8723', 2001, 'Arabic', 'Global Publishing House', 105, NULL, NULL, '2026-03-21 10:46:37.120453+00', '2026-03-21 10:46:37.120453+00', NULL),
(111, 'The Great Book Volume 2', 'Detailed description for book number 2. This is a sample text to test large text fields.', 59.02, 99, 'ISBN-1002-8838', 2002, 'English', 'Global Publishing House', 110, NULL, NULL, '2026-03-21 10:46:37.120453+00', '2026-03-21 10:46:37.120453+00', NULL),
(112, 'The Great Book Volume 3', 'Detailed description for book number 3. This is a sample text to test large text fields.', 18.71, 1, 'ISBN-1003-3174', 2003, 'Arabic', 'Global Publishing House', 115, NULL, NULL, '2026-03-21 10:46:37.120453+00', '2026-03-21 10:46:37.120453+00', NULL);

-- Insert Users data
INSERT INTO users (id, name, email, password, role, "isActive", "createdAt", "updatedAt", "deletedAt") VALUES
(1, 'user updated', 'user@user.com', '$2b$10$yr7MUngzeOT2f7a7Oj1bRu3rhs1uWEoSSINCgRmp6E0EFJhDLZ2Wi', 'admin', true, '2026-03-14 21:35:25.776+00', '2026-03-16 09:23:43.053+00', NULL),
(2, 'Admin User', 'admin2@gmail.com', '$2b$10$yPd2LmwAYgdmKMmiTrx8DOaxRTKKJqCe1mx2YgQrTx/zDOl6IAwFK', 'admin', true, '2026-03-15 14:56:48.119+00', '2026-03-15 15:01:55.1+00', NULL),
(4, 'user', 'user1@user.com', '$2b$10$G4pPaAPpURyyZkqpsRwOLukPOODW6Mnea5Hut6Qh/ssrW2YUcyOoi', 'user', true, '2026-03-15 19:01:09.798+00', '2026-03-15 19:01:09.798+00', NULL),
(7, 'Admin User', 'admin@library.com', '$2a$10$76kYFpxvI.R.4N1JEq9vOuYv3I.G.S.vY0yUq6P.9A5CqB8yH9G6G', 'admin', true, '2026-03-21 10:46:23.38471+00', '2026-03-21 10:46:23.38471+00', NULL),
(8, 'Test User', 'user@library.com', '$2a$10$76kYFpxvI.R.4N1JEq9vOuYv3I.G.S.vY0yUq6P.9A5CqB8yH9G6G', 'user', true, '2026-03-21 10:46:23.38471+00', '2026-03-21 10:46:23.38471+00', NULL);

-- Insert sample BookCopies data (first 10 copies for brevity)
INSERT INTO book_copies (id, book_id, status, "shelfLocation", notes, barcode, "createdAt", "updatedAt", "deletedAt") VALUES
(1, 1, 'AVAILABLE', 'LOC001', NULL, 'LIB-1-001', '2026-03-14 22:01:30.848+00', '2026-03-15 15:13:02.369+00', NULL),
(2, 1, 'AVAILABLE', 'LOC003', NULL, 'LIB-1-002', '2026-03-15 00:08:00.665+00', '2026-03-16 09:23:27.978+00', NULL),
(5, 3, 'BORROWED', 'LOC003', NULL, 'LIB-3-001', '2026-03-15 00:11:28.498+00', '2026-03-16 09:52:22.633+00', NULL),
(6, 1, 'BORROWED', NULL, NULL, 'LIB-1-003', '2026-03-15 15:00:53.786+00', '2026-03-17 11:10:56.431+00', NULL),
(7, 4, 'AVAILABLE', NULL, NULL, 'LIB-4-001', '2026-03-15 15:00:58.884+00', '2026-03-16 09:23:25.85+00', NULL),
(12, 3, 'AVAILABLE', 'Shelf-3C', NULL, 'LIB-3-002', '2026-03-21 10:48:46.777608+00', '2026-03-21 10:48:46.777608+00', NULL),
(13, 3, 'AVAILABLE', 'Shelf-3D', NULL, 'LIB-3-003', '2026-03-21 10:48:46.777608+00', '2026-03-21 10:48:46.777608+00', NULL),
(15, 4, 'AVAILABLE', 'Shelf-4C', NULL, 'LIB-4-002', '2026-03-21 10:48:46.777608+00', '2026-03-21 10:48:46.777608+00', NULL),
(16, 4, 'AVAILABLE', 'Shelf-4D', NULL, 'LIB-4-003', '2026-03-21 10:48:46.777608+00', '2026-03-21 10:48:46.777608+00', NULL),
(17, 6, 'AVAILABLE', 'Shelf-6B', NULL, 'LIB-6-001', '2026-03-21 10:48:46.777608+00', '2026-03-21 10:48:46.777608+00', NULL);

-- Insert sample Loans data
INSERT INTO loans (id, user_id, book_copy_id, status, "borrowDate", "dueDate", "returnDate", fine, "createdAt", "updatedAt", "deletedAt") VALUES
(1, 1, 1, 'returned', '2026-03-14 23:47:21.877+00', '2026-04-13 22:47:21.877+00', '2026-03-14 23:47:42.102+00', 0.00, '2026-03-14 23:47:21.883+00', '2026-03-14 23:47:42.103+00', NULL),
(2, 1, 1, 'returned', '2026-03-14 23:59:42.733+00', '2026-04-13 22:59:42.733+00', '2026-03-15 00:05:41.739+00', 0.00, '2026-03-14 23:59:42.735+00', '2026-03-15 00:05:41.739+00', NULL),
(3, 1, 1, 'returned', '2026-03-15 00:05:47.667+00', '2026-04-13 23:05:47.667+00', '2026-03-15 00:06:14.683+00', 0.00, '2026-03-15 00:05:47.667+00', '2026-03-15 00:06:14.683+00', NULL),
(4, 1, 1, 'returned', '2026-03-15 00:11:33.644+00', '2026-04-13 23:11:33.644+00', '2026-03-15 15:13:02.351+00', 0.00, '2026-03-15 00:11:33.644+00', '2026-03-15 15:13:02.353+00', NULL),
(5, 1, 5, 'returned', '2026-03-15 00:15:04.033+00', '2026-04-13 23:15:04.033+00', '2026-03-15 15:13:05.153+00', 0.00, '2026-03-15 00:15:04.034+00', '2026-03-15 15:13:05.153+00', NULL),
(6, 1, 7, 'returned', '2026-03-15 15:11:00.428+00', '2026-04-14 14:11:00.428+00', '2026-03-15 15:13:06.944+00', 0.00, '2026-03-15 15:11:00.431+00', '2026-03-15 15:13:06.944+00', NULL),
(7, 1, 5, 'returned', '2026-03-15 20:18:12.522+00', '2026-04-14 19:18:12.522+00', '2026-03-16 09:23:29.603+00', 0.00, '2026-03-15 20:18:12.528+00', '2026-03-16 09:23:29.603+00', NULL),
(8, 1, 2, 'returned', '2026-03-15 20:18:19.378+00', '2026-04-14 19:18:19.378+00', '2026-03-16 09:23:27.963+00', 0.00, '2026-03-15 20:18:19.378+00', '2026-03-16 09:23:27.963+00', NULL),
(9, 1, 7, 'returned', '2026-03-15 20:18:27.061+00', '2026-04-14 19:18:27.061+00', '2026-03-16 09:23:25.7+00', 0.00, '2026-03-15 20:18:27.061+00', '2026-03-16 09:23:25.701+00', NULL),
(10, 1, 5, 'borrowed', '2026-03-16 09:52:22.61+00', '2026-04-15 08:52:22.61+00', NULL, 0.00, '2026-03-16 09:52:22.611+00', '2026-03-16 09:52:22.611+00', NULL),
(11, 1, 6, 'borrowed', '2026-03-17 11:10:56.425+00', '2026-04-16 10:10:56.425+00', NULL, 0.00, '2026-03-17 11:10:56.425+00', '2026-03-17 11:10:56.425+00', NULL);

-- Insert sample BookGenres data (first 20 relations for brevity)
INSERT INTO book_genres (book_id, genre_id) VALUES
(1, 1), (3, 1), (4, 1), (6, 1), (7, 1), (8, 1), (9, 1), (9, 2), (1, 22), (3, 2),
(4, 14), (6, 19), (7, 2), (8, 15), (9, 19), (110, 14), (111, 2), (111, 13);

-- Insert sample FavoriteBooks data
INSERT INTO "FavoriteBooks" (user_id, book_id, "createdAt", "updatedAt") VALUES
(1, 1, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00'),
(1, 3, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00'),
(4, 4, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00');

-- Insert sample RefreshTokens data
INSERT INTO refresh_tokens (id, token, "expiresAt", user_id, "createdAt", "updatedAt") VALUES
(1, 'sample_token_1', '2026-04-21 10:46:18.21673+00', 1, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00'),
(2, 'sample_token_2', '2026-04-21 10:46:18.21673+00', 2, '2026-03-21 10:46:18.21673+00', '2026-03-21 10:46:18.21673+00');

-- Set sequence values
SELECT setval('"Authors_id_seq"', 101, true);
SELECT setval('"Books_id_seq"', 209, true);
SELECT setval('"Genres_id_seq"', 22, true);
SELECT setval('book_copies_id_seq', 328, true);
SELECT setval('loans_id_seq', 11, true);
SELECT setval('refresh_tokens_id_seq', 24, true);
SELECT setval('users_id_seq', 8, true);
