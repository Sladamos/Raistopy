// stopService.ts
import { sendRequest } from './apiRequestService';

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
  public static async getStops(): Promise<{data: {stops: [SingleStopData]}}> {
    return await sendRequest("GET", `/backend/api/stops`);
  }

  public static async getStopDetails(stopId: string): Promise<{data: {stop:SingleStopDetails } }> {
    return await sendRequest("GET", `/backend/api/stops/${stopId}`);
  }
}
