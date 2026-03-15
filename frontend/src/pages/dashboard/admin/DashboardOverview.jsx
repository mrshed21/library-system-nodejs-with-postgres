import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBooks } from "../../../api/books";
import { getAllUsers } from "../../../api/users";
import { getAllBookCopies } from "../../../api/bookCopies";
import { getAllLoans } from "../../../api/loans";

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    books: 0,
    users: 0,
    loans: 0,
    copies: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [booksData, usersData, copiesData, loansData] = await Promise.all([
          getAllBooks(),
          getAllUsers({}),
          getAllBookCopies(),
          getAllLoans().catch(() => ({ data: [] })),
        ]);

        const allLoans = loansData?.data ?? [];
        const activeLoans = allLoans.filter(l => l.status === 'borrowed');

        setStats({
          books: booksData?.data?.length ?? 0,
          users: usersData?.data?.users?.length ?? usersData?.data?.length ?? 0,
          copies: copiesData?.data?.length ?? 0,
          loans: activeLoans.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Books",
      value: stats.books,
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      link: "/dashboard/books",
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Total Copies",
      value: stats.copies,
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      ),
      link: "/dashboard/copies",
      color: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Active Loans",
      value: stats.loans,
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: "/dashboard/loans",
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "Active Users",
      value: stats.users,
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      link: "/dashboard/users",
      color: "bg-orange-100 dark:bg-orange-900/30",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">General Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Here's what's happening in your library today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.color}`}>
                {card.icon}
              </div>
            </div>
            <div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{card.value}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
              <Link 
                to={card.link}
                className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
               >
                View Details
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
           <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Facts</h2>
           <div className="p-4 bg-blue-50 dark:bg-slate-700/50 rounded-lg">
             <p className="text-sm pl-2 text-gray-700 dark:text-gray-300 border-l-4 border-blue-500">
               Welcome to the admin dashboard! From here you can manage your library's books, inventory, check on user loan status, and administer user profiles. Click on a category above or use the sidebar navigation to get started.
             </p>
           </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
           <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
           <div className="space-y-3">
             <Link to="/dashboard/books" className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Add New Book</span>
               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
               </svg>
             </Link>
             <Link to="/dashboard/users" className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Manage Users</span>
               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
