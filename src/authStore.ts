import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuth = ref(false);

  function logIn() {
    isAuth.value = true;
  }

  function logOut() {
    isAuth.value = false;
  }

  return { isAuth, logIn, logOut };
});
