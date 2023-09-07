import { defineStore } from "pinia";
import jsonData from "/localStorage.json";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
    loginError: "",

  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    login({ email, password }) {
      const user = jsonData.users.find(
        (item) => item.email === email && item.password === password
      );
      if (user) {
        this.user = user;
        this.loginError = "";
      } else {
        this.loginError = "Invalid login or password";
      }
    },
    logout() {
      this.user = null;
    },
  },
});
