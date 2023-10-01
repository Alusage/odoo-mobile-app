<template>
  <q-page class="flex column items-center justify-center">
    <q-input type="text" v-model="state.db" label="Database:"
      :rules="[(value) => !!value || 'Database is required']"></q-input>
    <q-input type="text" v-model="state.myId" label="My ID:"
      :rules="[(value) => !!value || 'My ID is required']"></q-input>
    <q-input type="text" v-model="state.apikey" label="API Key:"
      :rules="[(value) => !!value || 'API Key is required']"></q-input>
    <q-card>

      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
        narrow-indicator>
        <q-tab name="list" label="Contact list" />
        <q-tab name="new" label="New Contact" />
        <q-tab name="update" label="Update Contact" />

      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="list">
          <div class="text-h6">Contact list</div>
          <q-form class="q-gutter-md flex column" @submit.prevent="fetchContactList">


            <q-btn type="submit" rounded color="primary" text-color="white" primary class="q-mt-xl "
              label="Get contact list" />
          </q-form>
          <q-table class="q-mt-xl" :rows="state.rows" :columns="columns" row-key="name" />
        </q-tab-panel>

        <q-tab-panel name="new">
          <div class="text-h6">New Contact</div>
          <q-form class="q-gutter-md flex column items-center" @submit.prevent="newContact">
            <q-input type="text" v-model="state.newname" label="Name :" autofocus
              :rules="[(value) => !!value || 'Name is required']"></q-input>
            <q-input type="text" v-model="state.newstreet" label="Street :"
              :rules="[(value) => !!value || 'Street is required']"> </q-input>
            <q-input type="text" v-model="state.newstreet2" label="Street2 :"> </q-input>
            <q-input type="text" v-model="state.newzip" label="ZIP :" :rules="[(value) => !!value || 'ZIP is required']">
            </q-input>
            <q-input type="text" v-model="state.newcity" label="City :"
              :rules="[(value) => !!value || 'City is required']">
            </q-input>
            <q-input type="text" v-model="state.newphone" label="Phone :"> </q-input>


            <q-btn type="submit" rounded color="primary" text-color="white" primary class="q-mt-xl " label="Send" />

          </q-form>
        </q-tab-panel>
        <q-tab-panel name="update">
          <div class="text-h6">Update Contact</div>
          <q-form class="q-gutter-md flex column items-center" @submit.prevent="searchContactID">
            <q-input type="text" v-model="state.id" label="ID :" autofocus> </q-input>
            <q-btn type="submit" rounded color="primary" text-color="white" primary class="q-mt-l " label="Search" />
          </q-form>
          <q-form class="q-gutter-md flex column items-center" @submit.prevent="updateContact">

            <q-input type="text" v-model="state.updatename" label="Name :"
              :rules="[(value) => !!value || 'Name is required']"></q-input>
            <q-input type="text" v-model="state.updatestreet" label="Street :"
              :rules="[(value) => !!value || 'Street is required']"> </q-input>
            <q-input type="text" v-model="state.updatestreet2" label="Street2 :"> </q-input>
            <q-input type="text" v-model="state.updatezip" label="ZIP :"
              :rules="[(value) => !!value || 'ZIP is required']">
            </q-input>
            <q-input type="text" v-model="state.updatecity" label="City :"
              :rules="[(value) => !!value || 'City is required']">
            </q-input>
            <q-input type="text" v-model="state.updatephone" label="Phone :"> </q-input>

            <q-btn type="submit" rounded color="primary" text-color="white" primary class="q-mt-xl " label="Send" />

          </q-form>
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios'
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'DashboardPage',
  setup() {
    const state = reactive({
      apikey: '42584093f5ac1d2b71ff0978bc62a5e62b3f76fb',
      db: 'odoo',
      myId: '2',
      name: '',
      rows: [],
      id: '',
      updatename: '',
      updatestreet: '',
      updatestreet2: '',
      updatezip: '',
      updatecity: '',
      updatephone: '',
      newname: '',
      newstreet: '',
      newstreet2: '',
      newzip: '',
      newcity: '',
      newphone: '',
      updateid: '',

    })
    const columns = [
    { name: 'id', label: 'ID', align: 'left', field: 'id' },
      { name: 'name', label: 'Name', align: 'left', field: 'name' },
      { name: 'street', label: 'Street', align: 'left', field: 'street' },
      { name: 'street2', label: 'Street 2', align: 'left', field: 'street2' },
      { name: 'zip', label: 'ZIP', align: 'left', field: 'zip' },
      { name: 'city', label: 'City', align: 'left', field: 'city' },
      { name: 'phone', label: 'Phone', align: 'left', field: 'phone' },
      { name: 'is_company', label: 'Is Company', align: 'left', field: 'is_company' },

    ]

    /**
     * Fetches the contact list from the API and updates the state with the response data.
     */
    const fetchContactList = async () => {
      try {
        const optionsSearch = {
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
                'search',
                [[]]
              ]
            }
          }
        };


        const responseSearch = await axios.request(optionsSearch);
        const result = responseSearch.data.result;

        const optionsRead = {
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
                'read',
                [result]
              ]
            }
          }
        };


        const responseRead = await axios.request(optionsRead);
        state.rows = responseRead.data.result;
      } catch (error) {
        console.error(error);
      }

    }
    /**
     * Creates a new contact by sending a POST request to the server.
     */
    const newContact = async () => {
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
                'create',
                [{
                  name: state.newname,
                  street: state.newstreet,
                  street2: state.newstreet2,
                  zip: state.newzip,
                  city: state.newcity,
                  phone: state.newphone,
                }]
              ]
            }
          }
        };

        await axios.request(options);

      } catch (error) {
        console.error(error);
      }
    };
    /**
     * Retrieves the contact ID from the API.

     */
    const searchContactID = async () => {
      try {

        const optionsReadId = {
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
                'read',
                [[Number(state.id)]]
              ]
            }
          }
        };
        const responseReadId = await axios.request(optionsReadId);

        const contact = responseReadId.data.result[0];
        state.updateid = contact.id;
        state.updatename = contact.name;
        state.updatestreet = contact.street;
        state.updatestreet2 = contact.street2;
        state.updatezip = contact.zip;
        state.updatecity = contact.city;
        state.updatephone = contact.phone;
        console.log(contact);
        console.log(state.updateid);
        console.log(state.updatename);



      } catch (error) {
        console.error(error);

      }
    };

    /**
     * Updates a contact in the database.
     */
    const updateContact = async () => {
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
                'write',
                [[Number(state.updateid)], {
                  name: state.updatename,
                  street: state.updatestreet,
                  street2: state.updatestreet2,
                  zip: state.updatezip,
                  city: state.updatecity,
                  phone: state.updatephone,
                }]
              ]
            }
          }
        };

        await axios.request(options);

      } catch (error) {
        console.error(error);
      }
    };

    return {
      state,
      fetchContactList,
      newContact,
      columns,
      searchContactID,
      updateContact,
      tab: ref('list')
    }
  },
})
</script>
