import { useState, useEffect } from "react";
import {
  getAllBookCopies,
  createBookCopy,
  updateBookCopy,
  deleteBookCopy,
} from "../../../api/bookCopies";
import { getAllBooks } from "../../../api/books";

const STATUS_OPTIONS = ["AVAILABLE", "BORROWED", "DAMAGED", "LOST"];

const BookCopiesAdmin = () => {
  const [bookCopies, setBookCopies] = useState([]);
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCopy, setCurrentCopy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    book_id: "",
    status: "AVAILABLE",
  });

  useEffect(() => {
    fetchBookCopies();
    fetchBooks();
  }, []);

  const fetchBookCopies = async () => {
    try {
      // getAllBookCopies returns axios response.data = { success, data:[...], meta:{} }
      const res = await getAllBookCopies({ limit: 10000 }); // Fetch all book copies
      console.log("[BookCopies] raw response:", res);
      // Backend wraps array in res.data
      const arr = Array.isArray(res?.data) ? res.data : [];
      setBookCopies(arr);
    } catch (error) {
      console.error("Error fetching book copies:", error?.response?.data || error.message);
    }
  };

  const fetchBooks = async () => {
    try {
      // getAllBooks returns axios response.data = { success, data:[...books], meta:{} }
      const res = await getAllBooks({ limit: 200 });
      console.log("[Books] raw response:", res);
      // Backend wraps array in res.data
      const arr = Array.isArray(res?.data) ? res.data : [];
      setBooks(arr);
    } catch (error) {
      console.error("Error fetching books:", error?.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setIsEditing(false);
    setFormData({ book_id: "", status: "AVAILABLE" });
    setShowModal(true);
  };

  const openEditModal = (copy) => {
    setIsEditing(true);
    setCurrentCopy(copy);
    setFormData({
      book_id: copy.book_id,
      status: copy.status,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentCopy(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.book_id) {
      alert("Please select a book.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        book_id: Number(formData.book_id),
        status: formData.status,
      };
      console.log("[Submit] payload:", payload);
      if (isEditing) {
        await updateBookCopy(currentCopy.id, payload);
      } else {
        await createBookCopy(payload);
      }
      await fetchBookCopies();
      closeModal();
    } catch (error) {
      console.error("Error saving book copy:", error?.response?.data || error.message);
      const msg = error?.response?.data?.message || error?.response?.data?.errors?.map?.(e => e.message).join(", ") || error.message || "Failed to save book copy.";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book copy?")) {
      try {
        await deleteBookCopy(id);
        fetchBookCopies();
      } catch (error) {
        console.error("Error deleting book copy:", error);
        alert("Error: " + (error?.response?.data?.message || "Failed to delete."));
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "AVAILABLE": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "BORROWED": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "DAMAGED": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "LOST": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Manage Book Copies
        </h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add New Copy
        </button>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Book Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Barcode
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {bookCopies.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No book copies found.
                </td>
              </tr>
            ) : (
              bookCopies.map((copy, index) => (
                <tr key={copy.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {copy.Book?.title ?? `Book #${copy.book_id}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 font-mono">
                    {copy.barcode ?? "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(copy.status)}`}>
                      {copy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(copy)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(copy.id)}
                      className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              {isEditing ? "Edit Book Copy" : "Add New Book Copy"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Book Select */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Book <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="book_id"
                    value={formData.book_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="">— Select a book —</option>
                    {books.map((book) => (
                      <option key={book.id} value={book.id}>
                        {book.title}
                      </option>
                    ))}
                  </select>
                  {books.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">No books loaded. Check console for errors.</p>
                  )}
                </div>

                {/* Status Select */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : isEditing ? "Save Changes" : "Add Copy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCopiesAdmin;
