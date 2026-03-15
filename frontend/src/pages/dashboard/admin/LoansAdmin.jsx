import { useState, useEffect, useMemo } from "react";
import { getAllLoans, adminCreateLoan, adminReturnLoan } from "../../../api/loans";
import { getAllUsers } from "../../../api/users";
import { getAllBooks } from "../../../api/books";

const LoansAdmin = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");
  const [searchBook, setSearchBook] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  // Create loan modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [createForm, setCreateForm] = useState({ user_id: "", book_id: "" });
  const [createLoading, setCreateLoading] = useState(false);
  const [returningId, setReturningId] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const res = await getAllLoans();
      setLoans(Array.isArray(res?.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = async () => {
    setCreateForm({ user_id: "", book_id: "" });
    setShowCreateModal(true);
    // Load users & books if not loaded yet
    try {
      const [usersRes, booksRes] = await Promise.all([
        getAllUsers({}),
        getAllBooks({ limit: 200 }),
      ]);
      setAllUsers(Array.isArray(usersRes?.data) ? usersRes.data : usersRes?.data?.users ?? []);
      setAllBooks(Array.isArray(booksRes?.data) ? booksRes.data : []);
    } catch (e) {
      console.error("Failed to load users/books:", e);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!createForm.user_id || !createForm.book_id) {
      alert("Please select both a user and a book.");
      return;
    }
    setCreateLoading(true);
    try {
      await adminCreateLoan({
        user_id: Number(createForm.user_id),
        book_id: Number(createForm.book_id),
      });
      setShowCreateModal(false);
      await fetchLoans();
    } catch (error) {
      console.error("Error creating loan:", error);
      alert("Error: " + (error?.response?.data?.message || error.message || "Failed to create loan."));
    } finally {
      setCreateLoading(false);
    }
  };

  const handleReturn = async (loanId) => {
    if (!window.confirm("Mark this loan as returned?")) return;
    setReturningId(loanId);
    try {
      await adminReturnLoan(loanId);
      await fetchLoans();
    } catch (error) {
      console.error("Error returning loan:", error);
      alert("Error: " + (error?.response?.data?.message || error.message || "Failed to return loan."));
    } finally {
      setReturningId(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  const activeLoans = useMemo(
    () => loans.filter((l) => l.status === "borrowed" || l.status === "overdue"),
    [loans]
  );
  const returnedLoans = useMemo(
    () => loans.filter((l) => l.status === "returned" || (l.status === "overdue" && l.returnDate)),
    [loans]
  );

  // Users with active loans only (for filter dropdown)
  const activeUsers = useMemo(() => {
    const map = new Map();
    activeLoans.forEach((l) => {
      if (l.User && !map.has(l.User.id)) map.set(l.User.id, l.User);
    });
    return Array.from(map.values());
  }, [activeLoans]);

  const currentLoans = activeTab === "active" ? activeLoans : returnedLoans;

  const filteredLoans = useMemo(() => {
    return currentLoans.filter((loan) => {
      const bookTitle = loan.BookCopy?.Book?.title?.toLowerCase() ?? "";
      const matchesBook = bookTitle.includes(searchBook.toLowerCase());
      const matchesUser = !selectedUser || String(loan.User?.id) === String(selectedUser);
      return matchesBook && matchesUser;
    });
  }, [currentLoans, searchBook, selectedUser]);

  const getStatusBadge = (loan) => {
    const isOverdue = loan.status === "borrowed" && new Date(loan.dueDate) < new Date();
    if (loan.status === "returned")
      return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Returned</span>;
    if (loan.status === "overdue" || isOverdue)
      return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Overdue</span>;
    return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Active</span>;
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Loans</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {activeLoans.length} active · {returnedLoans.length} returned
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchLoans}
            className="px-4 py-2 text-sm bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 transition"
          >
            ↻ Refresh
          </button>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
          >
            + New Loan
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => { setActiveTab("active"); setSelectedUser(""); setSearchBook(""); }}
          className={`px-5 py-2 rounded-lg font-medium text-sm transition ${
            activeTab === "active"
              ? "bg-blue-600 text-white shadow"
              : "bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600"
          }`}
        >
          📖 Active Loans
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === "active" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300"}`}>
            {activeLoans.length}
          </span>
        </button>
        <button
          onClick={() => { setActiveTab("returned"); setSelectedUser(""); setSearchBook(""); }}
          className={`px-5 py-2 rounded-lg font-medium text-sm transition ${
            activeTab === "returned"
              ? "bg-green-600 text-white shadow"
              : "bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600"
          }`}
        >
          ✅ Returned Loans
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === "returned" ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300"}`}>
            {returnedLoans.length}
          </span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by book title..."
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        {activeTab === "active" && (
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-[220px]"
          >
            <option value="">All Users with Active Loans</option>
            {activeUsers.map((u) => (
              <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
            ))}
          </select>
        )}
        {(searchBook || selectedUser) && (
          <button
            onClick={() => { setSearchBook(""); setSelectedUser(""); }}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition"
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Book Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Borrow Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Due Date</th>
                {activeTab === "returned" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Return Date</th>
                )}
                {activeTab === "active" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fine</th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                {activeTab === "active" && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {filteredLoans.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                    No {activeTab === "active" ? "active" : "returned"} loans found.
                  </td>
                </tr>
              ) : (
                filteredLoans.map((loan, idx) => (
                  <tr key={loan.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 dark:text-gray-500">{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {loan.BookCopy?.Book?.title ?? "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      <div className="font-medium">{loan.User?.name ?? "—"}</div>
                      <div className="text-xs text-gray-400">{loan.User?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {formatDate(loan.borrowDate)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      activeTab === "active" && new Date(loan.dueDate) < new Date()
                        ? "text-red-600 dark:text-red-400"
                        : "text-gray-500 dark:text-gray-300"
                    }`}>
                      {formatDate(loan.dueDate)}
                    </td>
                    {activeTab === "returned" && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">
                        {formatDate(loan.returnDate)}
                      </td>
                    )}
                    {activeTab === "active" && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {loan.fine > 0
                          ? <span className="text-red-600 dark:text-red-400 font-semibold">${loan.fine}</span>
                          : <span className="text-gray-400">—</span>}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(loan)}
                    </td>
                    {activeTab === "active" && (
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleReturn(loan.id)}
                          disabled={returningId === loan.id}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {returningId === loan.id ? "..." : "↩ Return"}
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ====== Create Loan Modal ====== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Create New Loan</h2>
            <form onSubmit={handleCreate} className="space-y-5">
              {/* User select */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  User <span className="text-red-500">*</span>
                </label>
                <select
                  value={createForm.user_id}
                  onChange={(e) => setCreateForm({ ...createForm, user_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">— Select User —</option>
                  {allUsers.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Book select */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Book <span className="text-red-500">*</span>
                </label>
                <select
                  value={createForm.book_id}
                  onChange={(e) => setCreateForm({ ...createForm, book_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">— Select Book —</option>
                  {allBooks.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title} {b.availableQuantity === 0 ? "(No copies available)" : `(${b.availableQuantity ?? "?"} available)`}
                    </option>
                  ))}
                </select>
                {allBooks.length === 0 && (
                  <p className="text-xs text-red-500 mt-1">Loading books...</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {createLoading ? "Creating..." : "Create Loan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoansAdmin;
