<script>
  import { deleteRecipe } from '../api/Recipes';

export default {
  name: "RecipeTable",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
      async handleDelete(id) {
        try {
          await deleteRecipe(id);
          this.$emit("deleted", id);
        } catch (err) {
          console.error("Failed to delete recipe", err)
        }
      }
    }
};
</script>

<template>
  <div class="container my-5">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      
      <div v-for="item in items" :key="item.RecipeID" class="col">
        <div class="card h-100 shadow-sm border-0" style="background-color: #fefae0;">
          <img class="card-img-top" src="https://via.placeholder.com/300x180?text=Recipe+Image" alt="Recipe image">
          
          <div class="card-body d-flex flex-column">
            <span class="recipe-id text-uppercase fw-bold" style="color: #bc6c25; font-size: 0.75rem;">
              ID: #{{ item.RecipeID }}
            </span>
            <h5 class="card-title fw-bold mt-1" style="color: #606c38;">{{ item.Title }}</h5>
            
            <p class="card-text text-muted small flex-grow-1">
             Take a look at this {{ item.Title }} recipe.
            </p>

            <div class="d-flex flex-wrap gap-2 mt-3 pt-3 border-top">
              <router-link :to="`/recipes/${item.RecipeID}`" class="btn btn-sm text-white" style="background-color: #606c38;">
                View
              </router-link>
              
              <router-link :to="`/recipe/edit/${item.RecipeID}`" class="btn btn-sm text-white" style="background-color: #d4a373;">
                Edit
              </router-link>
              
              <button @click="handleDelete(item.RecipeID)" class="btn btn-sm text-white" style="background-color: #bc6c25;">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<style scoped>
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(127, 85, 57, 0.15) !important;
}

.card-img-top {
  height: 180px;
  object-fit: cover; 
  border-top-left-radius: calc(0.375rem - 1px);
  border-top-right-radius: calc(0.375rem - 1px);
}
</style>