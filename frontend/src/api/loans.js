import api from "./axios";

export const borrowBook = async (book_id) => {
  const response = await api.post("/api/user/loan", { book_id });
  return response.data;
};

export const fetchMyLoans = async () => {
  const response = await api.get("/api/user/loans");
  return response.data;
};

export const returnBook = async (loanId) => {
  const response = await api.put(`/api/user/loan/${loanId}`);
  return response.data;
};