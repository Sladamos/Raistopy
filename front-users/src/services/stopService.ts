// stopService.ts
import { sendRequest } from './apiRequestService';
import { useToast } from 'vue-toast-notification';

export interface SingleStopData {
  id: string;
  name: string;
  subname: string | null;
}

export interface SingleStopDetails {
  id: string;
  name: string;
  subname: string | null;
  latitude: number;
  longitude: number;
  type: string;
  zoneName: string | null;
  virtual: boolean;
  ticketZoneBorder: boolean;
  onDemand: boolean;
}

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

  public static async getStopDetails(stopId: string): Promise<{data: {stop:SingleStopDetails } }> {
    return await sendRequest("GET", `/backend/api/stops/${stopId}`);
  }
}
