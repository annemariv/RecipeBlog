<script setup>
import {RouterLink, RouterView} from "vue-router";
import { useRouter } from "vue-router";
const router = useRouter();

const logout = () => {
  localStorage.removeItem("LoggedInUserID");
  localStorage.removeItem("isAdmin");
  
  window.location.reload();
  router.push("/");
};

// read login state from localStorage
const isLoggedIn = () => !!localStorage.getItem("LoggedInUserID");

</script>
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <router-link to="/recipes">Recipes</router-link>
    <router-link to="/signup">Sign Up</router-link>

    <span v-if="!isLoggedIn()">
      <router-link to="/login">Log In</router-link>
    </span>
    <span v-else>
      <button @click="logout">Log Out</button>
    </span>

  </nav>
  
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
