import { defineStore } from "pinia";
import pinia from "src/boot/pinia";
import axios from "axios";
import { useAuthStore } from "./AuthStore";


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
        async fetchContactsList({url, db, login, password}) {
            console.log(url, db, login, password);
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
                            service: "object",
                            method: "execute_kw",
                            args: [
                                db, // lui faire passer la base de donnée entré au login
                                login,
                                password,
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
                    this.contactsList = response.data.result ;
                    
                    
                    console.log("contactsList after fetching:", this.contactsList);
                    console.log("fetch from contactsStore has been fetched"); 

                    

                    // Stocker les données dans le localStorag
                    localStorage.setItem("contactsList", JSON.stringify(this.contactsList));

                    console.log("Les contacts sont récupérer depuis le serveur et mis en cache") ; 

                    this.loginError = "";
                } else {
                    this.loginError = "Contacts Wasn't found";
                } 
            }catch (error) {
                console.error(error); // Log the error object
                this.loginError = "Contacts Wasn't found fetch was'nt done";
            }finally {
                this.loading = false; //// Définir loading à false à la fin de la requête
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