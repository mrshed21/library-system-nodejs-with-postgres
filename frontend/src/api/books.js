import api from './axios';

// get all books
export const getAllBooks = async (params = {}) => {
  const response = await api.get('/api/books', { params });
  return response.data;
};

// get book by id
export const fetchBookById = async (id) => {
  const response = await api.get(`/api/books/${id}`);
  return response.data;
};

// create book
export const createBook = async (bookData) => {
  const response = await api.post('/api/admin/books', bookData);
  return response.data;
};

// update book
export const updateBook = async (id, bookData) => {
  const response = await api.put(`/api/admin/books/${id}`, bookData);
  return response.data;
};

// delete book
export const deleteBook = async (id) => {
  const response = await api.delete(`/api/admin/books/${id}`);
  return response.data;
};
