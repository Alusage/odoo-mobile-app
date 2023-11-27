import { defineStore } from "pinia";
import pinia from "src/boot/pinia";
import axios from "axios";

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
        contactLists: [
            
        ],
        loading: false, // État de chargement pour indiquer si les données sont en cours de chargement

    }),
    getters: { // fetch READ 

        

        // getOneContact
        
        // getContactById
        

        // getContactByName 

        //searchContact 

        // showContactForm
    }, 
    actions: { // write
        async fetchContactsList() {
            try {
                this.loading = true // Définir loading à true au début de la requête

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
                                'odoo',
                                '2',
                                'admin',
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
                    
                    console.log("fetch from contactsStore has been fetched"); 

                    // Stocker les données dans le localStorag
                    localStorage.setItem("contactsList", JSON.stringify(this.contactsList));

                    console.log("Les contacts sont récupérer depuis le serveur") ; 

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

        

    }
}) ;