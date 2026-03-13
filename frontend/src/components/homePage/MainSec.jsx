import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function MainSec() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full bg-white dark:bg-slate-800  overflow-hidden  flex flex-col md:flex-row items-center mb-12  transition-colors duration-300">
        {/* Left Side - Image Area */}
        <div className="w-full md:w-1/2 h-64 md:h-[500px] relative group overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Library Interior"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay for better text visibility on small screens if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-center md:text-left">
          {user && (
            <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              Hej {user.name}!
            </h2>
          )}
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300 w-fit mx-auto md:mx-0">
            Welcome to Our Library
          </span>

          <h1 className="mb-6 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl leading-tight">
            Discover a World of <br />
            <span className="text-blue-600 dark:text-blue-400">
              Knowledge & Stories
            </span>
          </h1>

          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Dive into our vast collection of books across all genres. Whether
            you're looking for academic resources or your next great adventure,
            we have something for everyone.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row ml-auto justify-center md:justify-start">
            <Link
              to="/books"
              className="px-8 py-4 text-lg font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Start Reading
            </Link>
            {!user && (
              <Link
                to="/register" // Assuming you might want to direct new users here
                className="px-8 py-4 text-lg font-bold text-gray-700 dark:text-gray-200 transition-all bg-gray-100 dark:bg-slate-700 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Join Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
