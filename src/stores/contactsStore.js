import { defineStore } from "pinia";
import pinia from "src/boot/pinia";
import axios from "axios";
import { useAuthStore } from "./AuthStore"


export const useContactsStore = defineStore({
    id: "contacts",
    pinia,
    state: () => ({
        fields: ["name",
        "email",
        "phone",
        "mobile",
        "image_1920",
        "street",
        "street2",
        "zip",
        "city",
        "image_1920",
        "write_date",
        "function",
        "is_company",],
        contactsList: [],
        loading: false, // État de chargement pour indiquer si les données sont en cours de chargement
        
    }),
    getters: {
        getContactsById: (state) => (id) => {
            return state.contactsList.find(contact => contact.id === id)
        },


    }, 
    actions: { // write
        async fetchContactsList() {
            const authStore = useAuthStore(); 
            const promises = authStore.loginInfos
            .filter(info => info.isChecked)
            .map(info => this.fetchContactsForLoginInfo(info));
            this.contactsList = [];
            await Promise.all(promises);
        },
    
        async fetchContactsForLoginInfo(info) {
            console.log("fetchContactsForLoginInfo :", info);
            try {
            const options = {
                method: "POST",
                url: info.url,
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
                    'res.partner',
                    'search_read',
                    [[]],
                    {
                        fields: this.fields,
                    }
                    ],
                },
                },
            };
            const response = await axios.request(options);
            if (response.data.result) {

                // Add a from database proprity to each contact
                const contacts = response.data.result.map(contact => ({ ...contact, FromDatabase: info.db}))
                this.contactsList = this.contactsList.concat(contacts); 
                
                localStorage.setItem("contactsList", JSON.stringify(this.contactsList));
                console.log("contactsList :", this.contactsList);
            } else {
                this.loginError = "Contacts Wasn't found";
            }
            } catch (error) {
            console.error(error);
            this.loginError = "Contacts Wasn't found fetch was'nt done";
            } finally {
            this.loading = false;
            }
        },

        ReadContactsFromLocalStorage() {
            const storedContacts = localStorage.getItem('contactsList');
            if (storedContacts) {
                this.contactsList = JSON.parse(storedContacts);
            }
        }
    }
}) ;