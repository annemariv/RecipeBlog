<template>
  <div style="text-align:center; margin-top:50px;">
    <h1>Successfully logged in!</h1>
    <button class="btn btn-success py-2 fw-bold rounded-3 border-0" @click="$router.push('/recipes')">View Recipes</button>
  </div>
</template>

<script>
export default {
  name: "AccountLogedIn"
};
</script>
