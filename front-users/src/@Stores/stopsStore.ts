import { StopService } from '@/@Services/stopService';
import { defineStore } from 'pinia';
import {SingleStopDetails} from "@/@Models/singleStopDetails";
import {SingleStopData} from "@/@Models/singleStopData";


export const useStopsStore = defineStore('stops', {
  state: () => ({
    stops: [] as SingleStopData[],
    userStops: [] as SingleStopData[],
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
        this.userStops = stops.data.stops;
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
        const stop: SingleStopData = this.stops.find(stop => toRaw(stop)._id === stopId)!
        this.userStops = [...this.userStops, stop]
      } catch (error) {
        this.error = error as string;
      }
    },

    async deleteUserStop(userId: string, stopId: string) {
      this.error = null;
      try {
        await StopService.deleteUserStop(userId, stopId);
        this.userStops = this.userStops.filter(stop => toRaw(stop)._id !== stopId);
      } catch (error) {
        this.error = error as string;
      }
    },
  },
});