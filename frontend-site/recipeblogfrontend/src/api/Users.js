import axios from "axios";

const API_URL = "http://localhost:9000/users";

export const getAllUsers = () => axios.get(API_URL);
export const getUserById = (id) => axios.get(`${API_URL}/${id}`);
export const signUpUser = (userData) => axios.post(API_URL, userData);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
