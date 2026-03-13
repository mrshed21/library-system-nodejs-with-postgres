import api from "./axios";

export const getFavorites = async () => {
  const response = await api.get("/api/users/me/favorite-books");
  return response.data;
};

export const addFavorite = async (bookId) => {
  const response = await api.post("/api/users/me/favorite-books", { book_id: Number(bookId) });
  return response.data;
};

export const removeFavorite = async (bookId) => {
  const response = await api.delete(`/api/users/me/favorite-books/${bookId}`);
  return response.data;
};
