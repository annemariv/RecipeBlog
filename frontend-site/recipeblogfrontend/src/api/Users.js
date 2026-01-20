import axios from "axios";

const API_URL = "http://localhost:9000";

// users
export const getAllUsers = () => axios.get(`${API_URL}/users`);

export const getUserById = (id) => axios.get(`${API_URL}/users/${id}`);

export const signUpUser = (userData) => axios.post(`${API_URL}/users`, userData);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);

// sessions
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/sessions`, credentials); 
  return response.data;
};
