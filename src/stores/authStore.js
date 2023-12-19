import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

// import { useContactsStore } from "./ContactsStore";
// import { useTasksStore } from "./TasksStore";
// import pinia from "src/boot/pinia";

// toDO : stocke id, base de donnée, url et mdp

export const useAuthStore = defineStore({ 
  id: "auth",
  state: () => ({
    user: null,
    loginError: "",
    isLoggedIn: false,
    logoutEvent: ref(false),
    serverList: [],
    loginInfos: [],
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && state.user.isLoggedIn,
  },
  actions: {

    async login( { url, db, login, password} ) {

      const storedLoginInfos = localStorage.getItem('loginInfos');
        if (storedLoginInfos) {
          this.loginInfos = JSON.parse(storedLoginInfos);
        }

      try {
        const options = {
          method: "POST",
          url: url,
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
          this.isLoggedIn = true;
          this.loginError = "";

          localStorage.setItem('user', JSON.stringify(this.user)); // user infos
          


          this.user = { id: response.data.result , isLogged : true }
          localStorage.setItem('user', JSON.stringify(this.user))
          console.log('User logged in:', this.user);

          
        // check if loginInfos aren't already existing before storing it in local storage 
          const newLoginInfo = { url, db, login, password, isChecked: false};

          if (!this.loginInfos.some(info => JSON.stringify(info) === JSON.stringify(newLoginInfo))) {
            this.loginInfos.push(newLoginInfo);
            localStorage.setItem('loginInfos', JSON.stringify(this.loginInfos));
            console.log("je suis dedans")
          }


          console.log(url)
          // const contactsStore = useContactsStore();
          // await contactsStore.fetchContactsList();

          // const tasksStore = useTasksStore();
          // await tasksStore.fetchTasksList();

        } else {
          this.loginError = "Invalid login or password";
        }
      } catch (error) {
        console.error(error); // Log the error object
        this.loginError = "Invalid login or password";
      }
    },

    logout() {

      this.isLoggedIn = false;
      this.loginInfos = this.loginInfos.map(info => ({ ...info, isChecked: false})); 
      this.user = [] ; 
      this.user = null;

      //Logout event emission for the compoenent to use the redirection
      this.logoutEvent = !this.logoutEvent
      
    },

    readUserFromLocalStorage() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    },

    readLoginInfosFromLocalStorage() {
      const storedLoginInfos = localStorage.getItem('loginInfos');
      if (storedLoginInfos) {
        this.loginInfos = JSON.parse(storedLoginInfos);
      }
    }
  },
});
