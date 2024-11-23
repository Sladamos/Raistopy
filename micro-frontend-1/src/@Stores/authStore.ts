import * as pin from "pinia";
import { ref } from "vue";

const useAuthStore = pin.defineStore("auth", () => {
  const is_authorized = ref<boolean>(false);
  const username = ref<string>();

  function authenticate(status: boolean) {
    is_authorized.value = status;
  }

  return {
    //State
    is_authorized,
    username,

    //Actions
    authenticate,
  };
});

export default {
  useAuthStore,
};
