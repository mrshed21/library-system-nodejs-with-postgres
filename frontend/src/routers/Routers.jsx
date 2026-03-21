import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Books from "../pages/Books";
import BookDetails from "../pages/BookDetails";
import Login from "../pages/Login";
import Register from "../pages/Regestir";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardOverview from "../pages/dashboard/admin/DashboardOverview";
import BooksAdmin from "../pages/dashboard/admin/BooksAdmin";
import UsersAdmin from "../pages/dashboard/admin/UsersAdmin";
import BookCopiesAdmin from "../pages/dashboard/admin/BookCopiesAdmin";
import LoansAdmin from "../pages/dashboard/admin/LoansAdmin";
import GenresAdmin from "../pages/dashboard/admin/GenresAdmin";
import AuthorsAdmin from "../pages/dashboard/admin/AuthorsAdmin";

import { useAuth } from "../context/AuthContext";
import Profile from "../pages/ProfilePage";
import PageNotFound from "../pages/PageNotFound";
import MainLayout from "../layouts/MainLayout";




function Routers() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      </Route>
      <Route path="/dashboard" element={user && user.role === 'admin' ? <Dashboard /> : <Navigate to="/login" />}>
        <Route index element={<DashboardOverview />} />
        <Route path="books" element={<BooksAdmin />} />
        <Route path="users" element={<UsersAdmin />} />
        <Route path="copies" element={<BookCopiesAdmin />} />
        <Route path="loans" element={<LoansAdmin />} />
        <Route path="genres" element={<GenresAdmin />} />
        <Route path="authors" element={<AuthorsAdmin />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routers;
