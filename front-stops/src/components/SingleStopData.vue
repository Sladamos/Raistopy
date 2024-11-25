<template>
    <div class="bg-white p-4 rounded-lg shadow-md mb-4">
      <div class="flex items-center">
        <h2 class="text-xl font-semibold text-gray-800">
          {{ stop.name }}
          <span v-if="stop.subname" class="text-sm text-gray-600 ml-2">- {{ stop.subname }}</span>
        </h2>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    name: 'SingleStopData',
    props: {
      stop: {
        type: Object as PropType<{ id: string; name: string; subname: string | null }>,
        required: true,
      },
    },
  });
  </script>
  