<!-- <script>
    // import { getAllRecipes } from "../api/Recipes";
    import RecipeTable from "../components/RecipeTable.vue"
    export default {
        components: {
            RecipeTable
        },
        data() {
            return {
            allRecipes: []
            }
        },
        async created() {
            this.allRecipes = await (await fetch("http://localhost:9000/recipes")).json()
        }
    }
</script>
<template>
    <main>
        <RecipeTable :items="allRecipes" /> 
    </main>
</template>    -->
<script>
import { getAllRecipes } from "../api/Recipes";
import RecipeTable from "../components/RecipeTable.vue";
import RecipeCard from "@/components/RecipeCard.vue";


export default {
  name: "RecipeView",

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

  async created() {
    try {
      this.loading = true;

      const response = await getAllRecipes();
      this.recipes = response.data;

      console.log("Recipes from API:", this.recipes);
    } catch (err) {
      this.error = err;
      console.error("Failed to load recipes", err);
    } finally {
      this.loading = false;
    }
  },
  //delete
  methods: {
     removeRecipe(id) {
    this.recipes = this.recipes.filter(recipe => recipe.RecipeID !== id);
    },
  },
  //create
  methods: {
    createRecipe(recipeData) {
      this.recipes.push(recipeData);
    },
  },
};
</script>

<template>
  <main>
    <h1 class="Title">Recipes</h1>

    <p v-if="loading">Loading...</p>
    <p v-if="error">Error loading recipes</p>

    <RecipeCard 
    v-if="recipes.length"
    :items="recipes"
    @deleted="removeRecipe" />
    <p v-else>No recipes found</p>
    <div>
      <router-link to="/recipe/create">
        <button class="create-btn">Create New Recipe</button>
      </router-link>
    </div>
    
  </main>
</template>
<style>
.create-btn {
  position: fixed;
  margin: 16px;
  right: 24px;
  top: 100px;
  font-size: 20px;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}
.Title {
  padding: 8px 12px;
  text-align: left;
  margin: 16px;
  left: 24px;
  color: #7f5539;
}
</style>

