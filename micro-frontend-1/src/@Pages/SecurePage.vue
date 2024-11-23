<template>
  <div class="h-full w-full" :class="auth.is_authorized ? 'bg-green-100' : 'bg-red-100'">
    <div v-if="auth.is_authorized">
      Secure content available
    </div>
    <div v-else>Page is available for unauthorized users. Please authorize first.</div>
  </div>
</template>

<script setup lang="ts">
import authStore from "@/@Stores/authStore";

const auth = authStore.useAuthStore();
</script>

<style scoped></style>
