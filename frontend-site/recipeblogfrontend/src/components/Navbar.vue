<script setup>
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
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top shadow" style="background-color: #7f5539;">
    <div class="container">
      <router-link to="/" class="navbar-brand fw-bold fs-3">
        Recipe<span style="color: #ede0d4;">App</span>
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav ms-auto align-items-center">
          <router-link to="/" class="nav-link px-3 text-white">Home</router-link>
          <router-link to="/about" class="nav-link px-3 text-white">About</router-link>
          <router-link to="/recipes" class="nav-link px-3 text-white">Recipes</router-link>
          
          <span v-if="!isLoggedIn()">
             <router-link to="/signup" class="btn btn-sm ms-lg-3 px-4 py-2 fw-bold text-white shadow-sm" 
              style="background-color: #b08968; border-radius: 8px;">
              Sign Up
          </router-link>
          </span>
          <span v-if="!isLoggedIn()">
            <router-link class="btn btn-sm ms-lg-3 px-4 py-2 fw-bold text-white shadow-sm"  style="background-color: #b08968; border-radius: 8px;" to="/login">Log In</router-link>
          </span>
            <span v-else>
              <button class="btn btn-sm ms-lg-3 px-4 py-2 fw-bold text-white shadow-sm"  style="background-color: #b08968; border-radius: 8px;" @click="logout">Log Out</button>
            </span>
        </div>
      </div>
    </div>
  </nav>
</template>

