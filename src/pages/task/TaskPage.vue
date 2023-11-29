<template>
  <q-page padding>
   
    <div>
      <h2>Tasks List </h2>
    <pre>
      <p v-for="task in tasksStore.tasksList" :key="task.id">
        {{ task.name }}
        {{ task.description }}
      </p>
    </pre>
    </div>
  </q-page>  
</template>

<script>
import { defineComponent, inject } from 'vue';

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
