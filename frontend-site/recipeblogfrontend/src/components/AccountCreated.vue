<template>
  <div style="text-align:center; margin-top:50px;">
    <h1>Account is created successfully!</h1>
    <button  class="btn btn-outline-light px-4 rounded-pill" style="background-color: #606c38;" @click="$router.push('/login')">Go and log in!</button>
  </div>
</template>

<script>
export default {
  name: "AccountCreated"
};
</script>
