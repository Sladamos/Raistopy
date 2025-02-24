<template>
  <div class="login">
    <div class="login__container">
      <h2 class="login__title">Login</h2>
      <form @submit.prevent="handleSubmit" class="login__form">
        <div class="login__field">
          <label for="email" class="login__label">Email</label>
          <input
              type="email"
              id="email"
              v-model="email"
              required
              class="login__input"
          />
        </div>
        <div class="login__field">
          <label for="password" class="login__label">Password</label>
          <input
              type="password"
              id="password"
              v-model="password"
              required
              class="login__input"
          />
        </div>
        <button type="submit" class="login__button">Login</button>
      </form>
      <p id="error-message" v-if="error" class="login__error">{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/@Stores/authStore';
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
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9fafb;
}

.login__container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login__title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #374151;
  margin-bottom: 1.5rem;
}

.login__form {
  display: flex;
  flex-direction: column;
}

.login__field {
  margin-bottom: 1rem;
}

.login__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  display: block;
  margin-bottom: 0.5rem;
}

.login__input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  box-sizing: border-box;
}

.login__button {
  background-color: #4f46e5;
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login__button:hover {
  background-color: #4338ca;
}

.login__error {
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;
}
</style>
