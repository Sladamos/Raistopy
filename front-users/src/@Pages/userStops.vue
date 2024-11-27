<template>
    <div v-highlight="'pink'" class="flex justify-center items-center min-h-screen bg-gray-50">
        <component :is="AllStopsComponent" 
        v-highlight="'yellow'"
        :title="'Favourite stops'"
        :stops="stops"
        :show-button="true"
        :buttonTitle="'Delete'"
        @on-button-clicked="onButtonClicked"
        @open-stop-details="openStopDetails"/>
    </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/@Stores/authStore';
import { useStopsStore } from '../@Stores/stopsStore';
import { defineComponent } from 'vue';

const AllStopsComponent = defineAsyncComponent(() => import('front-stops/AllStopsComponent'));

export default defineComponent({
name: 'Stops',
setup() {
    const stopsStore = useStopsStore();
    const authStore = useAuthStore();
    const router = useRouter();
    const openStopDetails = (stop: any) => {router.push(`/stops/${stop._id}`);};
    const onButtonClicked = (stop: any) => {stopsStore.deleteUserStop(authStore.getUserId(), stop._id)}
     
    onMounted(async () => {
    try {
        await stopsStore.getUserStops(authStore.getUserId());
    } catch (e: any) {
        console.error('Get stops failed:', e);
    }
    });

    const stops = computed(() => stopsStore.stops);

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
