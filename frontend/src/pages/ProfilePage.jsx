import  { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMyLoans, returnBook } from "../api/loans";
import { getFavorites } from "../api/favorites";
import { updateUser } from "../api/users";

const Profile = () => {
  const { user } = useAuth(); // Assuming useAuth provides user object
  const [activeTab, setActiveTab] = useState("current"); // current, history, favorites, settings
  const [updateUserInput, setUpdateUserInput] = useState(null);
  const queryClient = useQueryClient();

  const returnMutation = useMutation({
    mutationFn: returnBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myLoans"] });
    },
    onError: (err) => {
      alert(err.response?.data?.message || err.message || "Failed to return book");
    }
  });

  const { data: loansData, isLoading: loansLoading } = useQuery({
    queryKey: ["myLoans"],
    queryFn: fetchMyLoans,
  });

  const { data: favsData, isLoading: favsLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    enabled: !!user,
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["user"], updatedUser);
      alert("Profile updated successfully");
    },
    onError: (err) => {
      alert(err.response?.data?.message || err.message || "Failed to update profile");
    }
  });
  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (!updateUserInput?.name) {
      alert("Name cannot be empty");
      return;
    }
    
    updateUserMutation.mutate({ id: user.id, data: { ...updateUserInput } });
  };


  

  const loans = loansData?.data || [];
  const currentLoans = loans.filter(loan => !loan.returnDate);
  const historyLoans = loans.filter(loan => loan.returnDate);
  
  const favoriteBooksList = favsData?.data || [];

  const renderContent = () => {
    switch (activeTab) {
      case "current":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Current Loans</h3>
            {loansLoading ? <p>Loading...</p> : currentLoans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentLoans.map((loan) => (
                  <div key={loan.id} className="flex bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl border border-gray-100 dark:border-slate-700 gap-4">
                    <img src={loan.BookCopy?.Book?.image || "https://placehold.co/150x220?text=Book"} alt={loan.BookCopy?.Book?.title || "Book"} className="w-16 h-24 object-cover rounded shadow-sm" />
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-gray-900 dark:text-white">{loan.BookCopy?.Book?.title || "Unknown Book"}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{loan.BookCopy?.Book?.Author?.name || "Unknown Author"}</p>
                      <p className="text-sm text-red-500 mt-2 font-medium">Due: {new Date(loan.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to return this book?")) returnMutation.mutate(loan.id);
                        }}
                        disabled={returnMutation.isPending}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {returnMutation.isPending ? "Returning..." : "Return"}
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
                {historyLoans.map((loan) => (
                  <tr key={loan.id} className="border-b dark:border-slate-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{loan.BookCopy?.Book?.title || 'Unknown Book'}</td>
                    <td className="px-6 py-4">{loan.BookCopy?.Book?.Author?.name || 'Unknown Author'}</td>
                    <td className="px-6 py-4">{new Date(loan.returnDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Returned
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
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">My Favorites</h3>
            {favsLoading ? <p>Loading...</p> : favoriteBooksList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoriteBooksList.map((book) => (
                  <Link key={book.id} to={`/books/${book.id}`} className="block group">
                     <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-transform transform group-hover:-translate-y-1">
                       <div className="aspect-[2/3] overflow-hidden">
                         <img src={book.image || "https://placehold.co/150x220?text=Book"} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                       </div>
                       <div className="p-4">
                         <h4 className="font-bold text-gray-900 dark:text-white truncate" title={book.title}>{book.title}</h4>
                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{book.Author.name}</p>
                       </div>
                     </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-gray-500 dark:text-gray-400">No favorite books added yet.</p>
                <Link to="/books" className="text-blue-600 hover:underline mt-2 inline-block">Browse books to add favorites</Link>
              </div>
            )}
          </div>
        );

      case "settings":
        return (
          <div className="max-w-lg">
             <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Account Settings</h3>
             <form onSubmit={handleUpdateUser} className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                 <input type="text" defaultValue={user?.name} onChange={(e) => setUpdateUserInput({...updateUserInput, name: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 sm:text-sm" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                 <input type="email" defaultValue={user?.email} onChange={(e) => setUpdateUserInput({...updateUserInput, email: e.target.value})} disabled className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-400 shadow-sm cursor-not-allowed py-2 px-3 sm:text-sm opacity-70" />
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
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-10 mb-6">
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
