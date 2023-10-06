<template>
  <q-page padding>
    <q-btn flat rounded @click="navigateToPage('/notification')">
      <q-avatar color="orange" text-color="white" size="10rem" icon="o_notifications">
        <q-badge color="orange" floating>12</q-badge>
      </q-avatar>
    </q-btn>
    <q-btn flat rounded @click="navigateToPage('/contact')">
      <q-avatar color="purple" text-color="white" size="10rem" icon="o_contact_page">
        <q-badge color="orange" floating>{{state ? state.countContactResult : ''}}</q-badge>
      </q-avatar>
    </q-btn>
    <q-btn flat rounded @click="navigateToPage('/task')">
      <q-avatar color="green" text-color="white" size="10rem" icon="o_task_alt">
        <q-badge color="orange" floating>24</q-badge>
      </q-avatar>
    </q-btn>
  </q-page>
</template>

<script>
import axios from 'axios'
import { defineComponent, reactive, onMounted } from 'vue'
import {  useRouter } from 'vue-router'
export default defineComponent({
  name: 'DashboardPage',
  setup() {
    const state = reactive({
      apikey: '42584093f5ac1d2b71ff0978bc62a5e62b3f76fb',
      db: 'odoo',
      myId: '2',
      countContactResult : 0,


    })



    const countContact = async () => {

      try {
        const optionsCountContact = {
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
                'search_count',
                [[]]
              ]
            }
          }
        };


        const responseCountContact = await axios.request(optionsCountContact);
        state.countContactResult = responseCountContact.data.result;
      } catch (error) {
        console.error(error);
      };
    }


    const router = useRouter();

    const navigateToPage = (path) => {
      router.push(path);
    }






  onMounted(() => {
    countContact()
  })

    return {
      state,
      countContact,
      navigateToPage,


    }
    }
  })


</script>
