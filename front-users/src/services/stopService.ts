// stopService.ts
import { sendRequest } from './apiRequestService';

export interface AllStopsData {
  data: {
    stops: [SingleStopData]
  }
}

export interface SingleStopData {
  id: string;
  name: string;
  subname: string | null;
}


export class StopService {
  public static async getStops(): Promise<AllStopsData> {
    return await sendRequest("GET", `/backend/api/stops`);
  }
}
