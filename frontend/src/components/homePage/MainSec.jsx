import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function MainSec() {
  const { user } = useAuth();

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      </div>

      {/* Glassmorphism Content Area */}
      <div className="relative z-10 w-[90%] md:w-[80%] max-w-4xl p-8 md:p-12 backdrop-blur-md bg-white/20 dark:bg-slate-900/40 rounded-3xl border border-white/30 dark:border-slate-600/50 shadow-2xl flex flex-col items-center text-center">
        {user ? (
          <h2 className="text-xl md:text-2xl font-light text-white mb-2 tracking-wide">
            Welcome back, <span className="font-semibold">{user.name}</span>!
          </h2>
        ) : (
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-blue-600/80 rounded-full shadow-lg backdrop-blur-sm">
            Welcome to Our Library
          </span>
        )}

        <h1 className="mt-4 mb-6 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
          Discover a World of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100">
            Knowledge & Stories
          </span>
        </h1>

        <p className="max-w-2xl mx-auto mb-10 text-lg text-white/90 md:text-xl font-light leading-relaxed drop-shadow-md">
          Dive into our vast collection of books across all genres. Whether
          you're looking for academic resources or your next great adventure,
          we have something for everyone.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row justify-center w-full">
          <Link
            to="/books"
            className="px-8 py-4 text-lg font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:-translate-y-1 focus:outline-none"
          >
            Start Reading
          </Link>
          {!user && (
            <Link
              to="/register"
              className="px-8 py-4 text-lg font-bold text-slate-800 transition-all bg-white/90 hover:bg-white rounded-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-1 focus:outline-none"
            >
              Join for Free
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
