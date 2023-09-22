import { defineStore } from "pinia";
import axios from 'axios';


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

    login({ db, login, password }) {
      const payload = {
        params: {
          db: db,
          login: login,
          password: password
        }
      };

      axios.post('https://apps.alusage.fr/web/session/authenticate', payload)
        .then(response => {
          const user = response.data;
          this.user = user;
          this.loginError = "";
        })
        .catch(error => {
          this.loginError = "Invalid login or password";
        });
    },


    logout() {
      this.user = null;
    },
  },
});
