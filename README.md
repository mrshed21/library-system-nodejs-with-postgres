# Library Management System

A comprehensive full-stack library management application designed to facilitate book borrowing, returning, and user management. Built with a robust **Node.js** backend and a modern **React** frontend.

## 🚀 Features

### User Features
- **Authentication**: Secure Login and Registration for users.
- **Book Browsing**: Browse a collection of books with search and filter capabilities.
- **Book Details**: View detailed information about books, including availability status, authors, and descriptions.
- **Borrowing System**:
  - **Borrow Books**: Users can borrow available books instantly.
  - **Return Books**: Easy process to return borrowed books via the profile page.
  - **Availability Tracking**: Real-time updates on book stock (Available/Out of Stock).
- **Favorites**: Users can add books to their personal favorites list for quick access.
- **User Profile**:
  - **Current Loans**: View books currently borrowed and their due dates.
  - **History**: Track previously borrowed and returned books.
  - **Settings**: Update basic profile information.
- **UI/UX**:
  - **Dark/Light Mode**: Fully supported theme toggling.
  - **Responsive Design**: Optimized for desktop, tablet, and mobile devices.

### Future Plans
- **Admin Dashboard**: A dedicated dashboard for librarians to manage inventory (Books/Authors/Categories) and view system-wide loan statistics.

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** for styling
- **TanStack Query (React Query)** for efficient server state management
- **React Router DOM** for navigation
- **Axios** for API communication

### Backend
- **Node.js** & **Express.js**
- **PostgreSQL** (Relational Database)
- **Sequelize** (ORM)
- **JWT** for secure authentication

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Configure your .env file (Database credentials, JWT_SECRET, etc.)
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📄 License

This project is licensed under the MIT License.