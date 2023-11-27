<!-- <template>
  <q-card 
   v-ripple
   @click="getOneClickedContact(contact)"
   v-for="contact in Contacts.contactsList" :key="contact.id"
  >

    <q-card-section class="text">{{ contact.name }}</q-card-section>
    <q-card-section class="text">{{ contact.email }}</q-card-section>

  </q-card>
</template> -->

<template>
  <div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';
// import ContactCard from '../ContactCard.vue';  

export default defineComponent({
  name: 'ContactsComponent',
  data() {
    return {
      Contacts: {
        contactsList: [],
      },
    };
  },
  methods: {

    cleanContactProperties(contact){
      return {
        name: contact.name || '',
        email: contact.email_normalized || '',
        phone: contact.phone || '',
        mobile: contact.mobile || '',
        image_1920: contact.image_1920 || '',
        street: contact.street || '',
        street2: contact.street2 || '',
        zip: contact.zip || '',
        city: contact.city || '',
        write_date: contact.write_date || '',
        func: contact.function || '',
        is_company: contact.is_company || '',
        commercial_company_name: contact.commercial_company_name || '',
      }
    },

    async fetchContactList() {
      try {
        const options = {
          method: 'POST',
          url: 'https://apps.alusage.fr/jsonrpc',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            jsonrpc: '2.0',
            params: {
              service: 'object',
              method: 'execute_kw',
              args: [
                'odoo',
                '2',
                'admin',
                'res.partner',
                'search_read',
                [[]],
                {
                  fields: [
                    'name',
                    'email_normalized',
                    'phone',
                    'mobile',
                    'image_1920',
                    'street',
                    'street2',
                    'zip',
                    'city',
                    'write_date',
                    'function',
                    'is_company',
                  ],
                },
              ],
            },
          },
        };

        const response = await axios.request(options);
        const contactData = response.data.result;

        let listeClean = [] ; 
  

        contactData.forEach( (contact) => {
          listeClean.push(this.cleanContactProperties(contact)) ; 
          
        });
        
        // console.log(contactData);

        this.Contacts.contactsList = listeClean;
        // console.log(this.Contacts.contactsList);
        // Emit the contacts list to the parent component
        this.$emit('fetchedContactList', this.Contacts.contactsList);
        
      } catch (error) {
        console.error(error);
      }
    },
    

    getOneClickedContact(contact){
      this.$emit('clickedContact', contact); 
    },
    
  },
  mounted() {
    this.fetchContactList();
    
    // this.getOneContact();
    // this.assignContactsData();
    // this.getContactProperties(); 
    // this.testClick();
  },
});
</script>

<!-- ['name', 'email_normalized', 'phone', 'mobile', 'image_1920', 'street', 'street2', 'zip', 'city', 'write_date', 'function', 'is_company', 'commercial_company_name'] -->

<!-- const fetchContactList = async () => {
    try {
      const options = {
        method: 'POST',
        url: 'https://apps.alusage.fr/jsonrpc',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          jsonrpc: '2.0',
          params: {
            service: 'object',
            method: 'execute_kw',
            args: [
              state.db,
              state.myId,
              state.apikey,
              'res.partner',
              'search_read',
              [[]],
              {
                fields: ['name', 'email_normalized', 'phone', 'mobile', 'image_1920', 'street', 'street2', 'zip', 'city','write_date','function', 'is_company'],
              }
            ]
          }
        }
      };


      const response = await axios.request(options);
      state.rows = response.data.result;
      isContactListFetched.value = true;

      console.log(state.rows)
      console.log(state.rows[10].name)
    } catch (error) {
      console.error(error);
    }

  } -->