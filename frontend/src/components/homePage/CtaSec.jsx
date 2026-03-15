import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CtaSec() {
  const { user } = useAuth();

  if (user) return null; // Don't show CTA to logged in users

  return (
    <section className="py-20 bg-blue-600 dark:bg-blue-800 transition-colors duration-300 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-500 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-700 opacity-50 blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
          Ready to dive into your next great read?
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Join our community of book lovers today. Get free access to our expansive collection and start borrowing right away!
        </p>
        <Link
          to="/register"
          className="inline-block px-10 py-5 text-lg font-bold text-blue-600 bg-white rounded-xl shadow-xl hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none ring-4 ring-white/30"
        >
          Create Your Free Account
        </Link>
      </div>
    </section>
  );
}
