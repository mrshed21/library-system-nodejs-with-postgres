import { Link } from "react-router-dom";



export default function BookCardSmall({ book }) {
  return (
    <div
            key={book.id}
            className="min-w-[250px] md:min-w-[280px] snap-start bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
          >
            {/* Book Cover */}
            <div className="h-64 overflow-hidden relative">
              <img
                src={book.image || "https://placehold.co/400x600?text=No+Cover"}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <Link to={`/books/${book.id}`} className="w-full py-2 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 transition">
                  View Details
                </Link>
              </div>
            </div>

            {/* Book Info */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1 mb-1" title={book.name}>
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                by {book.Author?.name}
              </p>
              
              <div className="mt-auto flex flex-wrap gap-2">
                 {book.Genres?.slice(0, 2).map((g) => (
                  <span key={g.id} className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-full">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
  );
}
