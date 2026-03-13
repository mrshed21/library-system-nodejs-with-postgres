import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth(); // Assuming useAuth provides user object
  const [activeTab, setActiveTab] = useState("current"); // current, history, favorites, settings

  // Mock Data - Replace with actual API calls later
  const dummyBorrowed = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", dueDate: "2023-11-15", image: "https://placehold.co/150x220?text=Gatsby" },
    { id: 2, title: "1984", author: "George Orwell", dueDate: "2023-11-20", image: "https://placehold.co/150x220?text=1984" },
  ];

  const dummyHistory = [
    { id: 3, title: "Clean Code", author: "Robert C. Martin", returnDate: "2023-10-01", status: "Returned" },
    { id: 4, title: "Pragmatic Programmer", author: "Andy Hunt", returnDate: "2023-09-15", status: "Returned" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "current":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Current Loans</h3>
            {dummyBorrowed.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dummyBorrowed.map((book) => (
                  <div key={book.id} className="flex bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl border border-gray-100 dark:border-slate-700">
                    <img src={book.image} alt={book.title} className="w-16 h-24 object-cover rounded shadow-sm" />
                    <div className="ml-4 flex flex-col justify-center">
                      <h4 className="font-bold text-gray-900 dark:text-white">{book.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{book.author}</p>
                      <p className="text-sm text-red-500 mt-2 font-medium">Due: {book.dueDate}</p>
                    </div>
                    <div className="ml-auto flex items-center">
                      <button
                        onClick={() => {
                          if(window.confirm("Are you sure you want to return this book?")) returnMutation.mutate(loan.id);
                        }}
                        disabled={returnMutation.isPending}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {returnMutation.isPending ? "Returning..." : "Return Book"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">You have no books currently borrowed.</p>
            )}
          </div>
        );

      case "history":
        return (
          <div className="overflow-x-auto">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Borrowing History</h3>
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-100 dark:bg-slate-700 text-xs uppercase text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-6 py-3 rounded-l-lg">Book Title</th>
                  <th className="px-6 py-3">Author</th>
                  <th className="px-6 py-3">Returned Date</th>
                  <th className="px-6 py-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {dummyHistory.map((item) => (
                  <tr key={item.id} className="border-b dark:border-slate-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.title}</td>
                    <td className="px-6 py-4">{item.author}</td>
                    <td className="px-6 py-4">{item.returnDate}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "favorites":
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">My Favorites</h3>
            <p className="text-gray-500 dark:text-gray-400">No favorite books added yet.</p>
            <Link to="/books" className="text-blue-600 hover:underline mt-2 inline-block">Browse books to add favorites</Link>
          </div>
        );

      case "settings":
        return (
          <div className="max-w-lg">
             <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Account Settings</h3>
             <form className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                 <input type="text" defaultValue={user?.name} className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 sm:text-sm" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                 <input type="email" defaultValue={user?.email} disabled className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-400 shadow-sm cursor-not-allowed py-2 px-3 sm:text-sm opacity-70" />
               </div>
               <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Update Profile</button>
             </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-customBg transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100 dark:border-gray-700">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 mb-6">
              <div className="relative">
                 <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-700 p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-gray-200 dark:bg-slate-600 flex items-center justify-center text-2xl font-bold text-gray-500 dark:text-gray-300 uppercase">
                      {user?.name ? user.name.charAt(0) : "U"}
                    </div>
                 </div>
              </div>
              <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name || "User Name"}</h1>
                <p className="text-gray-500 dark:text-gray-400">{user?.email || "user@example.com"}</p>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                {['current', 'history', 'favorites', 'settings'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors`}
                  >
                    {tab.replace('-', ' ')}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 min-h-[400px]">
          {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default Profile;
