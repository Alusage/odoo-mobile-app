import { defineStore } from "pinia";
// import axios from "axios";
// import { useAuthStore } from "./AuthStore";


export const useDatabaseStore = defineStore({
    // id : "database",
    // state: () => ({
    //     serverList: [],
    //     IsServerListFetched: false,
    // }),
    // actions: {
    //     async fetchServerList() {
    //         const authStore = useAuthStore();

    //         try { 
    //             const options = {
    //                 method: 'POST',
    //                 url: 'https://apps.alusage.fr/jsonrpc',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }, 
    //                 data: {
    //                     json: "2.0",
    //                     params: {
    //                         service: "object",
    //                         method: "execute_kw",
    //                         args : [
    //                             authStore.db,
    //                             authStore.login,
    //                             authStore.password,
    //                             "x_server_login",
    //                             "search_read",
    //                             [
    //                                 [
    //                                     [
    //                                         "x_local_user_id", "=", Number(authStore.user.id)
    //                                     ]
    //                                 ]
    //                             ]
    //                         ]
    //                                 }
    //                             }
    //                         }
    //             const response = await axios.request(options);
    //             this.serverList = response.data.result;
    //             this.IsServerListFetched = true;
    //         } catch (error) {
    //             console.error(error);
    //             this.IsServerListFetched = false;
    //         }
            
    //     }
    // }
})
