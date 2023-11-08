<template>
  <div>
    <!-- <h2>{{ contact.name }}</h2>
    <p> {{ contact.street }}</p>
    <p> {{ contact.street2 }}</p>
    <p> {{ contact.zip }}</p>
    <p> {{ contact.city }}</p>
    <p> {{ contact.phone }}</p>
    <p> {{ contact.email }}</p> -->

    <q-card class="my-card" flat bordered rounded>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img v-if="getBase64Image(contact)" :src="getBase64Image(contact)" alt="contact picture">
            <q-avatar v-else>
              {{ getInitials(contact.name) }}
            </q-avatar>
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
          {label: 'Add Task', value: 'addTask', icon: 'add_task'},
        ]" 
        rounded
        label-class="q-btn-toggle-label-custom"/>
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
  }, 
  methods: {
    getBase64Image(contact) {
      return contact.image_1920 ? `data:image/png;base64,${contact.image_1920}` : null;
    },
    getAvatarColor(name) {
      const hash = [...name].reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);

      return colors[Math.abs(hash % colors.length)];
    },
    getInitials(name) {
      return name.charAt(0).toUpperCase();
    }

  }
}
</script>



