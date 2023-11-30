<template>
  <q-page class="flex column items-center justify-center">
    <img style="margin-bottom: 3rem;" src="/images/odoo.png" alt="oddo's logo" width="200">
    <q-form class="q-gutter-md flex column" @submit.prevent="submitForm">
      <q-input type="text" v-model="state.database" label="Database :" autofocus
        :rules="[(value) => !!value || 'Database is required']"></q-input>
      <q-input type="text" v-model="state.login" label="Login :" :rules="[(value) => !!value || 'Login is required']" />
      <q-input :type="state.isPwd ? 'password' : 'text'" v-model="state.password" label="Password :">
        <template v-slot:append>
          <q-icon :name="state.isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
            @click="state.isPwd = !state.isPwd" />
        </template>
      </q-input>
      <div v-if="loginError" class="text-negative">{{ loginError }}</div>
      <q-btn type="submit" rounded color="primary" text-color="white" primary class="q-mt-xl " label="Sign In" />
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive, computed } from 'vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/AuthStore';




export default defineComponent({
  name: 'IndexPage',
  setup() {
    const state = reactive({
      database: '',
      login: '',
      password: '',
      isPwd: ref(true),
    })
    const rules = computed(() => {
      return {
        database: { required },
        login: { required },
        password: { required },
      }
    })
    const v$ = useVuelidate(rules, state)

    const router = useRouter();
    const loginError = ref('');
    const authStore = useAuthStore();

    

    


/**
 * Submit the form after validating the input fields.
 */
   // #ToDO Use authStore.js
   const submitForm = async () => {
  if (v$.value.$error) {
    loginError.value = 'Please fill out all fields correctly.';

  }

  await authStore.login({
    db: state.database,
    login: state.login,
    password: state.password
  });


  if (authStore.loginError) {
    loginError.value = authStore.loginError;
  } else {
       
    router.push('/Dashboard');

    
  }
};

    return {
      state, v$, submitForm, loginError
    }
  }
  

})



</script>
src/stores/AuthStore