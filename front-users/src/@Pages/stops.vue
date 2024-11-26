<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-50">
        <component :is="AllStopsComponent" :stopsStore="stopsStore" @open-stop-details="openStopDetails"/>
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
    const router = useRouter();
    const openStopDetails = (stop: any) => {
    router.push(`/stops/${stop._id}`);
};
    
    onMounted(async () => {
    try {
        await stopsStore.getStops();
    } catch (e: any) {
        console.error('Get stops failed:', e);
    }
    });

    return {
    AllStopsComponent: AllStopsComponent,
    stopsStore,
    openStopDetails
    };
},
});
</script>

<style scoped>

</style>
