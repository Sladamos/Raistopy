<template>
  <div class="h-full w-full bg-green-200">
    <input
      class="m-1 cursor-pointer rounded-md bg-blue-300 p-1 hover:bg-blue-600 hover:text-white"
      type="button"
      value="Authorize Me"
      @click="authorize"
    />

    <span :class="auth.is_authorized ? 'text-green-600' : 'text-red-500'">{{
      auth.is_authorized
    }}</span>
  </div>
</template>

<script setup lang="ts">

import authStore from "@/@Stores/authStore";

const auth = authStore.useAuthStore();

function authorize() {
  auth.authenticate(!auth.is_authorized, uname); //either give direct value or invert it.
}
</script>

<style scoped></style>
