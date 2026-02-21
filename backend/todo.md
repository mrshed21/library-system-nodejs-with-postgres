🔐 Authentication & Security

✅ Unify login error messages (avoid user enumeration)

✅ Add JWT authentication (access token)

✅ Add auth middleware to protect routes

✅ Implement role-based access control (admin / user)

✅ Prevent returning sensitive fields (password, internal flags)

✅ Add password change endpoint

✅ Add password reset flow (future)

👤 Users Module

✅ Finalize user schemas (create / update / login)

✅ Restrict role assignment to admins only

✅ Add user activation / deactivation logic

❌ Add get users pagination & filtering

❌ Add soft delete (optional)

📚 Books / Authors / Genres

❌ Add pagination & sorting

❌ Add search (by name, author, genre)

✅ Validate foreign keys properly

✅ Add stock validation (no negative values)

✅ Add book availability logic

🛒 Library Features (Future)

✅ Borrow books

✅ Return books

✅ Track due dates

✅ Track user borrow history

✅ Add fines / penalties (optional)

✅ Purchase books (optional)

🧪 Testing & Quality

✅ Add unit tests

✅ Add integration tests for auth & users

✅ Test edge cases (invalid input, empty data)

✅ Add seed scripts for dummy data

⚙️ Performance & Structure

✅ Centralize error handling

❌ Improve logging (winston / pino)

✅ Optimize queries (attributes, includes)

✅ Review folder structure

📄 Documentation & Dev Experience

✅ Add API documentation (Postman / Swagger)

✅ Add README setup instructions

✅ Document environment variables

❌ Add example requests & responses

🚀 Production Readiness

✅ Environment-based configs

✅ Enable CORS properly

✅ Add rate limiting

✅ Secure headers

❌ Prepare for deployment (Docker optional)