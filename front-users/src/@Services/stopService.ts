import { sendRequest } from './apiRequestService';
import { useToast } from 'vue-toast-notification';
import {SingleStopData} from "@/@Models/singleStopData";
import {SingleStopDetails} from "@/@Models/singleStopDetails";

export class StopService {
  private static toast = useToast();

  public static async getStops(): Promise<{data: {stops: [SingleStopData]}}> {
    this.toast.open({
      message: 'Stops fetched successfully!',
      type: 'success'
    });
    return await sendRequest("GET", `/backend/api/stops`);
  }

  public static async getUserStops(userId: string): Promise<{data: {stops: [SingleStopData]}}> {
    this.toast.open({
      message: 'Stops fetched successfully!',
      type: 'success'
    });
    return await sendRequest("GET", `/backend/api/users/${userId}/stops`);
  }

  public static async getStopDetails(stopId: string): Promise<{data: {stop: SingleStopDetails } }> {
    return await sendRequest("GET", `/backend/api/stops/${stopId}`);
  }

  public static async addUserStop(userId: string, stopId: string) {
    this.toast.open({
      message: 'Stop added successfully!',
      type: 'success'
    });
    await sendRequest("PUT", `/backend/api/users/${userId}/stops/${stopId}`);
  }

  public static async deleteUserStop(userId: string, stopId: string) {
    this.toast.open({
      message: 'Stop deleted successfully!',
      type: 'success'
    });
    return await sendRequest("DELETE", `/backend/api/users/${userId}/stops/${stopId}`);
  }
}
