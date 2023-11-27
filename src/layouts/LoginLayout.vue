<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>


        <q-toolbar-title>
          Odoo Mobile App login
        </q-toolbar-title>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />

    </q-page-container>
  </q-layout>
</template>

<style lang="scss">

.q-toolbar {
  background-color: $color-primary-light ;
  color: $color-on-primary-light ; 
}

</style>
