import { defineStore } from "pinia";
import pinia from "src/boot/pinia";
import axios from "axios";
import { useAuthStore } from "./AuthStore";

export const useTasksStore = defineStore({
    id: "tasks",
    pinia,
    state: () => ({
        fields: ['name',  'description', 'date_deadline'],
        tasksList: [],
        loading: false,
    }),
    getters: {},
    actions: {
        async fetchTasksList() {
            const authStore = useAuthStore(); 
            const promises = authStore.loginInfos
            .filter(info => info.isChecked)
            .map(info => this.fetchTasksForLoginInfo(info));
            this.tasksList = [];
            await Promise.all(promises);
        },
        async fetchTasksForLoginInfo(info) {
            try {
                const options = {
                    method: "POST",
                    url : info.url,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        jsonrpc: "2.0",
                        params: {
                            service: "object",
                            method: "execute_kw",
                            args: [
                            info.db, // use the db from the loginInfo
                            2, // use the login from the loginInfo
                            info.password, // use the password from the loginInfo
                            'project.task',
                            'search_read',
                            [[]],
                            {
                                fields: this.fields,
                            }
                            ],
                        },
                    }
                } 
                const response = await axios.request(options);
                if(response.data.result) {
                    this.tasksList = this.tasksList.concat(response.data.result) ;
                    localStorage.setItem("tasksList", JSON.stringify(this.tasksList));
                } else {
                    this.loginError = "Tasks Wasn't found";
                }
            } catch (error) {
                console.error(error);
                this.loginError = "Tasks Wasn't found fetch was'nt done";
            }
        }, 

        ReadTasksFromLocalStorage() {
            const storedTasks = localStorage.getItem('tasksList');
            if (storedTasks) {
                this.tasksList = JSON.parse(storedTasks);
            }
        }
    },
});
