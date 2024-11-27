import { StopService, SingleStopData, SingleStopDetails} from '@/services/stopService';
import { defineStore } from 'pinia';


export const useStopsStore = defineStore('stops', {
  state: () => ({
    stops: [] as SingleStopData[],
    error: null as string | null,
    isLoading: false, 
    stopDetails: null as SingleStopDetails | null,
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
    async getUserStops(userId: string) {
      this.isLoading = true; 
      this.error = null; 
      try {
        const stops = await StopService.getUserStops(userId);
        this.stops = stops.data.stops;
      } catch (error) {
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async getStopDetails(stopId: string) {
      this.isLoading = true;
      this.error = null;
      try {
        const stopDetails = await StopService.getStopDetails(stopId);
        this.stopDetails = stopDetails.data.stop;
      } catch (error) {
        this.error = error as string;
      } finally {
        this.isLoading = false;
      }
    },

    async addUserStop(userId: string, stopId: string) {
      this.error = null;
      try {
        await StopService.addUserStop(userId, stopId);
      } catch (error) {
        this.error = error as string;
      }
    },

    async deleteUserStop(userId: string, stopId: string) {
      this.error = null;
      try {
        await StopService.deleteUserStop(userId, stopId); 
        this.stops = this.stops.filter(stop => {
          const rawStop = toRaw(stop);
          return rawStop._id !== stopId;
        });
      } catch (error) {
        this.error = error as string;
      }
    },
  },
});