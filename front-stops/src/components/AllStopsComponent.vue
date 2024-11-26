<template>
  <div class="container">
    <h1 class="title">All Stops</h1>
    <div v-if="stops && stops.length" class="grid">
      <SingleStopData
        v-for="stop in stops"
        :key="stop.id"
        :stop="stop"
        @open-stop-details="openStopDetails"/>
    </div>
    <div v-else class="no-stops">
      <p>No stops available.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SingleStopData from './SingleStopDataComponent.vue';

export default defineComponent({
  name: 'AllStopsComponent',
  components: { SingleStopData },
  props: {
    stops: {
      type: Array as () => { id: string, name: string, subname: string | null }[],
      required: true,
    },
  },
  setup(props, { emit }) {
    const openStopDetails = (stop: any) => {
      emit('open-stop-details', stop);
    };
    const stops = computed(() => props.stops);

    return {
      stops,
      openStopDetails
    };
  },
});
</script>

<style scoped>
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
