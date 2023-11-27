<template>
  <q-page padding>
    <!-- content -->


  </q-page>
</template>

<script>
import { ref, onMounted, defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent ({
  name: 'tasksPage',
  setup() {
    
    const tasksDatas = ref([]) // ref for the tasks datas
    const isTasksDatasFetched = ref(false)

    async function fetchTasks(domain) {
      try {
        const options = {
          method : 'POST',
          url : 'https://apps.alusage.fr/jsonrpc',
          headers : {
            'Content-Type' : 'application/json'
          },
          data : {
            jsonrpc : '2.0',
            params : {
              service : 'object',
              method : 'execute_kw',
              args : [
                  'odoo',
                  '2',
                  'admin',
                  'project.task',
                  'search_read',
                  [domain],
                  {
                    fields : [
                      'name',
                      'description',
                      'date_deadline',
                      'partner_id',
                    ],
                  }
              ]
            }

          }
        
        } 
        const response = await axios(options)
        console.log('response:', response.data.result)

        tasksDatas.value = response

        isTasksDatasFetched.value = true

        tasksDatas.value = response.data.result ? console.log("fetch did fetched") : console.log("fetch did not fetched")

        console.log("tasksDatas:", tasksDatas.value); // Log tasksDatas
        
        return response.data.result
      } catch (error) {
        console.error(error)
      }
    }
    onMounted(() => {
      fetchTasks()
    })

    return {
      fetchTasks,
    }
  }
})
</script>
