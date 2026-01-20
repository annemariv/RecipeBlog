import axios from "axios";

const API_URL = "http://localhost:9000/recipes";
const getLoggedInUserId = () => localStorage.getItem("LoggedInUserID");

//all users
export const getAllRecipes = () => axios.get(API_URL);
export const getRecipeById = (id) => axios.get(`${API_URL}/${id}`);

//admin only
export const createRecipe = (recipeData) => axios.post(API_URL, recipeData, {
  headers: { "x-user-id": getLoggedInUserId() }
});

export const updateRecipe = (id, recipeData) => axios.put(`${API_URL}/${id}`, recipeData, {
  headers: { "x-user-id": getLoggedInUserId() }
});

export const deleteRecipe = (id) => axios.delete(`${API_URL}/${id}`, {
  headers: { "x-user-id": getLoggedInUserId() }
});
