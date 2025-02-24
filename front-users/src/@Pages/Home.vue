<template>
  <div class="home__container">
    <div class="home__card">
      <h2 class="home__title">Welcome to the Home Page</h2>
      <div id="welcome-message" v-if="isLoggedIn" class="home__message-wrapper">
        <p v-if="user && user.email" class="home__message">
          Welcome, {{ user.email }}!
        </p>
        <button
            @click="handleLogout"
            class="home__logout-button">
          Logout
        </button>
      </div>

      <div v-else class="home__message-wrapper">
        <p class="home__message">You are not authenticated.</p>
        <router-link to="/login" class="home__link home__link--login">
          Login
        </router-link>
        <p class="home__register-text">Don't have an account?
          <router-link to="/register" class="home__link home__link--register">
            Register
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useAuthStore } from '@/@Stores/authStore';
import { useToast } from 'vue-toast-notification';

export default defineComponent({
  name: 'Home',
  setup() {
    const authStore = useAuthStore();
    const toast = useToast();
    const isLoggedIn = computed(() => authStore.isLoggedIn);
    const user = authStore.user;

    onMounted(() => {
      toast.success('Welcome to the Home Page!', { duration: 2000, position: 'top-right' });
      toast.success('Logged users can add bus stops to favorites', { duration: 2000, position: 'top-right' });
    });

    const handleLogout = () => {
      authStore.logout();
      window.location.reload();
    };

    return { isLoggedIn, user, handleLogout };
  },
});
</script>

<style scoped>
.home__container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9fafb;
}

.home__card {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 400px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.home__title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #374151;
}

.home__message-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

.home__message {
  font-size: 1.125rem;
  font-weight: 500;
  color: #374151;
}

.home__logout-button {
  width: 100%;
  padding: 12px;
  color: #ffffff;
  background-color: #dc2626;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.home__logout-button:hover {
  background-color: #b91c1c;
}

.home__link {
  font-weight: 500;
  text-decoration: none;
}

.home__link--login {
  color: #4f46e5;
}

.home__link:hover {
  text-decoration: underline;
}

.home__register-text {
  font-size: 1rem;
  color: #374151;
}

.home__link--register {
  color: #4f46e5;
}
</style>
