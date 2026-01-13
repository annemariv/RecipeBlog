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
  <div class="recipe-grid">
    <div v-for="item in items" :key="item.RecipeID" class="recipe-card">
      <div class="card-header">
        <span class="recipe-id">#{{ item.RecipeID }}</span>
        <h3 class="recipe-title">{{ item.Title }}</h3>
      </div>
      
      <div class="card-actions">
        <router-link :to="`/recipes/${item.RecipeID}`" class="btn view-btn">
          View Recipe
        </router-link>
        
        <router-link :to="`/recipe/edit/${item.RecipeID}`" class="btn edit-btn">
          Edit
        </router-link>
        
        <button @click="handleDelete(item.RecipeID)" class="btn delete-btn">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 1. The Grid Container */
.recipe-grid {
  display: grid;
  /* This creates as many cards as fit, at least 300px wide each */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

/* 2. The Individual Card */
.recipe-card {
  background-color: #fefae0; /* Light cream */
  border: 1px solid #d4a373; /* Light brown border */
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: left; /* Keep text to the left */
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(127, 85, 57, 0.2);
}

/* 3. Typography */
.recipe-id {
  color: #bc6c25;
  font-size: 0.8rem;
  font-weight: bold;
}

.recipe-title {
  margin: 10px 0;
  color: #606c38; /* Earthy green for titles */
  font-size: 1.25rem;
}

/* 4. Action Buttons Container */
.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
  border-top: 1px solid #e9edc9;
  padding-top: 15px;
}

/* 5. Generic Button Styles */
.btn {
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.8;
}

/* 6. Specific Button Colors */
.view-btn { background-color: #ccd5ae; color: #606c38; }
.edit-btn { background-color: #d4a373; color: white; }
.delete-btn { background-color: #bc6c25; color: white; }
</style>