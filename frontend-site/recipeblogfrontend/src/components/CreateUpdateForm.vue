<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createRecipe, getRecipeById, updateRecipe } from '@/api/Recipes'

const route = useRoute()
const router = useRouter()

// id exists for edit, undefined for create
const id = route.params.RecipeID

const form = reactive({
  Title: '',
  Content: '',
  images: []
})

const newImages = ref([])

// Load existing data when editing
const loadRecipe = async () => {
  if (id) {
    const { data } = await getRecipeById(id)
    form.Title = data.Title || ''
    form.Content = data.Content || ''
    form.images = data.images || []
  }
}

onMounted(loadRecipe)

// Optional: if route param changes without remount
watch(() => route.params.RecipeID, loadRecipe)

// Input handlers
const handleChange = (e) => {
  const { name, value } = e.target
  form[name] = value
}

const handleImageChange = (e) => {
  newImages.value = Array.from(e.target.files)
}

// Submit handler
const handleSubmit = async (e) => {
  e.preventDefault()

  const payload = {
  Title: form.Title,
  Content: form.Content,
  Image: null // or URL if you have one
}

  try {
   if (id) {
  await updateRecipe(id, payload)
} else {
  await createRecipe(payload)
}
    router.push('/recipes')
  } catch (err) {
    console.error('Error saving recipe:', err)
  }
}
</script>

<template>
  <main>
    <h1 class="PageTitle text-center">{{ id ? 'Edit Recipe' : 'Add a New Recipe' }}</h1>

    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          
          <div class="p-4 p-md-5 bg-white">
            <form @submit.prevent="handleSubmit">
              
              <div class="mb-4">
                <label class="form-label fw-bold small text-uppercase" style="color: #7f5539;">
                  Recipe Title
                </label>
                <input
                  type="text"
                  class="form-control form-control-lg border-0 rounded-3 shadow-sm custom-input"
                  name="Recipe_Title"
                  v-model="form.Title"
                  placeholder="Enter recipe title"
                  required
                />
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold small text-uppercase" style="color: #7f5539;">
                  Content and Instructions
                </label>
                <textarea
                  class="form-control border-0 rounded-3 shadow-sm custom-input"
                  name="Content"
                  v-model="form.Content"
                  rows="8"
                  placeholder="Share your cooking steps..."
                  required
                ></textarea>
              </div>

              <div class="mb-5">
                <label class="form-label fw-bold small text-uppercase" style="color: #7f5539;">
                  Upload Image
                </label>
                <input
                  type="file"
                  class="form-control border-0 shadow-sm custom-input"
                  accept="image/*"
                  @change="handleImageChange"
                />
              </div>

              <div class="d-flex gap-3">
                <button 
                  type="submit" 
                   class="btn btn-outline-light px-4 rounded-pill" 
                   style="background-color: #606c38;"
                >
                  {{ id ? 'Update Recipe' : 'Publish Recipe' }}
                </button>

                <button
                  type="button"
                  class="btn btn-light px-4 rounded-pill"
                  @click="router.push('/recipes')"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.custom-input {
  background-color: #fcfaf9;
}

.custom-input:focus {
  background-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(96, 108, 56, 0.15) !important; 
}

textarea {
  resize: vertical;
}
</style>