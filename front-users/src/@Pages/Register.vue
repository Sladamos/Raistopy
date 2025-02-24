<template>
  <div class="register">
    <div class="register__container">
      <h2 class="register__title">Register</h2>
      <form @submit.prevent="handleSubmit" class="register__form">
        <div class="register__field">
          <label for="email" class="register__label">Email</label>
          <input
              type="email"
              id="email"
              v-model="email"
              required
              class="register__input"
          />
        </div>
        <div class="register__field">
          <label for="password" class="register__label">Password</label>
          <input
              type="password"
              id="password"
              v-model="password"
              required
              class="register__input"
          />
        </div>
        <div class="register__field">
          <label for="passwordConfirm" class="register__label">Confirm Password</label>
          <input
              type="password"
              id="passwordConfirm"
              v-model="passwordConfirm"
              required
              class="register__input"
          />
        </div>
        <button type="submit" class="register__button">Register</button>
      </form>
      <p v-if="error" class="register__error">{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/@Stores/authStore';
import { useRouter } from 'vue-router';

export default {
  name: 'Register',
  setup() {
    const authStore = useAuthStore();
    const email = ref('');
    const password = ref('');
    const passwordConfirm = ref('');
    const error = ref<string | null>(null);
    const router = useRouter();

    const handleSubmit = async () => {
      if (password.value !== passwordConfirm.value) {
        error.value = "Passwords don't match";
        return;
      }

      try {
        await authStore.signup(crypto.randomUUID(), email.value, password.value, passwordConfirm.value);
        error.value = null;
        router.push('/login');
      } catch (e: any) {
        error.value = e.message || 'An error occurred during registration';
      }
    };

    return {
      email,
      password,
      passwordConfirm,
      error,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9fafb;
}

.register__container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.register__title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #374151;
  margin-bottom: 1.5rem;
}

.register__form {
  display: flex;
  flex-direction: column;
}

.register__field {
  margin-bottom: 1rem;
}

.register__label {
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
  display: block;
}

.register__input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  box-sizing: border-box;
}

.register__button {
  padding: 0.75rem;
  background-color: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.register__button:hover {
  background-color: #4338ca;
}

.register__error {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 1rem;
  text-align: center;
}
</style>
