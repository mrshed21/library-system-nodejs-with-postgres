-- Dummy data for library-system-nodejs-with-postgres
-- Load this after schema is created. Safe to run on an empty DB.

BEGIN;

-- Authors
INSERT INTO public."Authors" (name, year_of_birth, "createdAt", "updatedAt") VALUES
  ('Naguib Mahfouz', 1911, NOW(), NOW()),
  ('Ghassan Kanafani', 1936, NOW(), NOW()),
  ('Hanan al-Shaykh', 1945, NOW(), NOW()),
  ('Taha Hussein', 1889, NOW(), NOW()),
  ('Ahdaf Soueif', 1950, NOW(), NOW()),
  ('Gibran Khalil Gibran', 1883, NOW(), NOW()),
  ('Yusuf Idris', 1927, NOW(), NOW()),
  ('Radwa Ashour', 1946, NOW(), NOW()),
  ('Ibrahim al-Koni', 1948, NOW(), NOW()),
  ('Sonallah Ibrahim', 1937, NOW(), NOW()),
  ('Latifa al-Zayyat', 1923, NOW(), NOW()),
  ('Hoda Barakat', 1952, NOW(), NOW());

-- Genres
INSERT INTO public."Genres" (name, "createdAt", "updatedAt") VALUES
  ('Novel', NOW(), NOW()),
  ('Short Stories', NOW(), NOW()),
  ('Historical', NOW(), NOW()),
  ('Drama', NOW(), NOW()),
  ('Mystery', NOW(), NOW()),
  ('Poetry', NOW(), NOW()),
  ('Biography', NOW(), NOW()),
  ('Philosophy', NOW(), NOW()),
  ('Politics', NOW(), NOW()),
  ('Romance', NOW(), NOW());

-- Books
INSERT INTO public."Books" (name, price, author_id, "createdAt", "updatedAt") VALUES
  ('Palace Walk', 15.99,  1, NOW(), NOW()),
  ('Men in the Sun', 9.50,  2, NOW(), NOW()),
  ('Women of Sand and Myrrh', 12.75,  3, NOW(), NOW()),
  ('The Days', 11.25,  4, NOW(), NOW()),
  ('The Map of Love', 13.40,  5, NOW(), NOW()),
  ('Palace of Desire', 16.25,  6, NOW(), NOW()),
  ('Mirage', 8.99,  7, NOW(), NOW()),
  ('The Prophet', 10.50,  8, NOW(), NOW()),
  ('Awe of the Desert', 14.10,  9, NOW(), NOW()),
  ('The Committee', 9.99,  10, NOW(), NOW()),
  ('Open Doors', 11.60,  11, NOW(), NOW()),
  ('The Stone of Laughter', 12.20,  12, NOW(), NOW()),
  ('The Trilogy: Sugar Street', 17.40,  13, NOW(), NOW()),
  ('Return to Haifa', 8.60,  14, NOW(), NOW()),
  ('Granada', 15.30,  15, NOW(), NOW()),
  ('In the Eye of the Sun', 14.90,  16, NOW(), NOW()),
  ('The Cheapest Nights', 7.80,  17, NOW(), NOW()),
  ('Season of Migration', 13.10,  18, NOW(), NOW()),
  ('Echoes of an Autobiography', 10.20,  19, NOW(), NOW()),
  ('A Balcony Over the Fakihani', 9.20,  20, NOW(), NOW());

-- Book-Genre relationships
INSERT INTO public.book_genres (book_id, genre_id) VALUES
  (1, 1),
  (1, 3),
  (2, 1),
  (2, 4),
  (2, 9),
  (3, 1),
  (3, 2),
  (3, 10),
  (4, 1),
  (4, 3),
  (4, 7),
  (5, 1),
  (5, 3),
  (5, 10),
  (6, 1),
  (6, 3),
  (7, 1),
  (7, 5),
  (8, 6),
  (8, 8),
  (9, 1),
  (9, 3),
  (10, 1),
  (10, 9),
  (11, 1),
  (11, 10),
  (12, 1),
  (12, 4),
  (13, 1),
  (13, 3),
  (14, 1),
  (14, 9),
  (15, 1),
  (15, 3),
  (16, 1),
  (16, 10),
  (17, 2),
  (18, 1),
  (18, 9),
  (19, 7),
  (19, 1),
  (20, 4),
  (20, 1);

-- Users (passwords are plain for demo; change in real use)
INSERT INTO public.users (name, email, password, role, "isActive", "createdAt", "updatedAt") VALUES
  ('Admin User', 'admin@example.com', 'admin123', 'admin', true, NOW(), NOW()),
  ('Sara Ali', 'sara.ali@example.com', 'password123', 'user', true, NOW(), NOW()),
  ('Omar Hassan', 'omar.hassan@example.com', 'password123', 'user', true, NOW(), NOW()),
  ('Mona Youssef', 'mona.youssef@example.com', 'password123', 'user', false, NOW(), NOW()),
  ('Yousef Karim', 'yousef.karim@example.com', 'password123', 'user', true, NOW(), NOW()),
  ('Nour Abdel', 'nour.abdel@example.com', 'password123', 'user', true, NOW(), NOW()),
  ('Laila Samir', 'laila.samir@example.com', 'password123', 'user', true, NOW(), NOW()),
  ('Khaled Saad', 'khaled.saad@example.com', 'password123', 'user', true, NOW(), NOW()),
  ('Huda Fawzi', 'huda.fawzi@example.com', 'password123', 'user', false, NOW(), NOW()),
  ('Rami Salem', 'rami.salem@example.com', 'password123', 'user', true, NOW(), NOW()),
  ('Heba Nasser', 'heba.nasser@example.com', 'password123', 'user', true, NOW(), NOW()),
  ('Farah Adel', 'farah.adel@example.com', 'password123', 'user', true, NOW(), NOW());

COMMIT;
