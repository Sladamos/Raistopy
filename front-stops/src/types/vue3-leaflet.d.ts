declare module 'vue3-leaflet' {
    import { DefineComponent } from 'vue';
    import { LatLngExpression, MapOptions } from 'leaflet';
  
    export const LMap: DefineComponent<{
      zoom: number;
      center: LatLngExpression;
      options: MapOptions;
    }>;
  
    export const LTileLayer: DefineComponent<{
      url: string;
      options: any;
    }>;
  
    export const LMarker: DefineComponent<{
      latLng: LatLngExpression;
      options: any;
    }>;
  
    export const LPopup: DefineComponent<{
      options: any;
    }>;
  }