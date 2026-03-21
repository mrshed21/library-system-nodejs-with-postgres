import api from "./axios";

export const getAllBookCopies = async (params = {}) => {
  const response = await api.get("/api/book-copies", { params });
  return response.data;
};

export const getBookCopyById = async (id) => {
  const response = await api.get(`/api/book-copies/${id}`);
  return response.data;
};

export const createBookCopy = async (data) => {
  const response = await api.post("/api/book-copies", data);
  return response.data;
};

export const updateBookCopy = async (id, data) => {
  const response = await api.put(`/api/book-copies/${id}`, data);
  return response.data;
};

export const deleteBookCopy = async (id) => {
  const response = await api.delete(`/api/book-copies/${id}`);
  return response.data;
};
