<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-50">
        <component :is="AllStopsComponent" 
        :stops="stops" 
        :show-button="isLoggedIn"
        :buttonTitle="'Add'"
        @on-button-clicked="onButtonClicked"
        @open-stop-details="openStopDetails"

        />
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
    const onButtonClicked = (stop: any) => {stopsStore.addUserStop(authStore.getUserId(), stop._id)}
    
    onMounted(async () => {
    try {
        await stopsStore.getStops();
    } catch (e: any) {
        console.error('Get stops failed:', e);
    }
    });

    const stops = computed(() => stopsStore.stops);
    const isLoggedIn = computed(() => authStore.isLoggedIn);

    return {
    AllStopsComponent: AllStopsComponent,
    stops,
    isLoggedIn,
    openStopDetails,
    onButtonClicked
    };
},
});
</script>

<style scoped>

</style>
