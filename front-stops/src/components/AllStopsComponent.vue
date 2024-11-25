// Mikrofrontend: AllStopsComponent.vue
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-semibold text-center text-gray-800 mb-8">All Stops</h1>
    <div v-if="stopsStore.stops && stopsStore.stops.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SingleStopData
        v-for="stop in stopsStore.stops"
        :key="stop.id"
        :stop="stop"
      />
    </div>
    <div v-else class="text-center text-lg text-gray-500">
      <p>No stops available.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { StopsStore } from '../stores/stopsStore';
import SingleStopData from './SingleStopData.vue';

export default defineComponent({
  name: 'AllStopsComponent',
  components: { SingleStopData },
  props: {
    stopsStore: {
      type: Object as () => StopsStore,
      required: true,
    },
  },
  setup(props) {
    const stops = computed(() => props.stopsStore.stops);

    return {
      stops,
    };
  },
});
</script>