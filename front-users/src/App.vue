<template>
  <div class="bg-gray-50 text-gray-800 p-6">
    <h1 class="text-2xl font-bold text-center mb-6">Super Bus Stop Application</h1>
    
    <ul class="flex justify-center space-x-6">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/stops" class="nav-link">Stops</RouterLink>
      <RouterLink to="/register" class="nav-link">Register</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/login" class="nav-link">Login</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/logout" class="nav-link">Logout</RouterLink>
    </ul>
  </div>
  
  <RouterView />
</template>

<script setup lang="ts">
import { useAuthStore } from './@Stores/authStore';

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
</script>
<style scoped>
/* Custom Tailwind class for navigation links */
.nav-link {
  @apply inline-block py-2 px-4 text-center text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out;
}

.nav-link:hover {
  @apply bg-indigo-700;
}

.nav-link:active {
  @apply bg-indigo-800;
}
</style>
