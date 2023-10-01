import { defineStore } from "pinia";
import axios from "axios";

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
    async login({ db, login, password }) {
      try {
        const options = {
          method: 'POST',
          url: 'https://apps.alusage.fr/jsonrpc',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            jsonrpc: '2.0',
            params: {
              service: 'common',
              method: 'login',
              args: [db, login, password]
            }
          }
        };

        const response = await axios.request(options);


        if (response.data.result === 2) {

          this.user = response.data.result;
          this.loginError = "";
        } else {

          this.loginError = "Invalid login or password";
        }
      } catch (error) {
        console.error(error); // Log the error object
        this.loginError = "Invalid login or password";
      }
    },

    logout() {
      this.user = null;
    },
  },
});
