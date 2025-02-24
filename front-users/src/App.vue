<template>
  <header class="main__container">
    <h1 class="main__title">Super Bus Stop Application</h1>
    <nav class="main__nav">
      <RouterLink to="/" class="nav__link">Home</RouterLink>
      <RouterLink to="/stops" class="nav__link">Stops</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/userStops" class="nav__link">Favourites</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/register" class="nav__link">Register</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/login" class="nav__link">Login</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/logout" class="nav__link">Logout</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { useAuthStore } from './@Stores/authStore';

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
</script>

<style scoped>
.main__container {
  background-color: #f9fafb;
  color: #1f2937;
  padding: 24px;
}

.main__title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
}

.main__nav {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.nav__link {
  display: inline-block;
  padding: 8px 16px;
  text-align: center;
  color: white;
  background-color: #4f46e5;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;
}

.nav__link:hover {
  background-color: #4338ca;
}

.nav__link:active {
  background-color: #3730a3;
}
</style>
