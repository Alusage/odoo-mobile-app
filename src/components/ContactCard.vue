<template>
  <div>
    <!-- <h2>{{ contact.name }}</h2>
    <p> {{ contact.street }}</p>
    <p> {{ contact.street2 }}</p>
    <p> {{ contact.zip }}</p>
    <p> {{ contact.city }}</p>
    <p> {{ contact.phone }}</p>
    <p> {{ contact.email }}</p> -->

    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name || "Name not specified" }}</q-item-label>
          <q-item-label caption>
            {{ contact.email || "Email not specified" }}, {{ contact.phone || "Phone not specified" }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section>
          {{ contact.city || "City not specified" }}, {{ contact.zip || "ZIP code not specified" }}
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-4">
          {{ contact.street || "Street not specified" }} {{ contact.street2 || "" }}
        </q-card-section>
      </q-card-section>

      <q-separator />
      <q-item>
        <q-btn-toggle :options ="[
          {label: 'Udpate', value: 'info', icon: 'update'},
          {label: 'Delete', value: 'deleteContact', icon: 'delete'},
          {label: 'Share infos', value: 'share', icon: 'share'},
          {label: 'Add Task', value: 'addTask', icon: 'add_task'},
        ]"/>
        </q-item>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true
    }
  }
}
</script>
