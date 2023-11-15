<template>
  <q-layout view="hHh Lpr lff">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat icon="o_menu" size='md' @click="leftDrawer = !leftDrawer" />

        <q-toolbar-title class="large-screen-only">

          {{ pageTitle }}
        </q-toolbar-title>

        <q-btn
        flat 
        round
        @click="$q.dark.toggle()"
        :icon="$q.dark.isActive ? 'o_nights_stay' : 'o_wb_sunny'"
        >

        </q-btn>

        <q-btn flat icon="o_account_circle" class="on-left" size='md'>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">Administrator</div>
                <div class="text-subtitle1  q-mb-xs">app.alusage.fr</div>

                <q-separator vertical inset class="q-mx-lg" />
                <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
              </div>
            </div>
          </q-menu>
        </q-btn>

        <q-btn flat icon="o_settings" class="on-left" size='md' @click="toggleSettingsDrawer" />
        
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawer" side="left" show-if-above :mini="miniState" @mouseover="miniState = false"
      @mouseout="miniState = true" :width="200" :breakpoint="500" bordered>


      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple :active="isRouteActive('/dashboard')" @click="navigateToPage('/dashboard')">
            <q-item-section avatar>
              <q-avatar color="deep-purple" text-color="white" icon="o_home" />
            </q-item-section>

            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple :active="isRouteActive('/notification')" @click="navigateToPage('/notification')">
            <q-item-section avatar>
              <q-avatar color="deep-purple" text-color="white" icon="o_notifications"><q-badge color="red"
                  floating>12</q-badge></q-avatar>

            </q-item-section>

            <q-item-section>
              Notifications
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple :active="isRouteActive('/contact')" @click="navigateToPage('/contact')">
            <q-item-section avatar>
              <q-avatar color="deep-purple" text-color="white" icon="o_contact_page" />
            </q-item-section>

            <q-item-section>
              Contact
            </q-item-section>
          </q-item>



          <q-item clickable v-ripple :active="isRouteActive('/task')" @click="navigateToPage('/task')">
            <q-item-section avatar>
              <q-avatar color="deep-purple" text-color="white" icon="o_task_alt" />
            </q-item-section>

            <q-item-section>
              Task
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-drawer v-model="settingsDrawerOpen" side="right" behavior="mobile" elevated>

      <q-list bordered separator>
        <q-item-label header>Settings</q-item-label>

        <q-separator></q-separator>


       
        <q-item-label header>Servers</q-item-label>
        <q-item v-for="(server,id) in state.servers" :key="id">
          <q-item-section>{{ server.x_url }}</q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <q-footer elevated>
        <q-toolbar>
          
        </q-toolbar>
      </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref , onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter, } from 'vue-router'
import axios from 'axios'
import { useQuasar } from 'quasar'


export default {
  name: 'MainLayout',
  setup() {
    const state = reactive({
      Uapikey: 'admin',
      Udb: 'odoo',
      UmyId: '2',
      servers: [],
      rowsApi: ref([]),


    }) ; 

    const $q = useQuasar();
    const leftDrawer = ref(false)
    const settingsDrawerOpen = ref(false)
    const miniState = ref(true)
    const pageTitle = ref('');

    const router = useRouter();
    const route = useRoute();

   watch(route, (newRoute) => {
     pageTitle.value = newRoute.name; // update pageTitle with the new route's name
   });
    const navigateToPage = (path) => {
      router.push(path);
    }
    const isRouteActive = (path) => {
      return route.path === path;
    }
    const fetchServerList = async () => {
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
                state.Udb,
                state.UmyId,
                state.Uapikey,
                'x_server_login',
                'search_read',
                [[["x_local_user_id", "=", Number(state.UmyId)]]],



              ]
            }
          }
        };
        const responseServer = await axios.request(options);
        state.servers = responseServer.data.result;

        console.log(state.servers)
      } catch (error) {
        console.error(error);
      }

    }

    onMounted(() => {
      fetchServerList()

    })
    return {
      state,
      leftDrawer,
      settingsDrawerOpen,
      miniState,
      navigateToPage,
      isRouteActive,
      fetchServerList,
      pageTitle,
      toggleSettingsDrawer() {
        settingsDrawerOpen.value = !settingsDrawerOpen.value
      },
    } ; 
  },
} ; 
</script>

<style lang="scss">

.q-toolbar {
  background-color: $color-primary-light ;
  color: $color-on-primary-light ; 
}

.q-avatar {
  background-color: $color-primary-light ;
  color: $color-on-primary-light ; 
}

</style>