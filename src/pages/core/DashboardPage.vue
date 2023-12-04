<template>
  <q-page padding>
    <q-btn flat rounded @click="navigateToPage('/notification')">
      <q-avatar color="deep-purple" text-color="white" size="3rem" icon="o_notifications">
        <q-badge color="red" floating>12</q-badge>
      </q-avatar>
    </q-btn>
    <q-btn flat rounded @click="navigateToPage('/contacts')">
      <q-avatar color="deep-purple" text-color="white" size="3rem" icon="o_contact_page">
        <q-badge color="red" floating>{{state ? state.countContactResult : ''}}</q-badge>
      </q-avatar>
    </q-btn>
    <q-btn flat rounded @click="navigateToPage('/task')">
      <q-avatar color="deep-purple" text-color="white" size="3rem" icon="o_task_alt">
        <q-badge color="red" floating>24</q-badge>
      </q-avatar>
    </q-btn>
  </q-page>
</template>

<script>
import axios from 'axios'
import { defineComponent, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'DashboardPage',
    setup() {
      const state = reactive({
        apikey: 'admin',
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
    },
  }
)
</script>
