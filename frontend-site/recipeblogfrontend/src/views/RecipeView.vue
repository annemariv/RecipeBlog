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
  <main class="container mt-5 pt-3">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="m-0">Recipes</h1>
      
      <router-link to="/recipe/create">
        <button class="btn btn-success">Create New Recipe</button>
      </router-link>
    </div>

    <p v-if="loading">Loading...</p>
    <p v-if="error">Error loading recipes</p>

    <RecipeCard 
      v-if="recipes.length"
      :items="recipes"
      @deleted="removeRecipe" 
    />
    <p v-else-if="!loading">No recipes found</p>
  </main>
</template>
