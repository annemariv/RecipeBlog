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
  <div class="container mt-4">
    <h2>{{ id ? 'Edit recipe' : 'Add a new recipe' }}</h2>

    <form @submit="handleSubmit">
      <div class="mb-3">
        <label>Recipe title</label>
        <input
          type="text"
          class="form-control"
          name="Recipe_Title"
          v-model="form.Title"
          required
        />
      </div>

      <div class="mb-3">
        <label>Content</label>
        <input
          type="text"
          class="form-control"
          name="Content"
          v-model="form.Content"
        />
      </div>

      <div class="mb-3">
        <label>Upload Images</label>
        <input
          type="file"
          class="form-control"
          multiple
          accept="image/*"
          @change="handleImageChange"
        />
      </div>

      <button type="submit" class="btn-add">
        {{ id ? 'Update recipe' : 'Add recipe' }}
      </button>

      <button
        type="button"
        class="btn-cancel"
        @click="router.push('/recipes')"
      >
        {{ id ? 'Cancel' : 'Back' }}
      </button>
    </form>
  </div>
</template>
