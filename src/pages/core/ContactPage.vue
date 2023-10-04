<template>
  <q-page padding>
    <div class="q-pa-md" >
    <q-list bordered separator>


      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
      <q-item-section>
            Name
        </q-item-section>
<q-separator vertical inset/>
        <q-item-section side>
          <q-btn icon="o_mail" size="md"></q-btn>
        </q-item-section>
        <q-item-section side>
            <q-btn icon="o_phone" size="md"></q-btn>
        </q-item-section>
      </q-item>


    </q-list>
  </div>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="accent" />
          </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
