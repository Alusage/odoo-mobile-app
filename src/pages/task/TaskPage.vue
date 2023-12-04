<template>
  <q-page padding>
   
    <div class="q-pa-md">
    <q-card class="my-card  " flat bordered>
      <q-card-section>
        <div class="text-h6">Tasks</div>
        <div class="text-subtitle2">Tasks from server.id </div>
      </q-card-section>

      <q-separator/>

      <q-markup-table>
        <thead >
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Date Deadline</th>
            <th class="text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasksStore.tasksList" :key="task.id">
            <td class="text-center">{{ task.name }}</td>
            <td class="text-center">{{ task.date_deadline }}</td>
            <td class="text-left">{{ task.description }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </div>

  <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Overline</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>

        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat>
            7:30PM
          </q-btn>
          <q-btn flat color="primary">
            Reserve
          </q-btn>
        </q-card-actions>
    </q-card>
  </div>

  </q-page>  
</template>

<script>
import { defineComponent, inject, watch } from 'vue';

export default defineComponent({
  name: 'tasksPage',
  data() {
    return {
      storedData: null,
      dataRetrievalStatus: 'loading',
    };
  },
  setup() {
    const tasksStore = inject("tasksStore");
    const authStore = inject("authStore");

    // Watch loginInfos and update local storage whenever it changes
    watch(() => authStore.loginInfos, () => {
      tasksStore.fetchTasksList();
    }, 
    { deep: true })  // Use deep watcher to watch changes in object properties

    return {
      tasksStore,
    }
  },
  methods: {
    
  },
  // onMounted() {
    
  // },
});
</script>
