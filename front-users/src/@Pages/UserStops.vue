<template>
    <div>
        <component :is="AllStopsComponent"
        :title="'Favourite stops'"
        :stops="stops"
        :show-button="() => true"
        :buttonTitle="'Delete'"
        @on-button-clicked="onButtonClicked"
        @open-stop-details="openStopDetails"/>
    </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/@Stores/authStore';
import { useStopsStore } from '@/@Stores/stopsStore';
import { defineComponent } from 'vue';

const AllStopsComponent = defineAsyncComponent(() => import('front-stops/AllStopsComponent'));

export default defineComponent({
  name: 'UserStops',
  setup() {
    const stopsStore = useStopsStore();
    const authStore = useAuthStore();
    const router = useRouter();
    const stops = computed(() => stopsStore.userStops);
    const openStopDetails = (stop: any) => {
      router.push(`/stops/${stop._id}`);
    };
    const onButtonClicked = (stop: any) => {
      stopsStore.deleteUserStop(authStore.getUserId(), stop._id)
    }

    onMounted(async () => {
      try {
        if (!stops.value || !stops.value.length) {
          await stopsStore.getUserStops(authStore.getUserId());
        }
      } catch (e: any) {
        console.error('Get stops failed:', e);
      }
    });

    return {
      AllStopsComponent: AllStopsComponent,
      stops,
      openStopDetails,
      onButtonClicked
    };
  },
});
</script>

<style scoped>

</style>
