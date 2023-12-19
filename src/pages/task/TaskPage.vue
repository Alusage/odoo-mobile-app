<template>
  <q-page >
   
    <q-list bordered separator>
      <q-slide-item  
      @right="onRight" right-color="green"
      @left="onLeft" left-color="blue"
        v-for="task in tasksStore.tasksList"
        :key="task.id" >

        <template v-slot:left>
          <q-btn flat icon="hourglass_top" label="Set Timer, start task"/>
        </template>
        <template v-slot:right>
          <q-btn flat icon="hourglass_bottom" label="Stop Timer, task done"/>
        </template>
      <q-item
        clickable
        v-ripple
      >
        <q-item-section>
          {{ task.name }}
          <q-item-label caption>
            From db : {{ task.FromDatabase }}
          </q-item-label>
          <q-separator/>
            {{ task.description  }}
        </q-item-section>
      </q-item>
      </q-slide-item>
    </q-list>

    <!-- toDo : Add timer vue for task where Is timerSet=true -->

  </q-page>  
</template>

<script>
import { useQuasar } from 'quasar';
import { defineComponent, inject, watch, onBeforeMount, ref } from 'vue';

export default defineComponent({
  name: 'tasksPage',
  data() {
    return {
      storedData: null,
      dataRetrievalStatus: 'loading',
    };
  },
  setup() {
    const $q = useQuasar(); 
    const tasksStore = inject("tasksStore");
    const authStore = inject("authStore");
    const cleanTaskDescriptions = ref([]);

   
    

    let timer
    function finalize (reset){
      timer= setTimeout(()=>{
        reset()
      }, 3000)
    }

    onBeforeMount(() => {
      clearTimeout(timer)
    });

    // Watch loginInfos and update local storage whenever it changes
    watch(() => authStore.loginInfos, () => {
      tasksStore.ReadTaskFromLocalStorage;
       cleanTaskDescriptions.value = tasksStore.tasksList.map(task => task.description.replace(/<[^>]*>/g, ""))
    }, 
    { deep: true })  // Use deep watcher to watch changes in object properties

    return {
      tasksStore,
      cleanTaskDescriptions,

      onLeft ({ reset }) {
        $q.notify('Timer started, task is in progress')
        finalize(reset)
      },

      onRight ({ reset }) {
        $q.notify('Timer stopped, task is done')
        finalize(reset)
      },
    }
  },
 
});
</script>
