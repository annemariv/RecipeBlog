<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">
        Recipe<span>App</span>
      </router-link>

      <div class="navbar-links">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/about" class="nav-item">About</router-link>
        <router-link to="/recipes" class="nav-item">Recipes</router-link>
        <router-link to="/signup" class="nav-btn">Sign Up</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  background-color: #7f5539;
  padding: 1rem 0;
  color: #e6ccb2;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  height: 2rem;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  color: #e6ccb2;
  letter-spacing: -1px;
}

.navbar-brand span {
  color: #7f5539; 
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 25px;
}

.nav-item {
  text-decoration: none;
  color: #e6ccb2;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: white;
}

.nav-btn {
  text-decoration: none;
  background-color: #b08968;
  color: #e6ccb2;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.2s, background-color 0.2s;
}

.nav-btn:hover {
  background-color: #ffffff;
  transform: translateY(-2px);
}
</style>