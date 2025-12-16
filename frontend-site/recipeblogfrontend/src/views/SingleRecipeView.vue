<script>
    // import RecipeDetailsTable from "../components/RecipeDetailsTable.vue";
    // export default{
    //     components: (RecipeDetailsTable),
    //     data() {
    //         return {
    //             thisRecipe: {
    //                 RecipeID:"",
    //                 Title:"",
    //                 Content:"",
    //                 Image:""
    //             }
    //         }
    //     },
    //     props: {
    //         seekID:{
    //             type:String,
    //             require:true
    //         }
    //     },
    //     async created() {
    //         this.thisRecipe = await (await fetch(`http://localhost:9000/recipes${seekID}`))
    //     }
    // }
//     <template>
//     <table class="table table-striped">
//         <tr>
//             <td>Recipe Name</td>
//             <td>{{ item.Title }}</td>
//         </tr>
//         <tr>
//             <td>Recipe content</td>
//             <td>{{ item.Content }}</td>
//         </tr>
//         <tr>
//             <td>Recipe image</td>
//             <td>{{ item.Image }}</td>
//         </tr>
//     </table>
// </template> 
import { getRecipeById } from '../api/Recipes';
import RecipeDetailsTable from '../components/RecipeDetailsTable.vue';  

export default {
  name: "SingleRecipeView",

  components: {
    RecipeDetailsTable,
  },

  data() {
    return {
      recipes: null,
      loading: false,
      error: null,
    };
  },

  async created() {
    try {
      this.loading = true;

      const id = this.$route.params.RecipeID;
      const response = await getRecipeById(id);

      this.recipe = response.data;

      console.log("Single recipe:", this.recipe);
    } catch (err) {
      this.error = err;
      console.error("Failed to load recipe", err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
<template>
    <main>
        <p v-if="loading">Loading...</p>
        <p v-if="error">Error loading recipe</p>

    <RecipeDetailsTable v-if="recipe" :item="recipe" />
    </main>
</template>

