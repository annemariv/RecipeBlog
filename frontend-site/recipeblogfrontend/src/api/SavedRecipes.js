import axios from "axios";

axios.get("http://localhost:9000/savedrecipes", { withCredentials: true });
const api = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: true,
});

export const getAllSavedRecipes = () => {
  return api.get("/savedrecipes");
};

export const getSavedRecipeById = (id) => {
  return api.get(`/savedrecipes/${id}`);
};

export const createSavedRecipe = (recipeData) => {
  return api.post("/savedrecipes", recipeData);
};

export const deleteSavedRecipe = (SavedRecipeID) => {
  return api.delete(`/savedrecipes/${SavedRecipeID}`);
};
