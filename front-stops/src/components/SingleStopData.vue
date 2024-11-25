<template>
  <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-800">
        {{ stop.name }}
        <span v-if="stop.subname" class="text-sm text-gray-600 ml-2">- {{ stop.subname }}</span>
      </h2>
    </div>
    <p class="mt-2 text-gray-500 text-sm">{{ stop.id }}</p>
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
  