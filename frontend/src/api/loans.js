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

export const getAllLoans = async () => {
  const response = await api.get("/api/admin/loans");
  return response.data;
};

export const getLoanById = async (id) => {
  const response = await api.get(`/api/admin/loan/${id}`);
  return response.data;
};

// Admin: create a loan for any user
export const adminCreateLoan = async ({ user_id, book_id }) => {
  const response = await api.post("/api/admin/loan", { user_id, book_id });
  return response.data;
};

// Admin: return any loan
export const adminReturnLoan = async (loanId) => {
  const response = await api.put(`/api/admin/loan/${loanId}/return`);
  return response.data;
};