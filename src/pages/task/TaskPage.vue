<template>
  <q-page padding>
    <div>
      <h2>Data Status</h2>
      <div v-if="dataRetrievalStatus === 'success'">
        Data retrieved successfully!
      </div>
      <div v-else-if="dataRetrievalStatus === 'loading'">
        Loading data...
      </div>
      <div v-else>
        Data retrieval failed. Please check local storage.
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'tasksPage',
  data() {
    return {
      storedData: null,
      dataRetrievalStatus: 'loading',
    };
  },
  methods: {
    retrieveDataFromLocalStorage() {
      try {
        const data = localStorage.getItem('tasksList');
        if (data) {
          this.storedData = JSON.parse(data);
          this.dataRetrievalStatus = 'success';
        }
      } catch (error) {
        console.error(error);
        this.dataRetrievalStatus = 'error';
      }
    },
  },
  onMounted() {
    retrieveDataFromLocalStorage();
  },
});
</script>
