<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div v-if="stopDetails" class="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
      <component :is="StopDetailsComponent" :stop="stopDetails" @close="close" />
    </div>
    <div v-else class="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md text-center text-gray-700">
      <h2 class="text-2xl font-bold">Stop Details Not Available</h2>
      <p class="mt-4">We couldn't find the details for the selected stop. Please try again later.</p>
      <button @click="close" class="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
        Go Back
      </button>
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

</style>
