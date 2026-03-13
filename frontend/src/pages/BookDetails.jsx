import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBookById } from '../api/books';
import { borrowBook } from '../api/loans';
import { getFavorites, addFavorite, removeFavorite } from '../api/favorites';
import NewBooks from '../components/homePage/NewBooks';
import { useAuth } from "../context/AuthContext";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  //get book details using react query
  const { data: bookData, isLoading, isError } = useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBookById(id),
  });

  const borrowMutation = useMutation({
    mutationFn: borrowBook,
    onSuccess: () => {
      alert("Book borrowed successfully!");
      queryClient.invalidateQueries({ queryKey: ['book', id] }); // Refresh availability
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Failed to borrow book");
    }
  });

  // fetch favorites logic
  const { data: favoritesData } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    enabled: !!user,
  });

  const favoritesList = favoritesData?.data || [];
  const isFavorite = favoritesList.some((fav) => fav.id === Number(id) || fav.id === id);

  const toggleFavoriteMutation = useMutation({
    mutationFn: () => isFavorite ? removeFavorite(id) : addFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
    onError: (err) => {
       alert(err.response?.data?.message || err.message || "Failed to toggle favorite");
    }
  });

  const book = bookData?.data;

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (isError || !book) return (
    <div className="text-center py-20 text-red-500">
      Error loading book details.
      <button onClick={() => navigate('/books')} className="block mx-auto mt-4 text-blue-600 hover:underline">
        Back to Books
      </button>
    </div>
  );

  // Handle potential naming inconsistency (availableQuantity vs available_quantity)
  const availableQty = book?.availableQuantity ?? book?.available_quantity ?? 0;

  const handleBorrow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    borrowMutation.mutate(book.id);
  };

  return (
    <div className="min-h-screen bg-customBg transition-colors duration-300 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb / Back Button */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <Link to="/books" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Library
          </Link>
        </nav>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            
            {/* Left Column: Image */}
            <div className="md:col-span-1">
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src={book.image || "https://placehold.co/600x900?text=Book+Cover"} 
                  alt={book.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm text-gray-800 dark:text-gray-200">
                  {availableQty > 0 ? "Available" : "Out of Stock"}
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="md:col-span-2 flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {book.name}
                  </h1>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg text-gray-600 dark:text-gray-400">by</span>
                    <Link to={`/books?authorId=${book.Author?.id}`} className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                      {book.Author?.name}
                    </Link>
                  </div>
                </div>
                
                {/* Favorite Button (Visual Only) */}
                <button 
                   onClick={() => {
                     if (!user) { navigate('/login'); return; }
                     toggleFavoriteMutation.mutate();
                   }}
                   disabled={toggleFavoriteMutation.isPending}
                   className={`p-3 rounded-full transition-colors ${
                     isFavorite ? 'bg-red-50 text-red-500 dark:bg-red-900/40' : 'bg-gray-100 dark:bg-slate-700 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'
                   }`}
                   title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Rating Placeholder */}
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">(4.8/5 based on 120 reviews)</span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-8">
                {book.Genres?.map((g, index) => (
                  <span key={index} className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-100 dark:border-blue-800">
                    {g.name}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="mb-8 prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Description</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {book.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
                <button 
                  onClick={handleBorrow}
                  disabled={availableQty <= 0 || borrowMutation.isPending}
                  className={`flex-1 font-bold py-3 px-6 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 flex justify-center items-center gap-2 ${
                    availableQty > 0 ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30" : "bg-gray-400 cursor-not-allowed text-gray-200"
                  }`}
                >
                   {borrowMutation.isPending ? "Processing..." : availableQty > 0 ? "Borrow Book" : "Out of Stock"}
                  {!borrowMutation.isPending && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>}
                </button>
                <button className="flex-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-xl transition flex justify-center items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Extra Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {/* Static placeholders for demo purposes */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <p className="text-gray-500 text-sm mb-1">Published</p>
            <p className="font-semibold text-gray-900 dark:text-white">2023</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <p className="text-gray-500 text-sm mb-1">Pages</p>
            <p className="font-semibold text-gray-900 dark:text-white">320</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <p className="text-gray-500 text-sm mb-1">Language</p>
            <p className="font-semibold text-gray-900 dark:text-white">English</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <p className="text-gray-500 text-sm mb-1">ISBN</p>
            <p className="font-semibold text-gray-900 dark:text-white">978-3-16-148410-0</p>
          </div>
        </div>
      </div>

      {/* Similar Books Section */}
      <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 pt-8 pb-4 border-t border-gray-200 dark:border-gray-800">
        <NewBooks title="You Might Also Like" description="Discover similar books in our collection" numberOfBooks={5} />
      </div>
    </div>
  );
};

export default BookDetails;