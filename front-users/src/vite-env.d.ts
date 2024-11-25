/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'front-stops/*' {
  import { DefineComponent } from 'vue';

  const MyComponent: DefineComponent<{}, {}, any>;
  export default MyComponent;
}