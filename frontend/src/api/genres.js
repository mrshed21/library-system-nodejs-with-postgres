import api from './axios';



export const fetchGenres = async () => {
  const response = await api.get('/api/genres');
  return response.data;
}