<template>
  <div class="auth-container">
    <h2>Logging Out...</h2>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import authService from '@/@Services/authService';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../@Stores/authStore';

export default {
  name: 'Logout',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    onMounted(async () => {
      try {
        authStore.logout();
        router.push('/');
      } catch (e: any) {
        console.error('Logout failed:', e);
      }
    });

    return {};
  },
};
</script>

<style scoped>
.auth-container {
  width: 300px;
  margin: 0 auto;
  text-align: center;
}
</style>
