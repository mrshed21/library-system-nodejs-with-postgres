import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { getAllBooks } from "../../api/books";
import BookCardSmall from "../BookCardSmall";

export default function NewBooks({title= "New Arrivals", description= "Check out the latest additions to our collection" , numberOfBooks = 10}) {
  const scrollRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["newBooks"],
    queryFn: () => getAllBooks({ sort: "createdAt", order: "DESC", limit: numberOfBooks }),
  });

  // Function to handle scrolling left or right
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === "left" ? -320 : 320; 
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header section with title and navigation buttons */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {data?.data?.map((book) => (
          <BookCardSmall key={book.id} book={book} />
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-10 text-center">
        <Link 
          to="/books" 
          className="inline-block px-8 py-3 font-semibold text-blue-600 bg-blue-50 dark:bg-slate-800 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors duration-300 shadow-sm hover:shadow"
        >
          View All Books
        </Link>
      </div>
    </section>
  );
}
