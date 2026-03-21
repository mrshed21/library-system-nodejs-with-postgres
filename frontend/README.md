# 📚 Library System Frontend

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)

**Modern, responsive UI with powerful state management**

[Features](#-features) • [Architecture](#-architecture) • [State Management](#-state-management) • [Setup](#-installation)

</div>

---

## 🎯 Overview

The frontend application provides a user-friendly interface for the Advanced Library Management System. Built with React 19 and modern web technologies, it delivers an exceptional user experience with real-time data fetching, responsive design, and seamless navigation.

### Key Features

- **🎨 Modern UI/UX** - Clean, intuitive interface with Tailwind CSS 4
- **⚡ Real-time Updates** - Optimistic updates with TanStack Query
- **🔐 Protected Routes** - Role-based access control (Admin/User)
- **📱 Responsive Design** - Mobile-first approach, works on all devices
- **🔍 Dynamic Search & Pagination** - Efficient book browsing
- **👤 User Dashboard** - Personalized loan management and profile
- **🛡️ Authentication Context** - Global auth state management
- **🎭 Theme Support** - Dark/light mode switching
- **⚛️ React 19** - Latest React features and performance
- **🚀 Vite** - Lightning-fast development and builds

---

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on port 3000 (or configured port)

### Setup Instructions

```bash
# Clone the repository (if not already done)
cd library-system-nodejs-with-postgres/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Configuration

Create a `.env` file in the frontend root directory:

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:3000/api

# Optional: Override default port
# VITE_PORT=5173
```

### Running the Application

1. **Development Mode:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

2. **Production Build:**
   ```bash
   npm run build
   ```
   The optimized build will be in the `dist/` directory

---

## 🎨 UI/UX Features

### Design Principles

| Feature | Implementation | Benefit |
|---------|---------------|---------|
| **Mobile-First** | Tailwind responsive utilities | Optimal experience on all devices |
| **Consistent Theming** | Tailwind CSS with custom colors | Brand consistency |
| **Dark Mode** | ThemeContext with CSS variables | User preference support |
| **Loading States** | Skeleton loaders, spinners | Perceived performance |
| **Error Handling** | User-friendly error messages | Better UX |
| **Smooth Transitions** | CSS animations | Polished feel |
| **Accessible UI** - Semantic HTML, ARIA labels | Inclusive design |

### Responsive Breakpoints

```javascript
// Tailwind CSS default breakpoints
sm: 640px   // Small tablets
md: 768px   // Tablets
lg: 1024px  // Laptops
xl: 1280px  // Desktops
2xl: 1536px // Large screens
```

### Component Library

**Reusable Components:**
- `BookCard` - Book display with cover, title, author
- `BookCardSmall` - Compact book preview
- `Navbar` - Navigation with auth state
- `Footer` - Site information
- `Layout Components` - MainLayout for consistent structure

**Page Components:**
- `Home` - Landing page with featured books
- `Books` - Book catalog with search & pagination
- `BookDetails` - Detailed book information
- `Login` / `Register` - Authentication forms
- `Profile` - User profile and loan management
- `Dashboard` - Admin management interface

---

## 🧩 State Management

### 1. Authentication State (Context API)

The `AuthContext` provides global authentication state:

```javascript
const AuthContext = createContext();

// Provides:
{
  user: { id, name, email, role },  // Current user
  login: (email, password) => {},   // Login function
  logout: () => {},                 // Logout function
  loading: boolean                  // Auth check status
}
```

**Usage:**
```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, login, logout } = useAuth();
  
  if (!user) return <PleaseLogin />;
  return <Welcome user={user} />;
}
```

### 2. Server State (TanStack Query)

TanStack Query manages API data fetching, caching, and synchronization:

**Benefits:**
- Automatic caching and refetching
- Optimistic updates
- Loading and error states
- Pagination support
- Offline mode capabilities

**Example - Fetching Books:**
```javascript
import { useQuery } from '@tanstack/react-query';
import { booksApi } from '../api/books';

function BooksList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['books', page, search],
    queryFn: () => booksApi.getAll({ page, search })
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  
  return <BooksGrid books={data} />;
}
```

**Example - Optimistic Update:**
```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query';

function BorrowBookButton({ bookId }) {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: () => loansApi.borrow(bookId),
    onMutate: async () => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries(['loans']);
      
      // Snapshot previous value
      const previousLoans = queryClient.getQueryData(['loans']);
      
      // Optimistically update
      queryClient.setQueryData(['loans'], old => [...old, newLoan]);
      
      return { previousLoans };
    },
    onError: (err, newTodo, context) => {
      // Rollback on error
      queryClient.setQueryData(['loans'], context.previousLoans);
    },
    onSettled: () => {
      // Refetch after success/error
      queryClient.invalidateQueries(['loans']);
    },
  });
  
  return <button onClick={() => mutation.mutate()}>Borrow</button>;
}
```

### 3. Local State (useState/useReducer)

Component-level state for UI interactions:
- Form inputs
- Modals
- Toggles
- Local selections

---

## 🛣️ Routing & Navigation

### Route Structure

```javascript
<Routes>
  {/* Public Routes */}
  <Route path="/" element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/books" element={<Books />} />
    <Route path="/books/:id" element={<BookDetails />} />
    
    {/* Auth Routes - Redirect if logged in */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    
    {/* Protected Routes - Require authentication */}
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
  </Route>
  
  {/* Admin Dashboard - Require admin role */}
  <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>}>
    <Route index element={<DashboardOverview />} />
    <Route path="books" element={<BooksAdmin />} />
    <Route path="users" element={<UsersAdmin />} />
    <Route path="copies" element={<BookCopiesAdmin />} />
    <Route path="loans" element={<LoansAdmin />} />
    <Route path="genres" element={<GenresAdmin />} />
    <Route path="authors" element={<AuthorsAdmin />} />
  </Route>
  
  {/* 404 Page */}
  <Route path="*" element={<PageNotFound />} />
</Routes>
```

### Protected Routes

**User Route:**
```javascript
<Route 
  path="/profile" 
  element={user ? <Profile /> : <Navigate to="/login" />} 
/>
```

**Admin Route:**
```javascript
<Route 
  path="/dashboard" 
  element={user?.role === 'admin' ? <Dashboard /> : <Navigate to="/login" />} 
/>
```

### Navigation Components

**Navbar:**
- Logo and branding
- Navigation links
- User menu (when logged in)
- Login/Logout buttons
- Mobile hamburger menu

**Footer:**
- Copyright information
- Contact links
- Social media icons

---

## 📡 API Integration

### Axios Configuration

Centralized API client in `src/api/axios.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### API Modules

Organized API modules in `src/api/`:

| Module | Purpose | Endpoints |
|--------|---------|-----------|
| `auth.js` | Authentication | login, register, logout, refreshToken |
| `books.js` | Book operations | getAll, getById, create, update, delete |
| `authors.js` | Author management | getAll, getById, create, update |
| `genres.js` | Genre management | getAll, getById, create, update |
| `loans.js` | Loan operations | borrow, return, getMyLoans |
| `favorites.js` | User favorites | getAll, add, remove |
| `users.js` | User operations | getProfile, updateProfile |
| `bookCopies.js` | Copy management | getAll, create, update |

**Example API Module:**
```javascript
// src/api/books.js
import api from './axios';

export const booksApi = {
  getAll: (params = {}) => api.get('/books', { params }),
  getById: (id) => api.get(`/books/${id}`),
  create: (data) => api.post('/books', data),
  update: (id, data) => api.put(`/books/${id}`, data),
  delete: (id) => api.delete(`/books/${id}`),
  getCopies: (id) => api.get(`/books/${id}/copies`),
  search: (query) => api.get('/books', { params: { search: query } }),
};
```

---

## 🎨 Styling & Theming

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        secondary: {
          50: '#fdf4ff',
          500: '#d946ef',
          600: '#c026d3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### Theme Context

Dark/Light mode support with `ThemeContext`:

```javascript
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
```

### Custom Components

**Book Card:**
- Book cover image
- Title and author
- Genre badges
- Available copies count
- Borrow button
- Favorite toggle

**Loading States:**
- Skeleton loaders for lists
- Spinner overlays for forms
- Progress bars for uploads

**Error Messages:**
- Toast notifications
- Inline validation errors
- Modal alerts for critical errors

---

## 📱 Responsive Design

### Mobile Optimizations

- **Hamburger Menu** - Collapsible navigation on mobile
- **Touch-Friendly Buttons** - Minimum 44px tap targets
- **Optimized Images** - Lazy loading and responsive sizes
- **Swipe Gestures** - For image carousels and lists
- **Bottom Sheets** - Mobile-friendly modals

### Desktop Enhancements

- **Hover Effects** - Interactive feedback
- **Keyboard Navigation** - Full keyboard support
- **Multi-column Layouts** - Efficient use of space
- **Sticky Headers** - Improved navigation

---

## 🔒 Security Features

### Client-Side Security

| Feature | Implementation |
|---------|----------------|
| **Token Storage** | localStorage for access token |
| **Automatic Token Refresh** | Interceptor handles 401 errors |
| **Route Protection** - Prevent unauthorized access |
| **Input Validation** - Client-side validation before API calls |
| **XSS Protection** - React automatically escapes JSX |
| **CSRF Tokens** - Handled by backend cookies |

### Secure API Calls

```javascript
// All API calls include auth token automatically
api.get('/protected-endpoint')
  .then(response => {
    // Token included via interceptor
  })
  .catch(error => {
    // Auto logout on 401
  });
```

---

## 📊 Performance Optimization

### Code Splitting

React.lazy for lazy loading components:

```javascript
const BooksAdmin = lazy(() => import('../pages/dashboard/admin/BooksAdmin'));
const UsersAdmin = lazy(() => import('../pages/dashboard/admin/UsersAdmin'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="dashboard/books" element={<BooksAdmin />} />
        <Route path="dashboard/users" element={<UsersAdmin />} />
      </Routes>
    </Suspense>
  );
}
```

### TanStack Query Optimization

- **Query Caching** - Reduces API calls
- **Stale Time** - Controls refetch frequency
- **Cache Invalidation** - Targeted updates
- **Prefetching** - Load data before user needs it

### Asset Optimization

- **Vite** - Optimizes bundles automatically
- **Tree Shaking** - Removes unused code
- **Code Minification** - Reduces bundle size
- **Image Optimization** - Modern formats (WebP, AVIF)

---

## 🧪 Testing & Debugging

### React Query DevTools

Built-in dev tools for debugging:

```javascript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

### Browser DevTools

- **React DevTools** - Inspect component tree and props
- **Redux DevTools** - Alternative for state debugging
- **Network Tab** - Monitor API calls
- **Console** - Debug errors and warnings

---

## 📦 Project Structure

```
frontend/
├── public/                  # Static assets
│   └── images/             # Logos, icons
├── src/
│   ├── api/                # API clients
│   │   ├── axios.js        # Axios configuration
│   │   ├── auth.js
│   │   ├── books.js
│   │   ├── loans.js
│   │   └── ...
│   ├── assets/             # Component assets
│   │   └── images/
│   ├── components/         # Reusable components
│   │   ├── BookCard.jsx
│   │   ├── BookCardSmall.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── homePage/       # Home page sections
│   ├── context/            # React Context
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── layouts/            # Layout components
│   │   └── MainLayout.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Books.jsx
│   │   ├── BookDetails.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── PageNotFound.jsx
│   │   └── dashboard/      # Admin dashboard
│   │       ├── Dashboard.jsx
│   │       └── admin/     # Admin pages
│   │           ├── DashboardOverview.jsx
│   │           ├── BooksAdmin.jsx
│   │           ├── UsersAdmin.jsx
│   │           ├── BookCopiesAdmin.jsx
│   │           ├── LoansAdmin.jsx
│   │           ├── GenresAdmin.jsx
│   │           └── AuthorsAdmin.jsx
│   ├── routers/           # Route configuration
│   │   └── Routers.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx           # App entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Vite Features

- **Hot Module Replacement (HMR)** - Instant updates
- **Fast Refresh** - Preserves component state
- **Optimized Builds** - Lightning-fast production builds
- **ES Modules** - Native module support

---

## 📝 Key User Flows

### 1. User Registration & Login

```
User → Register Page → Submit Form → API Call → Success → 
Login Page → Submit Form → API Call → Receive Token → 
Store in localStorage → Redirect to Home → Auth State Updated
```

### 2. Borrowing a Book

```
User → Book Details → Click Borrow → API Call → 
TanStack Query Optimistic Update → Success → 
Update UI → Show Confirmation → Refresh Loan List
```

### 3. Admin Managing Books

```
Admin → Dashboard → Books Tab → View Books → 
Add/Edit/Delete → API Call → TanStack Query Cache Update → 
UI Reflects Changes
```

---

## 🎓 Best Practices Implemented

### Code Quality
- ✅ Component composition and reusability
- ✅ Custom hooks for logic separation
- ✅ Proper error boundaries
- ✅ Consistent naming conventions
- ✅ Clean code principles

### Performance
- ✅ Code splitting with React.lazy
- ✅ Memoization with useMemo/useCallback
- ✅ Efficient re-rendering
- ✅ Optimized bundle size
- ✅ Image lazy loading

### UX
- ✅ Loading states for all async operations
- ✅ Error handling with user-friendly messages
- ✅ Form validation with feedback
- ✅ Smooth transitions and animations
- ✅ Responsive design for all screen sizes

### Security
- ✅ Protected routes
- ✅ Token management
- ✅ Input sanitization
- ✅ XSS protection

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

### Deployment Options

1. **Vercel** (Recommended)
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Netlify**
   ```bash
   npm run build
   # Drag and drop dist/ folder to Netlify
   ```

3. **GitHub Pages**
   ```bash
   npm run build
   # Deploy dist/ folder to gh-pages branch
   ```

4. **Traditional Hosting**
   ```bash
   npm run build
   # Upload dist/ contents to web server
   ```

### Environment Variables

Set environment variables in your deployment platform:

```
VITE_API_BASE_URL=https://your-backend-api.com/api
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: API calls failing**
- Check if backend is running
- Verify `VITE_API_BASE_URL` in `.env`
- Check browser console for CORS errors

**Issue: Auth state not persisting**
- Check localStorage for token
- Verify token expiry
- Check browser settings

**Issue: Styles not loading**
- Clear browser cache
- Check Tailwind CSS configuration
- Verify Vite is running in development mode

**Issue: Build errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for missing dependencies
- Verify Node.js version

---

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [React Router v7](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Axios Documentation](https://axios-http.com/)

---

## 🎨 Customization

### Adding New Features

1. **New Page:**
   ```javascript
   // Create page in src/pages/
   export default function NewPage() {
     return <div>New Page Content</div>;
   }
   
   // Add route in src/routers/Routers.jsx
   <Route path="/new-page" element={<NewPage />} />
   ```

2. **New API Endpoint:**
   ```javascript
   // Add to appropriate API module in src/api/
   export const newApi = {
     getData: () => api.get('/new-endpoint'),
   };
   ```

3. **New Component:**
   ```javascript
   // Create in src/components/
   // Follow existing component patterns
   // Use Tailwind CSS for styling
   ```

---

<div align="center">

**Built with modern React patterns for production use**

</div>