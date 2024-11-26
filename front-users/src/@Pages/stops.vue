<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-50">
        <component :is="AllStopsComponent" :stopsStore="stopsStore" />
    </div>
  </template>
  
  <script lang="ts">
  import { useStopsStore } from '../@Stores/stopsStore';
  import { defineComponent } from 'vue';
  
  const AllStopsComponent = defineAsyncComponent(() => import('front-stops/AllStopsComponent'));
  
  export default defineComponent({
    name: 'Stops',
    setup() {
      const stopsStore = useStopsStore();
      
      onMounted(async () => {
        try {
          await stopsStore.getStops();
        } catch (e: any) {
          console.error('Get stops failed:', e);
        }
      });
  
      return {
        AllStopsComponent: AllStopsComponent,
        stopsStore
      };
    },
  });
  </script>
  
  <style scoped>
  
  </style>
  