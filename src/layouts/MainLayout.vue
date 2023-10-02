<template>
  <q-layout view="lHh lpR lFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat icon="o_menu" size='md'  @click="toggleLeftDrawer" />

        <q-toolbar-title>

            <img src="\images\odoo-logo.png" width="100">

            Mobile App
        </q-toolbar-title>
        <q-btn flat icon="o_notifications" @click="toggleNotificationDrawer"></q-btn>
        <q-btn flat icon="o_settings" class="on-left" size='md' @click="toggleSettingsDrawer"/>
        <q-btn flat icon="o_account_circle" class="on-left" size='md' @click="toggleProfileDrawer"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" elevated>
      Menu drawer
    </q-drawer>
    <q-drawer v-model="settingsDrawerOpen" side="right" behavior="mobile" elevated>
      Settings drawer
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

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const settingsDrawerOpen = ref(false)
    const profileDrawerOpen = ref(false)
    const notificationDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      settingsDrawerOpen,
      profileDrawerOpen,
      notificationDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      toggleSettingsDrawer () {
        settingsDrawerOpen.value = !settingsDrawerOpen.value
      },
      toggleProfileDrawer () {
        profileDrawerOpen.value = !profileDrawerOpen.value
      },
      toggleNotificationDrawer () {
        notificationDrawerOpen.value = !notificationDrawerOpen.value
      },

    }
  },
}
</script>
