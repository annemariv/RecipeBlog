import axios from "axios";

const API_URL = "http://localhost:9000/recipes";

export const getAllRecipes = () => axios.get(API_URL);
export const getRecipeById = (id) => axios.get(`${API_URL}/${id}`);
export const createRecipe = (recipeData) => axios.post(API_URL, recipeData);
export const updateRecipe = (id, recipeData) => axios.put(`${API_URL}/${id}`, recipeData);
export const deleteRecipe = (id) => axios.delete(`${API_URL}/${id}`);