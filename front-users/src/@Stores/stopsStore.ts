import { StopService, SingleStopData} from '@/services/stopService';
import { defineStore } from 'pinia';


export const useStopsStore = defineStore('stops', {
  state: () => ({
    stops: [] as SingleStopData[],
    error: null as string | null,
    isLoading: false, 
  }),

  actions: {
    async getStops() {
      this.isLoading = true; 
      this.error = null; 
      try {
        const stops = await StopService.getStops();
        this.stops = stops.data.stops;
      } catch (error) {
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});