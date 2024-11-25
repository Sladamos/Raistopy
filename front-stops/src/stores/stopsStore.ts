export interface StopsStore {
    stops: { id: string, name: string, subname: string | null }[];
    error: string | null;
    isLoading: boolean;
    getStops: () => Promise<void>;
  }
  