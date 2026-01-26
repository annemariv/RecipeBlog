<script setup>
import {RouterLink, RouterView} from "vue-router";
import Navbar from "./components/Navbar.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <Navbar />
    <main class="flex-grow-1 pt-5 mt-4 pb-5">
      <div class="container mt-3">
        <router-view />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style>
body {
  background-color: #ede0d4; 
  color: #7f5539; 
  margin: 0;
}

a {
  text-decoration: none;
}
.PageTitle {
  color: #7f5539;
  font-weight: bold;
}
.navbar-nav .nav-link:hover {
  color: #b08968 !important; 
  transition: color 0.2s ease-in-out;
}
</style>