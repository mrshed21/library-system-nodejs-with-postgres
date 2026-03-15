import { Link } from "react-router-dom";
function BookCard({ book }) {
  return (
    <div className="flex justify-between w-full bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition p-3 border border-transparent dark:border-gray-700 gap-5">
      <div className="flex-1">
        
        <img
          src={book.image || "https://placehold.co/600x400?text=No+Cover"}
          alt={book.title}
          className=" object-cover rounded"
        />
      </div>
      <div
        key={book.id}
        className=" transition  flex flex-col justify-between flex-2  w-full"
      >
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {book.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            by{" "}
            <span className="font-medium text-accent">{book.Author?.name}</span>
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {book.Genres?.map((g) => (
              <span
                key={g.id}
                className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded-full"
              >
                {g.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto ml-auto ">
          <Link
            to={`/books/${book?.id}`}
            className="inline-block  mt-2 dark:text-gray-50 text-accent font-medium hover:underline"
          >
            Read more ...
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
