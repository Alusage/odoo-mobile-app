<script>
import { defineComponent, inject, onMounted, watch } from 'vue';
export default defineComponent ({
  setup() {
    const authStore = inject('authStore')
    


    onMounted(() => {
      authStore.readLoginInfosFromLocalStorage();
    })

     // Watch loginInfos and update local storage whenever it changes
    watch(() => authStore.loginInfos, () => {
        localStorage.setItem('loginInfos', JSON.stringify(authStore.loginInfos));
    }, 
    { deep: true })  // Use deep watcher to watch changes in object properties

    return {
      authStore
    }
  }
})
</script>

<template>
<q-btn flat icon="o_account_circle" class="on-left" size="md">
    <q-menu>
        <div class="row no-wrap q-pa-md">
            <div class="column items-center">
            <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">Administrator</div>
            <div class="text-subtitle1 q-mb-xs">app.alusage.fr</div>
            <div class="text-subtitle1 q-mb-xs">Id : {{ authStore.user }} </div>

            <div v-for="(info, index) in authStore.loginInfos" :key="index">
                <q-checkbox v-model="info.isChecked" label=" Active DB" />
                <div>URL: {{ info.url }}</div>
                <div>Database: {{ info.db }}</div>
                <div>Login: {{ info.login }}</div>
                <div>Password: {{ info.password }}</div>
            </div>
            </div>
        </div>
    </q-menu>
</q-btn>
</template>
