<template>
  <q-page class="main">
    <img style="margin-bottom: 3rem;" src="public/images/odoo-logo.png" alt="oddo's logo" width="200">
    <p>Login :</p>
    <input class="input" type="text" v-model="username">
    <P>Password :</P>
    <input class="input" type="password" v-model="password">
    <button @click="submitForm" class="signin">Sign In</button>
  </q-page>
</template>

<script>
import { defineComponent, ref, } from 'vue'
import jsonData from '/localStorage.json'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const username = ref('')
    const password = ref('')

    const submitForm = () => {
      const user = jsonData.users.find((item) => item.username === username.value && item.password === password.value);
      if (user) {
        // Valid login and password
        console.log('Login successful');
      } else {
        // Invalid login or password
        console.log('Invalid login or password');
      }
    };
    return {
      username, password, submitForm
    }
  }
})
</script>
<style>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.input {
  width: 40%;
  margin-bottom: 0.5rem;
}

.signin {
  width: 20%;
  margin-top: 1.5rem;
}
</style>
