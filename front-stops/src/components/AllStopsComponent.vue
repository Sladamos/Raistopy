<template>
  <div class="container">
    <h1 class="title">All Stops</h1>
    <div v-if="stopsStore.stops && stopsStore.stops.length" class="grid">
      <SingleStopData
        v-for="stop in stopsStore.stops"
        :key="stop.id"
        :stop="stop"
      />
    </div>
    <div v-else class="no-stops">
      <p>No stops available.</p>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, computed } from 'vue';
import { StopsStore } from '../@Stores/stopsStore';
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


<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.title {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.no-stops {
  text-align: center;
  font-size: 18px;
  color: #777;
  margin-top: 30px;
}
</style>