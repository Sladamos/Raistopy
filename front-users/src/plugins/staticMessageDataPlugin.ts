import { App } from 'vue';

export default {
  install(app: App) {
    app.config.globalProperties.$staticMessageDataPlugin = 'Enjoy our bus stop application!';
  }
};