"<template>
  <q-layout view="hHh Lpr lff">
    
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat icon="o_menu" size='md' @click="leftDrawer = !leftDrawer" />

        <!-- <SearchBar>
        </SearchBar> -->

        <q-btn
        flat 
        round
        @click="$q.dark.toggle()"
        :icon="$q.dark.isActive ? 'o_nights_stay' : 'o_wb_sunny'"
        >

        </q-btn>

        <q-btn @click="contactsStore.fetchContactsList()">
          Get Contacts 
        </q-btn>

        <q-btn flat icon="o_account_circle" class="on-left" size='md'>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">Administrator</div>
                <div class="text-subtitle1  q-mb-xs">app.alusage.fr</div>

                <q-separator vertical inset class="q-mx-lg" />
                <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
              </div>
            </div>
          </q-menu>
        </q-btn>

        <q-btn flat icon="o_settings" class="on-left" size='md' @click="toggleSettingsDrawer" />
        
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawer" side="left" show-if-above :mini="miniState" @mouseover="miniState = false"
      @mouseout="miniState = true" :width="200" :breakpoint="500" bordered>


      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple :active="isRouteActive('/dashboard')" @click="navigateToPage('/dashboard')">
            <q-item-section avatar>
              <q-avatar color="deep-purple" text-color="white" icon="o_home" />
            </q-item-section>

            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple :active="isRouteActive('/notification')" @click="navigateToPage('/notification')">
            <q-item-section avatar>
              <q-avatar color="deep-purple" text-color="white" icon="o_notifications"><q-badge color="red"
                  floating>12</q-badge></q-avatar>

            </q-item-section>

            <q-item-section>
              Notifications
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple :active="isRouteActive('/contacts')" @click="navigateToPage('/contacts')">
            <q-item-section avatar>
              <q-avatar color="deep-purple" text-color="white" icon="o_contact_page" />
            </q-item-section>

            <q-item-section>
              Contacts
            </q-item-section>
          </q-item>



          <q-item clickable v-ripple :active="isRouteActive('/task')" @click="navigateToPage('/task')">
            <q-item-section avatar>
              <q-avatar color="deep-purple" text-color="white" icon="o_task_alt" />
            </q-item-section>

            <q-item-section>
              Task
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-drawer v-model="settingsDrawerOpen" side="right" behavior="mobile" elevated>

      <q-list bordered separator>
        <q-item-label header>Settings</q-item-label>

        <q-separator></q-separator>


       
        <q-item-label header>Servers</q-item-label>
        <q-item v-for="(server,id) in state.servers" :key="id">
          <q-item-section>{{ server.x_url }}</q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <!-- <div>
      <h2>Contacts List</h2>
      <pre>
        <p v-for="contact in contactsStore.contactsList" :key="contact.id">
          {{ contact.name }}
        </p>
      </pre>
    </div> -->

  <!-- <div>
    <h2>Contacts List</h2>
    <pre v-if="contactsStore.loading">Loading...</pre>
    <pre v-else>
      <div>Total Contacts: {{ contactsStore.totalContacts }}</div>
      <div>Company Contacts: {{ contactsStore.companyContacts.length }}</div>
    </pre>
  </div>-->
  <!-- <q-div> 
    <h2>Tasks List</h2>
    <h3>{{ taskStore.tasksList.name }}</h3>
    <pre v-if="taskStore.loading">Loading...</pre>
    <pre v-else>{{ taskStore.tasksList }}</pre>
  </q-div>-->

     
  <!-- <div>
    <h2>Contacts List</h2>
    <pre>
      <p v-for="contact in contactsList" :key="contact.id">
        {{ contact.name }}
      </p>
    </pre>
  </div> -->
  
  <!-- 
  <div>
    <h2>Tasks List</h2>
     <pre v-if="tasksStore.loading">Loading...</pre>
     <pre v-else>{{ tasksStore.tasksList }}</pre>
  </div>  -->

  
  <!-- <div>
    <h2>Contact Details</h2>
    <div v-if="selectedContact">
      <p>Name: {{ selectedContact.name }}</p>
      <p>Email: {{ selectedContact.email }}</p>
      <p>Phone: {{ selectedContact.phone }}</p>
      
    </div>
    <div v-else>
      <p>No contact selected</p>
    </div>
  </div> -->

  <!-- <div>
    <h2>Tasks List</h2>
    <div v-for="(task, index) in tasksList" :key="task.id">
      <h3>Tâches {{ index + 1 }}</h3>
      <p>Name: {{ task.name }}</p>
      <p>Description: {{ task.description }}</p>
    </div>
  </div>

  
    <div>
      <h2>Contacts List</h2>
      <div v-if="contactsList">
        <div v-for="(contact, index) in contacts.id" :key="contact.id">
          <h3>Contact {{ index + 1 }}</h3>
          <p>Name: {{ contact.name }}</p>
          <p>Email: {{ contact.email }}</p>
          <p>Phone: {{ contact.phone }}</p>
        </div>
      </div>
      <div v-else>
        <p>No contact selected</p>
      </div>
      
    </div> -->
  

    <q-footer elevated>
        <q-toolbar>
          
        </q-toolbar>
      </q-footer>

    <q-page-container>
      
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import { useQuasar } from 'quasar'
import { ref , onMounted, watch, reactive, provide  } from 'vue'
import { useRoute, useRouter, } from 'vue-router'
import axios from 'axios'
// import { useQuasar } from 'quasar'
// import SearchBar from '../components/SearchBar.vue'
import { useContactsStore } from 'src/stores/ContactsStore'
// import { useTasksStore } from 'src/stores/tasksStore'

