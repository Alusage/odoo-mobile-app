<template>
  <q-layout view="hHh lpR lFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat icon="o_menu" size='md' @click="leftDrawer = !leftDrawer" />

        <q-toolbar-title>

          <img src="\images\odoo-logo.png" width="100">

          Mobile App
        </q-toolbar-title>

        <q-btn flat icon="o_settings" class="on-left" size='md' @click="toggleSettingsDrawer" />
        <q-btn flat icon="o_account_circle" class="on-left" size='md'><q-menu>
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
          </q-menu></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawer" side="left" show-if-above :mini="miniState" @mouseover="miniState = false"
      @mouseout="miniState = true" :width="200" :breakpoint="500" bordered>


      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <q-item clickable v-ripple :active="isActive('/dashboard')" @click="navigateToPage('/dashboard')">
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white" icon="o_home" />
            </q-item-section>

            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple :active="isActive('/notification')" @click="navigateToPage('/notification')">
            <q-item-section avatar>
              <q-avatar color="orange" text-color="white" icon="o_notifications"><q-badge color="red"
                  floating>12</q-badge></q-avatar>

            </q-item-section>

            <q-item-section>
              Notifications
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple :active="isActive('/contact')" @click="navigateToPage('/contact')">
            <q-item-section avatar>
              <q-avatar color="purple" text-color="white" icon="o_contact_page" />
            </q-item-section>

            <q-item-section>
              Contact
            </q-item-section>
          </q-item>



          <q-item clickable v-ripple :active="isActive('/task')" @click="navigateToPage('/task')">
            <q-item-section avatar>
              <q-avatar color="green" text-color="white" icon="o_task_alt" />
            </q-item-section>

            <q-item-section>
              Task
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-drawer v-model="settingsDrawerOpen" side="right" behavior="mobile" elevated>
      <q-list>
        <q-item-label header>Settings</q-item-label>
      </q-list>
    </q-drawer>
    <q-drawer v-model="profileDrawerOpen" side="right" behavior="mobile" elevated>
      Profile drawer
    </q-drawer>
    <q-drawer v-model="notificationDrawerOpen" side="right" behavior="mobile" elevated>
      Notification drawer
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter, } from 'vue-router'
import { onMounted, reactive } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const state = reactive({
      apikey: 'admin',
      db: 'odoo',
      myId: '2',
      rows: [],

    })
    const leftDrawer = ref(false)
    const settingsDrawerOpen = ref(false)
    const profileDrawerOpen = ref(false)
    const notificationDrawerOpen = ref(false)
    const miniState = ref(true)

    const router = useRouter();
    const route = useRoute();

    const navigateToPage = (path) => {
      router.push(path);
    }
    const isActive = (path) => {
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
                state.db,
                state.myId,
                state.apikey,
                'x_server_login',
                'search_read',
                [[["x_local_user_id", "=", Number(state.myId)]]],



              ]
            }
          }
        };
        const response = await axios.request(options);
        state.rows = response.data.result;

        console.log(state.rows)
      } catch (error) {
        console.error(error);
      }

    }
    const fetchApiKeys = async () => {
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
                state.db,
                state.myId,
                state.apikey,
                'res.users.apikeys',
                '_generate',
                [[]],



              ]
            }
          }
        };
        const responseapi = await axios.request(options);
        state.rowsapi = responseapi.data.result;

        console.log(state.rowsapi)
      } catch (error) {
        console.error(error);
      }

    }
    onMounted(() => {
      fetchServerList()
      fetchApiKeys()
    })
    return {
      leftDrawer,
      settingsDrawerOpen,
      profileDrawerOpen,
      notificationDrawerOpen,
      miniState,
      navigateToPage,
      isActive,
      fetchServerList,
      fetchApiKeys,


      toggleSettingsDrawer() {
        settingsDrawerOpen.value = !settingsDrawerOpen.value
      },
      toggleProfileDrawer() {
        profileDrawerOpen.value = !profileDrawerOpen.value
      },
      toggleNotificationDrawer() {
        notificationDrawerOpen.value = !notificationDrawerOpen.value
      },

    }



  },
}
</script>
