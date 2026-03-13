import { NavLink, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";

import logo from "../assets/images/logo_library1.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="sticky w-full max-w-7xl mx-auto  top-0 z-50 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold  dark:bg-amber-50 rounded-lg "
        >
          <img
            src={logo}
            alt="Library"
            className="w-40 hover:bg-blue-200 rounded-lg"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium items-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "bg-blue-600 text-white px-3 py-2 rounded-lg shadow-md transition-all"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-all"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-600 text-white px-3 py-2 rounded-lg shadow-md transition-all"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-all"
            }
          >
            Books
          </NavLink>

          {user ? (
            <div className="inline-flex items-center gap-4">
              <Link to="/profile" className="font-bold bg-green-600 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-white text-xl hover:opacity-80 transition-opacity" title="Go to Profile">
                {user && user?.name[0].toUpperCase()}
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded cursor-pointer text-white hover:bg-red-800 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 px-4 py-1 rounded text-white"
            >
              Login
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 ml-4 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition text-xl"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition text-xl"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-gray-200 focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 absolute w-full left-0 shadow-lg animate-fade-in-down">
          <div className="flex flex-col p-4 space-y-4 font-medium">
            <NavLink
              to="/"
              end
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md block"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg block transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/books"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md block"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg block transition"
              }
            >
              Books
            </NavLink>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              {user ? (
                <div className="flex flex-col gap-3">
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition">
                    <div  className="font-bold bg-green-600 rounded-full w-8 h-8 flex items-center justify-center text-white">
                      {user.name[0].toUpperCase()}
                    </div>
                    <span className="text-gray-800 dark:text-white">
                      {user.name}
                    </span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="bg-red-500 w-full py-2 rounded text-white hover:bg-red-600 transition text-center"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-600 w-full block py-2 rounded text-white text-center hover:bg-blue-700 transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
