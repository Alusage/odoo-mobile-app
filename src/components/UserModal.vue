<script>
import { defineComponent, inject, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent ({
  setup() {
    const authStore = inject('authStore')
    const router = useRouter()

    onMounted(() => {
      authStore.readLoginInfosFromLocalStorage();
    }),
    
    // Watch loginInfos and update local storage whenever it changes
    watch(() => authStore.loginInfos, () => {
    localStorage.setItem('loginInfos', JSON.stringify(authStore.loginInfos));
    
    }, 
    { deep: true }),  // Use deep watcher to watch changes in object properties

    
    watch(() => authStore.logoutEvent, () => {
      router.push({ name: 'Login' })
    })
    

    return {
      authStore
    }
  }
})
</script>

<template>
<q-btn flat icon="o_account_circle" class="on-left" size="md">
    <q-menu>
      <div class="q-pa-md">
      
        <div class="row items-center justify-center q-gutter-md">
          <q-avatar size="4.5rem">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
          </q-avatar> 
          <div class="column">
            <div class="text-subtitle1 q-mt-md q-mb-xs">Administrator</div>
            <div class="text-subtitle1 q-mb-xs">app.alusage.fr</div>
            <div class="text-subtitle1 q-mb-xs">Id : {{ authStore.user }} </div>
          </div>

        </div>
          

        <div>
            <q-btn color="red" label="Logout" icon="o_exit_to_app" @click="authStore.logout()" />

            <q-btn
            background-color="red"
              flat
              class="q-pa-md"
              round
              @click="$q.dark.toggle()"
              :icon="$q.dark.isActive ? 'o_nights_stay' : 'o_wb_sunny'"
            >
            </q-btn>
        </div>
    </div>
    </q-menu>
</q-btn>
</template>
