<template>
  <div class="stops__container">
    <div v-if="stopDetails" class="stops__card">
      <component :is="StopDetailsComponent" :stop="stopDetails" @close="close" />
    </div>
    <div v-else class="stops__card stops__card--empty">
      <h2 class="stops__title">Stop Details Not Available</h2>
      <p>We couldn't find the details for the selected stop. Please try again later.</p>
      <button @click="close" class="stops__button">Go Back</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useStopsStore } from '@/@Stores/stopsStore';
import { defineComponent } from 'vue';

const StopDetailsComponent = defineAsyncComponent(() => import('front-stops/StopDetailsComponent'));

export default defineComponent({
  name: 'Stops',
  setup() {
    const stopsStore = useStopsStore();
    const router = useRouter();
    const route = useRoute();
    const stopId = route.params.id as string;
    const close = () => {
      router.push(`/stops`);
    };

    onMounted(async () => {
      await stopsStore.getStopDetails(stopId);
    });

    const stopDetails = computed(() => stopsStore.stopDetails);

    return {
      StopDetailsComponent: StopDetailsComponent,
      stopDetails,
      close
    };
  },
});
</script>

<style scoped>
.stops__container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9fafb;
}

.stops__card {
  width: 100%;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stops__card--empty {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #374151;
  padding: 2rem;
}

.stops__title {
  font-size: 1.5rem;
  font-weight: bold;
}

.stops__button {
  background-color: #4f46e5;
  color: #ffffff;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  padding: 1rem 2rem;
}

.stops__button:hover {
  background-color: #4338ca;
}
</style>
