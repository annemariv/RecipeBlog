<!-- <script>
    export default {
        name: "RecipeDetailsTable",
            props: {   
                item: {
                RecipeID: "",
                Title:"",
                Content:"",
                Image: "",
            }

        }
    }
</script>
<template>
    <table class="table table-striped">
        <tr>
            <td>Recipe Name</td>
            <td>{{ item.Title }}</td>
        </tr>
        <tr>
            <td>Recipe content</td>
            <td>{{ item.Content }}</td>
        </tr>
        <tr>
            <td>Recipe image</td>
            <td>{{ item.Image }}</td>
        </tr>
    </table>
</template> -->
<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        
        <div class="card border-0 shadow-lg rounded-4 overflow-hidden mb-4">
          <div class="row g-0">
            <div class="col-md-5">
              <img 
                :src="item.Image || 'https://i.pinimg.com/736x/53/e1/b1/53e1b140cfe86a0f7b288ef7f9ba7b16.jpg'" 
                class="img-fluid h-100 w-100" 
                style="object-fit: cover; min-height: 350px;"
                alt="Recipe Photo"
              />
            </div>

            <div class="col-md-7 d-flex align-items-center bg-white">
              <div class="p-4 p-md-5 w-100">
                <nav aria-label="breadcrumb" class="mb-2">
                  <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><router-link to="/recipes" class="text-decoration-none" style="color: #b08968;">Recipes</router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">Details</li>
                  </ol>
                </nav>

                <h1 class="display-4 fw-bold mb-3" style="color: #7f5539;">{{ item.Title }}</h1>
                
                
              </div>
            </div>
          </div>
        </div>

        <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          <h3 class="fw-bold mb-4 pb-2 border-bottom" style="color: #7f5539;">
            Preperation and Ingredients
          </h3>
          
          <div class="recipe-content-text">
            {{ item.Content }}
          </div>
        </div>

        <div class="mt-4 d-flex gap-2">
          <router-link :to="`/recipe/edit/${item.RecipeID}`" class="btn btn-outline-dark px-4 rounded-pill">
            Edit Recipe
          </router-link>
          <button @click="$router.push('/recipes')" class="btn btn-light px-4 rounded-pill">
            Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeDetails",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.recipe-content-text {
  white-space: pre-wrap; 
  font-size: 1.15rem;
  line-height: 1.8;
  color: #5a5a5a;
}
</style>