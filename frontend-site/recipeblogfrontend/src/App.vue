<script setup>
import {RouterLink, RouterView} from "vue-router";
<<<<<<< HEAD
import Navbar from "./components/Navbar.vue";
import AppFooter from "./components/AppFooter.vue";
=======
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

>>>>>>> #441928-admin-and-user-login
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <Navbar />

    <main class="flex-grow-1 pt-5 mt-4">
      <div class="container mt-3">
        <router-view />
      </div>
    </main>

    <AppFooter />
  </div>
=======
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
>>>>>>> #441928-admin-and-user-login
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
</style>