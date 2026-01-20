import axios from "axios";

const API_BASE = "http://localhost:9000";

// users
export const getAllUsers = () => axios.get(`${API_BASE}/users`);

export const getUserById = (id) => axios.get(`${API_BASE}/users/${id}`);

export const signUpUser = (userData) => axios.post(`${API_BASE}/users`, userData);

export const deleteUser = (id) => axios.delete(`${API_BASE}/users/${id}`);

// sessions
export const loginUser = (credentials) => axios.post(`${API_BASE}/sessions/login`, credentials);
