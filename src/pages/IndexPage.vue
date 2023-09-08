<template>
  <q-page class="flex column items-center justify-center">
    <img style="margin-bottom: 3rem;" src="/images/odoo-logo.png" alt="oddo's logo" width="200">
    <q-form class="q-gutter-md flex column" @submit.prevent="submitForm">
      <q-input type="email" v-model="state.email" label="Login :" autofocus
        :rules="[(value) => !!value || 'Login is required']
        " />
      <q-input  :type="state.isPwd ? 'password' : 'text'" v-model="state.password" label="Password :" >
      <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="state.isPwd = !state.isPwd"
          />
        </template>
        </q-input>
      <div v-if="authStore.loginError" class="text-negative">{{ authStore.loginError }}
      </div>
      <q-btn type="submit" rounded color="primary" text-color="white" primary class="q-mt-xl " label="Sign In" />
    </q-form>
  </q-page>
</template>


<script>
import { defineComponent, ref, reactive, computed } from 'vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router';
import { useAuthStore } from '/src/stores/authStore';
import { QInput, QBtn } from 'quasar';


export default defineComponent({
  name: 'IndexPage',
  setup() {
    const state = reactive({
      email: '',
      password: '',
      isPwd: ref(true),
    })
    const rules = computed(() => {
      return {
        email: { required },
        password: { required },
      }
    })
    const v$ = useVuelidate(rules, state)

    const router = useRouter();
    const authStore = useAuthStore();

    const submitForm = () => {
      v$.value.$dirty = true;
      if (v$.value.$error) {
        console.log('Form not valid');
      } else {
        authStore.login({ email: state.email, password: state.password });
        if (authStore.isAuthenticated) {
          console.log('Login successful');
          router.push('/dashboard');
        }
      }
    };

    return {
      state, v$, submitForm, authStore
    }
  }
})
</script>
