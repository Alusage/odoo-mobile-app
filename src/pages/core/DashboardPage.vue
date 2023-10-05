<template>
  <q-page padding>
<q-btn flat rounded to='/contact'><q-avatar  color="purple" text-color="white" size="10rem" icon="o_contact_page" /><q-badge color="orange"  floating  >{{state ? state.countContactResult : ''}}</q-badge></q-btn>
  </q-page>
</template>

<script>
import axios from 'axios'
import { defineComponent, reactive, onMounted } from 'vue'
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

  onMounted(() => {
    countContact()
  })

    return {
      state,
      countContact,

    }
    }
  })


</script>
