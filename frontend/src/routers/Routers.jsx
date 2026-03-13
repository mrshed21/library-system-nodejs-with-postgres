import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Books from "../pages/Books";
import BookDetails from "../pages/BookDetails";
import Login from "../pages/Login";
import Register from "../pages/Regestir";

import { useAuth } from "../context/AuthContext";
import Profile from "../pages/ProfilePage";
import PageNotFound from "../pages/PageNotFound";




function Routers() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routers;
