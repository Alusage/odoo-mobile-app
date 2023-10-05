<template>
  <q-page padding>
    <div class="q-pa-md" >
    <q-list bordered separator>


      <q-item clickable v-ripple v-for="(contact, id) in state.rows" :key="id">
  <q-item-section avatar>
    <q-avatar>
      <img :src="contact.avatar_url || 'https://cdn.quasar.dev/img/boy-avatar.png'">
    </q-avatar>
  </q-item-section>
  <q-item-section>
    {{ contact.name }}
  </q-item-section>
  <q-separator vertical inset/>
  <q-item-section side>
    <q-btn icon="o_mail" size="md" @click="sendEmail(contact.email_normalized)"></q-btn>
  </q-item-section>
  <q-item-section side>
    <q-btn icon="o_phone" size="md" @click="startCall(contact.phone)"></q-btn>
  </q-item-section>
</q-item>


    </q-list>
  </div>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="accent" ><q-tooltip>
          Add new contact
        </q-tooltip></q-btn>
          </q-page-sticky>
  </q-page>
</template>

<script>
import axios from 'axios'
import { defineComponent, reactive, ref, onMounted  } from "vue";
export default defineComponent({


  name: 'ContactPage',
  setup () {
    const state = reactive({
      apikey: '42584093f5ac1d2b71ff0978bc62a5e62b3f76fb',
      db: 'odoo',
      myId: '2',
      rows: [],
    })
      const fetchContactList = async () => {
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
                [[]]
              ]
            }
          }
        };


        const response = await axios.request(options);
        state.rows = response.data.result;

console.log(state.rows)
      } catch (error) {
        console.error(error);
      }

    }
    onMounted(() => {
      fetchContactList();
    })

 const sendEmail = (email) => {
   window.open(`mailto:${email}`);
 }
 const startCall = (phoneNumber) => {
   window.open(`tel:${phoneNumber}`);
 }

    return {
state,
fetchContactList,
sendEmail,
startCall,
    }
  }
})
</script>
