<script setup>
import {RouterLink, RouterView} from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/AppFooter.vue"; 
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <navbar/>
  <router-view/>
  <app-footer/>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: #ede0d4; /* Match your sign-up card color */
  color: #7f5539; /* Makes all text white by default */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
