import api from "./axios";

export const getAllAuthors = async ({search} = {}) => {
  const response = await api.get("/api/authors", {
    params: { search },
  });
  return response.data;
};

export const createAuthor = async (authorData) => {
  const response = await api.post("/api/authors", authorData);
  return response.data;
};

export const updateAuthor = async (id, authorData) => {
  const response = await api.put(`/api/authors/${id}`, authorData);
  return response.data;
};

export const deleteAuthor = async (id) => {
  const response = await api.delete(`/api/authors/${id}`);
  return response.data;
};