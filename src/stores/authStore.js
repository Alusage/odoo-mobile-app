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
    /**
     * Log in to the application using the provided credentials.
     *
     * @param {Object} options - The login options.
     * @param {string} options.db - The database name.
     * @param {string} options.login - The user login.
     * @param {string} options.password - The user password.
     * @return {Promise} A promise that resolves with the logged-in user object
     * or rejects with an error message.
     */
    async login({ db, login, password }) {
      try {
        const options = {
          method: "POST",
          url: "https://apps.alusage.fr/jsonrpc",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            jsonrpc: "2.0",
            params: {
              service: "common",
              method: "login",
              args: [db, login, password],
            },
          },
        };

        const response = await axios.request(options);

        if (response.data.result) {
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

/**
 * Logout the user.
 *
 * @return {void}
 */
    logout() {
      this.user = null;
    },
  },
});
