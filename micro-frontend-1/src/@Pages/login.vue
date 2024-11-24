<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
      <p v-if="error" class="text-red-600 text-sm mt-4">{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../@Stores/authStore';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const authStore = useAuthStore();
    const email = ref('');
    const password = ref('');
    const error = ref<string | null>(null);
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await authStore.login(email.value, password.value);
        error.value = null;
        router.push('/');
      } catch (e: any) {
        error.value = e.message || 'Login failed. Please check your credentials.';
      }
    };

    return {
      email,
      password,
      error,
      handleSubmit,
    };
  },
};
</script>

<style scoped>

</style>
