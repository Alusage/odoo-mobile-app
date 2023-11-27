import { defineStore } from "pinia";
import axios from "axios";

export const useContactsStore = defineStore({
    id: "contacts",
    state: () => ({
        name:'',
        email:  '',
        phone: '',
        mobile: '',
        image_1920: '',
        street:  '',
        street2: '',
        zip: '',
        city: '',
        write_date: '',
        func: '',
        is_company: false,
    }),
    getters: {

    }, 
    actions: {
        async login() {
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
                                    fields: [
                                        "name",
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
                                        "is_company",
                                    ],
                                }
                            ],
                        },
                },
                };
                const response = await axios.request(options);

                if (response.data.result) {
                    this.contactsList = response.data.result ; 
                    
                    console.log("fetch from contactsStore has been fetched"); 

                    this.name = response.data.result.name || "";
                    this.email = response.data.result.email || "";
                    this.phone = response.data.result.phone || "";
                    this.mobile = response.data.result.mobile || "";
                    this.image_1920 = response.data.result.image_1920 || "";
                    this.street = response.data.result.street || "";
                    this.street2 = response.data.result.street2 || "";
                    this.zip = response.data.result.zip || "";
                    this.city = response.data.result.city || "";
                    this.write_date = response.data.result.write_date || "";
                    this.func = response.data.result.function || "";
                    this.is_company = response.data.result.is_company || "";

                    localStorage.setItem("contactsList", JSON.stringify(this.contactsList));

                    console.log("map contactLists attribution has been done") ; 

                    this.loginError = "";
                } else {
                    this.loginError = "Contacts Wasn't found";
                } 
            }catch (error) {
                console.error(error); // Log the error object
                this.loginError = "Contacts Wasn't found";
            }
        },

    }
}) ;