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


export default {
  name: "RecipeView",

  components: {
    RecipeTable,
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
};
</script>

<template>
  <main>
    <h1>Recipes</h1>

    <p v-if="loading">Loading...</p>
    <p v-if="error">Error loading recipes</p>

    <RecipeTable 
    v-if="recipes.length"
    :items="recipes"
    @deleted="removeRecipe" />
    <p v-else>No recipes found</p>
    
  </main>
</template>

