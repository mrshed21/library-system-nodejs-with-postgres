import api from './axios';

export const getAllGenres = async () => {
  const response = await api.get('/api/genres');
  return response.data;
}