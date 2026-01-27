<template>
  <div style="text-align:center; margin-top:50px;">
    <h1>Successfully logged in!</h1>
    <button  class="btn btn-outline-light px-4 rounded-pill" style="background-color: #606c38;" @click="$router.push('/recipes')">View Recipes</button>
  </div>
</template>

<script>
export default {
  name: "AccountLogedIn"
};
</script>
