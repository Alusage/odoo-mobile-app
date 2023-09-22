<template>
  <q-page class="flex column items-center justify-center">
    <h3>Contact list</h3>
    <q-form class="q-gutter-md flex column" @submit.prevent="contactList">
      <q-input type="text" v-model="state.apikey" label="API Key:" autofocus
        :rules="[(value) => !!value || 'API Key is required']"></q-input>
      <q-btn type="submit" rounded color="primary" text-color="white" primary class="q-mt-xl " label="Send" />
    </q-form>
  </q-page>
</template>

<script>
import axios from 'axios'
import { defineComponent, reactive} from 'vue'



export default defineComponent({
  name: 'DashboardPage',

setup() {


const state = reactive({
  apikey: '',
})

const axios = require('axios')
const contactList = () => {
  axios.get('https://apps.alusage.fr/base_rest_demo_api/private/partner/',{
    headers: {
      'Authorization': 'Bearer ' + state.apikey
    },
    params : {
      name : "%20",
    }

  })
  console.log(state.apikey)
}
return {
  state, contactList
}
}
})
</script>
