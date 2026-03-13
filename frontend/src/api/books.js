
import api from './axios';

// get all books
export const fetchBooks = async ({ page = 1, limit = 10, search, genre, sort, order, authorId } = {}) => {
  const response = await api.get('/api/books', {
    params: {
      page,
      limit,
      search,
      genre,
      sort,
      order,
      authorId
    }
  });
  return response.data;
};

// get book by id
export const fetchBookById = async (id) => {
  const response = await api.get(`/api/books/${id}`);
  return response.data;
};