import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchBooks } from "../api/books";
import { fetchGenres } from "../api/genres";
import { fetchAuthors } from "../api/authors";
import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";

const Books = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [sortOrder, setSortOrder] = useState("name-ASC");

  // Debounce Search Input
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // Reset page on new search
    }, 2000);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const [sort, order] = sortOrder.split("-");

  const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
    queryKey: ["books", page, search, genre, sort, order, authorId],
    queryFn: () => fetchBooks({ page, search, genre, sort, order, authorId }),
    placeholderData: keepPreviousData,
    retry: false,
  });

  const { data: genresData } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const { data: authorsData } = useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthors,
  });

  return (
    <section className="bg-customBg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
      <h2 className="text-4xl font-bold mb-8 text-center text-customText">
        Books Collection
      </h2>

      {/* Advanced Filter Toolbar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center transition-all">
        <div className="flex flex-col gap-2 w-full ">
          {/* Search Bar */}
          <div className="relative w-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-col sm:flex-row gap-4 w-full ">
            <select
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="">All Genres</option>
              {genresData?.data?.map((g) => (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>

            <select
              value={authorId}
              onChange={(e) => {
                setAuthorId(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 rounded-lg border flex-1 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="">All Authors</option>
              {authorsData?.data?.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="name-ASC">Title (A-Z)</option>
              <option value="name-DESC">Title (Z-A)</option>
              <option value="createdAt-DESC">Newest First</option>
              <option value="createdAt-ASC">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* total count */}
      {!isPlaceholderData && data?.meta?.total > 0 && (
        <div className="text-center py-4 text-gray-600 dark:text-gray-400">
          <p>total  {data?.meta?.total} books</p>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-500">Searching books...</p>
        </div>
      ) : isError ? (
        error?.response?.status === 404 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <p className="text-xl">No books found matching your search.</p>
          </div>
        ) : (
          <div className="text-center py-20 text-red-500">
            Error loading books: {error.message}
          </div>
        )
      ) : data?.data.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-xl">No books found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 flex-1  gap-4 ">
          {data?.data?.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-500 rounded-lg hover:bg-blue-300 dark:hover:bg-blue-300 disabled:opacity-50 transition text-customText"
        >
          Previous
        </button>
        <span className="text-customText font-medium">
          Page {page} of {data?.meta?.totalPages || 1}
        </span>
        <button
          onClick={() => {
            if (!isPlaceholderData && page < data?.meta?.totalPages) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPlaceholderData || page >= data?.meta?.totalPages}
          className="px-4 py-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Books;
