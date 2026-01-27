<script>
import { getAllSavedRecipes } from "../api/SavedRecipes";
import RecipeTable from "../components/RecipeTable.vue";
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  name: "SavedRecipesView",

  components: {
    RecipeCard,
  },

  data() {
    return {
      recipes: [],
      loading: false,
      error: null,
    };
  },

  computed: {
    isAdmin() {
      return localStorage.getItem("isAdmin") === "true";
    }
  },

  async created() {
    try {
      this.loading = true;
      const response = await getAllSavedRecipes();
      this.recipes = response.data;
    } catch (err) {
      this.error = err;
      console.error(err);
    } finally {
      this.loading = false;
    }
  },

  methods: {
    removeRecipe(id) {
      this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    }
  }
};
</script>

<template>
  <main>
    <h1 class="PageTitle">Saved Recipes</h1>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Error loading recipes</p>
    <p v-else-if="!recipes.length">No recipes found</p>
    <RecipeCard
      v-else-if="recipes.length"
      :items="recipes"
      @deleted="removeRecipe"
    />

    <div v-if="isAdmin">
      <router-link to="/recipe/create">
        <button class="btn btn-success">Create New Recipe</button>
      </router-link>
    </div>
  </main>
</template>
