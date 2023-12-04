import { defineStore } from "pinia";
import pinia from "src/boot/pinia";
import axios from "axios";

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
        try {
            this.loading = true;
            const options = {
            method: "POST",
            url: "https://apps.alusage.fr/jsonrpc",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                jsonrpc: "2.0",
                params: {
                service: "object",
                method: "execute_kw",
                args: [
                    'evan', // lui faire passer la base de donnée entré au login
                    '2',
                    'admin',
                    'project.task',
                    'search_read',
                    [],
                    {
                    fields: this.fields,
                    }
                ],
                },
            },
            };
            const response = await axios.request(options);

            if (response.data.result) {
            this.tasksList = response.data.result;
            console.log("Tasks from tasksStore have been fetched");

            localStorage.setItem("tasksList", JSON.stringify(this.tasksList));

            console.log("Les tâches ont été récupérées depuis le serveur et mises en cache");

            this.loading = "";
            } else {
            this.loadingError = "Tasks weren't found";
            }
        } catch (error) {
            console.log(error);
            this.loadingError = "Tasks weren't found, fetch wasn't done";
        } finally {
            this.loading = false;
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
