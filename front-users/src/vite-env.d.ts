/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'front-stops/AllStopsComponent' {
  import { DefineComponent } from 'vue';

  const AllStopsComponent: DefineComponent<{}, {}, any>;
  export default AllStopsComponent;
}

declare module 'front-stops/StopDetailsComponent' {
  import { DefineComponent } from 'vue';

  const StopDetailsComponent: DefineComponent<{}, {}, any>;
  export default StopDetailsComponent;
}

declare module 'front-stops/stores/stopsStore' {
  export interface StopsStore {
    stops: { id: string, name: string, subname: string | null }[];
    error: string | null;
    isLoading: boolean;
    getStops: () => Promise<void>;
  }
}