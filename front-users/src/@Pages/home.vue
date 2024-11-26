<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-700 mb-6">Welcome to the Home Page</h2>

      <div v-if="isLoggedIn" class="text-center">
        <p v-if="user && user.email" class="text-lg font-medium text-gray-700">
            Welcome, {{ user.email }}!
        </p>
        <button
          @click="logout"
          class="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          Logout
        </button>
      </div>

      <div v-else class="text-center">
        <p class="text-lg font-medium text-gray-700">You are not authenticated.</p>
        <router-link
          to="/login"
          class="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
          Login
        </router-link>
        <p class="mt-2">Don't have an account? <router-link to="/register" class="text-indigo-600 hover:text-indigo-800">Register</router-link></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '../@Stores/authStore';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  setup() {
    const authStore = useAuthStore();
    
    const isLoggedIn = computed(() => authStore.isLoggedIn);
    const user = authStore.user;

    const logout = () => {
      authStore.logout();
      window.location.reload();
    };

    return {
      isLoggedIn,
      user,
      logout
    };
  },
});
</script>

<style scoped>

</style>
