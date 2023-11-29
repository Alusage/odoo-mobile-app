import { defineStore } from "pinia";
import axios from "axios";
import { useContactsStore } from "./ContactsStore";
import { useTasksStore } from "./tasksStore";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
    loginError: "",
    isLoggedIn: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
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
        this.isLoggedIn = true;

        if (response.data.result) {
          this.user = response.data.result;
          this.loginError = "";

          // Initialize contacts store after a successful login
          const contactsStore = useContactsStore();
          await contactsStore.fetchContactsList();

          const tasksStore = useTasksStore();
          await tasksStore.fetchTasksList();
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
      this.isLoggedIn = false;
    },
  },
});
