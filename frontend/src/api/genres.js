import api from './axios';

export const getAllGenres = async () => {
  const response = await api.get('/api/genres');
  return response.data;
};

export const createGenre = async (genreData) => {
  const response = await api.post('/api/genres', genreData);
  return response.data;
};

export const updateGenre = async (id, genreData) => {
  const response = await api.put(`/api/genres/${id}`, genreData);
  return response.data;
};

export const deleteGenre = async (id) => {
  const response = await api.delete(`/api/genres/${id}`);
  return response.data;
};