// import { useStores } from '../stores/useStores'


export default {
  name: 'MainLayout',
  // components: {
  //   SearchBar,
  // },
  // data(){
  //   return {
  //     isContactSelected: false,
  //     selectedContact: null,
  //   }
  // },
  // methods: {
  //   handleContactSelected(contact){
  //     this.selectedContact = contact
  //     this.isContactSelected = true
  //   },

   
  // },
  // computed: {
  //   selectedContact(){
  //     return this.$store.getter['contacts/getContactById'](0); 
  //   }
  // },
  setup() {
    const state = reactive({
      Uapikey: 'admin',
      Udb: 'odoo',
      UmyId: '2',
      servers: [],
      rowsApi: ref([]),
      // contactsList: []


    }) ; 

    // const $q = useQuasar()
    // const allData = $q.localStorage.getAll();
    // const contactsList = allData.contactsList;
    
    // console.log(contactsList)

    // const contactsList = localStorage.contactsList
    
    // const { contactsList, tasksList } = useStores();

    const contactsStore = useContactsStore() ;

    // const tasksStore = useTasksStore() ; 

    // console.log(contactsStore.contactsList) ; 
    // console.log(tasksStore.tasksList) ;

    // console.log(contactsStore.fields)

    // console.log("contactsList", contactsList);
    // console.log("tasksList", tasksList);

    // console.log(isRef(contactsList)); // true if contactsList is a ref
    // console.log(isRef(tasksList)); // true if tasksList is a ref

    // console.log(isReactive(contactsList)); // true if contactsList is a reactive object
    // console.log(isReactive(tasksList)); // true if tasksList is a reactive object

    // const storedContacts = localStorage.getItem('contactsList');
    // if (storedContacts) {
    //   contactsList.value = JSON.parse(storedContacts);
    // }

    // const storedTasks = localStorage.getItem('tasksList');
    // if (storedTasks) {
    //   tasksList.value = JSON.parse(storedTasks);
    // }

    
    

    // const $q = useQuasar();
    const leftDrawer = ref(false)
    const settingsDrawerOpen = ref(false)
    const miniState = ref(true)
    const pageTitle = ref('');

    const router = useRouter();
    const route = useRoute(); 
    // const isContactsListLoaded = ref(false);

    onMounted(() => {

      contactsStore.ReadContactsFromLocalStorage();

      // const storedContacts = localStorage.getItem('contactsList'); 

      // if (storedContacts) {
      //   contactsList.value = JSON.parse(storedContacts) ; 
      // }

      // const storedTasks = localStorage.getItem('tasksList');
      // if(storedTasks){
      //   tasksList.value = JSON.parse(storedTasks);
      //   (storedTasks)
      // }
    });
    
    provide('contactsStore', contactsStore);

   watch(route, (newRoute) => {
     pageTitle.value = newRoute.name; // update pageTitle with the new route's name
   });
    const navigateToPage = (path) => {
      router.push(path);
    }
    const isRouteActive = (path) => {
      return route.path === path;
    }
    const fetchServerList = async () => {
      try {
        const options = {
          method: 'POST',
          url: 'https://apps.alusage.fr/jsonrpc',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            jsonrpc: '2.0',
            params: {
              service: 'object',
              method: 'execute_kw',
              args: [
                state.Udb,
                state.UmyId,
                state.Uapikey,
                'x_server_login',
                'search_read',
                [[["x_local_user_id", "=", Number(state.UmyId)]]],



              ]
            }
          }
        };
        const responseServer = await axios.request(options);
        state.servers = responseServer.data.result;

        console.log(state.servers)
      } catch (error) {
        console.error(error);
      }

    }

    onMounted(async () => {
     await  fetchServerList()
    //  await  contactsStore.fetchContactsList()
      // isContactsListLoaded.value = true;
      // await taskStore.fetchTasksList()

    })

    return {
      state,
      leftDrawer,
      settingsDrawerOpen,
      miniState,
      navigateToPage,
      isRouteActive,
      fetchServerList,
      pageTitle,
      toggleSettingsDrawer() {
        settingsDrawerOpen.value = !settingsDrawerOpen.value
      },
      // contactsList,
      // tasksList, 
      contactsStore,
      // tasksStore,
      // isContactsListLoaded,
      // localStorage,
      
    }
  } 
}

</script>

<style lang="scss">

.q-toolbar {
  background-color: $color-primary-light ;
  color: $color-on-primary-light ; 
}

.q-avatar {
  background-color: $color-primary-light ;
  color: $color-on-primary-light ; 
}

</style>