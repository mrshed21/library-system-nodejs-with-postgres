import api from "./axios";

export const fetchAuthors = async ({search}) => {
  const response = await api.get("/api/authors", {
    params: {
      search,
    },
  });
  return response.data;
}