import api from "./axios";

export const getAllAuthors = async ({search} = {}) => {
  const response = await api.get("/api/authors", {
    params: { search },
  });
  return response.data;
}