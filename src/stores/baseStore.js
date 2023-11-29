// import { defineStore } from "pinia";
// import pinia from "src/boot/pinia";
// import axios from "axios";

// export const baseStore = defineStore({
//     id: "base",
//     pinia,
//     state: () => ({
//         fields: [],
//         dataList: [],
//         loading: false,
//     }),
//     actions: {
//         async fetchData(apiEndpoint, modelName) {
//         try {
//             this.loading = true;

//             const options = {
//             method: "POST",
//             url: "https://apps.alusage.fr/jsonrpc",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             data: {
//                 jsonrpc: "2.0",
//                 params: {
//                 service: "object",
//                 method: "execute_kw",
//                 args: [
//                     'odoo',
//                     '2',
//                     'admin',
//                     modelName,
//                     'search_read',
//                     [],
//                     {
//                     fields: this.fields,
//                     }
//                 ],
//                 },
//             },
//             };
//             const response = await axios.request(options);

//             if (response.data.result) {
//             this.dataList = response.data.result;
//             console.log(`Data from ${modelName}Store has been fetched`);

//             localStorage.setItem(`${modelName}List`, JSON.stringify(this.dataList));

//             console.log(`Data has been retrieved from the server and cached`);

//             this.loadingError = "";
//             } else {
//             this.loadingError = `${modelName} weren't found`;
//             }
//         } catch (error) {
//             console.log(error);
//             this.loadingError = `${modelName} weren't found, fetch wasn't done`;
//         } finally {
//             this.loading = false;
//         }
//         },
//     },
//     });
