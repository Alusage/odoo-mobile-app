<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue' ; 
import { useQuasar } from 'quasar' ;
import { pinia } from './stores/pinia' ; 

export default defineComponent({
  name: 'App', 
  setup() {
    const $q = useQuasar() ;

    $q.dark.set(false);
  },
}) ;
</script>
