import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const api = {
  getExpenses: () => axios.get(`${API_URL}/gastos`),
  createExpense: (data) => axios.post(`${API_URL}/gastos`, data),
  deleteExpense: (id) => axios.delete(`${API_URL}/gastos/${id}`),
  loginCheck: (username) => axios.get(`${API_URL}/usuarios?username=${username}`)
};