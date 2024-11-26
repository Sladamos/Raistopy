import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./routes/router";
import 'vue-toast-notification/dist/theme-sugar.css'; // Import the theme style
import VueToast from 'vue-toast-notification';

const _pinia = createPinia();

createApp(App)
.use(_pinia)
.use(router)
.use(VueToast)
.mount("#app");
