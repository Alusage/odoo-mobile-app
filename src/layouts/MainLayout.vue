"
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-grey-3 text-white">
      <q-toolbar>
        

        <!-- <SearchBar>
        </SearchBar> -->

        

        <q-btn flat rounded @click="fetchContactsStore"> Get Contacts </q-btn>
        <q-btn flat rounded @click="fetchTaskStore"> Get Tasks </q-btn>

        <UserModal/>

        <q-btn
        rounded
          flat
          icon="o_settings"
          class="on-left"
          size="md"
          @click="toggleSettingsDrawer"
        />
      </q-toolbar>
    </q-header>
    <!-- left drawer -->
    <q-drawer
      v-model="leftDrawer"
      side="left"
      show-if-above
      :mini="miniState"
      @click="miniState = false"
      @mouseout="miniState = true"
      :width="270"
      :breakpoint="500"
    >
      <q-scroll-area class="fit">
        
        <q-list padding v-for="(info, index) in authStore.loginInfos" :key="index">
          
          <q-item>
            <q-checkbox checked-icon="dns" unchecked-icon="dns"  v-model="info.isChecked" q-mini-drawer-only>
            <q-item-label q-mini-drawer-hide>
               Database : {{ info.db }}
               
               <q-item-label lines="2">
                Login : {{ info.login }}
               </q-item-label>
               <q-item-label caption>
                {{ info.url }}
               </q-item-label>
            </q-item-label>
           
          </q-checkbox>
          </q-item>
          <q-separator/>
        </q-list>
      </q-scroll-area>
    </q-drawer>
          
          
          <!-- <q-item
            clickable
            v-ripple
            :active="isRouteActive('/dashboard')"
            @click="navigateToPage('/dashboard')"
          >
            <q-item-section avatar>
              <q-avatar color="deep-purple" text-color="white" icon="o_home" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            :active="isRouteActive('/notification')"
            @click="navigateToPage('/notification')"
          >
            <q-item-section avatar>
              <q-avatar
                color="deep-purple"
                text-color="white"
                icon="o_notifications"
                ><q-badge color="red" floating>12</q-badge></q-avatar
              >
            </q-item-section>

            <q-item-section> Notifications </q-item-section>
          </q-item>

          <q-separator />

          <q-item
            clickable
            v-ripple
            :active="isRouteActive('/contacts')"
            @click="navigateToPage('/contacts')"
          >
            <q-item-section avatar>
              <q-avatar
                color="deep-purple"
                text-color="white"
                icon="o_contact_page"
              />
            </q-item-section>

            <q-item-section> Contacts </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="isRouteActive('/task')"
            @click="navigateToPage('/task')"
          >
            <q-item-section avatar>
              <q-avatar
                color="deep-purple"
                text-color="white"
                icon="o_task_alt"
              />
            </q-item-section>

            <q-item-section> Task </q-item-section>
          </q-item> -->
       
    <!-- right drawer -->
    <q-drawer
      v-model="settingsDrawerOpen"
      side="right"
      behavior="mobile"
      elevated
    >
      <q-list bordered separator>
        <q-item-label header>Settings</q-item-label>

        <q-separator></q-separator>

        <q-item-label header>Servers</q-item-label>
        <q-item v-for="(server, id) in state.servers" :key="id">
          <q-item-section>{{ server.x_url }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-footer elevated>
      <q-toolbar> 
        <q-toolbar-title>
          <q-btn flat icon="o_menu" size="md" @click="leftDrawer = !leftDrawer" />
          <q-btn falt icon="o_home" size="md" @click="navigateToPage('/dashboard')"/>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref , onMounted, reactive, watch, provide } from 'vue'
import { useRoute, useRouter, } from 'vue-router'
import { useContactsStore } from 'src/stores/ContactsStore'
import { useTasksStore } from 'src/stores/TasksStore'
import { useAuthStore } from 'src/stores/AuthStore'
// import axios from 'axios'
// import { useQuasar } from 'quasar'
import  UserModal  from 'src/components/UserModal.vue'

export default {
  name: 'MainLayout',
  components: {
    UserModal,
  },
  setup() {
    const state = reactive({
      // Uapikey: "admin",
      // Udb: "odoo",
      // UmyId: "2",
      servers: [],
      rowsApi: ref([]),
      contactsList: []
    });

    const contactsStore = useContactsStore();
    const tasksStore = useTasksStore();
    const authStore = useAuthStore();

    console.log(authStore.isLoggedIn)

    const userId = authStore.user 
    console.log(userId);

    const leftDrawer = ref(false);
    const settingsDrawerOpen = ref(false);
    const miniState = ref(true);
    const pageTitle = ref("");

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      authStore.readUserFromLocalStorage();
      console.log(authStore.user);
      contactsStore.ReadContactsFromLocalStorage();
      tasksStore.ReadTasksFromLocalStorage();
    });

    // Watch loginInfos and update local storage whenever it changes
    watch(() => authStore.loginInfos, () => {
    localStorage.setItem('loginInfos', JSON.stringify(authStore.loginInfos));
    
    }, 
    { deep: true })  // Use deep watcher to watch changes in object properties


    provide("contactsStore", contactsStore);
    provide("tasksStore", tasksStore);
    provide("authStore", authStore);

    const fetchTaskStore = tasksStore.fetchTasksList;
    const fetchContactsStore = contactsStore.fetchContactsList;

    watch(route, (newRoute) => {
      pageTitle.value = newRoute.name; // update pageTitle with the new route's name
    });
    const navigateToPage = (path) => {
      router.push(path);
    };
    const isRouteActive = (path) => {
      return route.path === path;
    };

    const redirectToLogin = () => {
      if (authStore.isLoggedIn.valueOf()  == false ) {
        router.push("/")
      }
    }
    // const fetchServerList = async () => {
    //   try {
    //     const options = {
    //       method: "POST",
    //       url: "https://apps.alusage.fr/jsonrpc",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       data: {
    //         jsonrpc: "2.0",
    //         params: {
    //           service: "object",
    //           method: "execute_kw",
    //           args: [
    //             state.Udb,
    //             state.UmyId,
    //             state.Uapikey,
    //             "x_server_login",
    //             "search_read",
    //             [[["x_local_user_id", "=", Number(state.UmyId)]]],
    //           ],
    //         },
    //       },
    //     };
    //     const responseServer = await axios.request(options);
    //     state.servers = responseServer.data.result;

    //     console.log(responseServer.data.result);
        
    //     console.log(state.servers);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    onMounted(async () => {
      // await fetchServerList();
       await contactsStore.fetchContactsList()
      // isContactsListLoaded.value = true;
      await tasksStore.fetchTasksList()
    });

    return {
      state,
      leftDrawer,
      settingsDrawerOpen,
      miniState,
      navigateToPage,
      isRouteActive,
      // fetchServerList,
      pageTitle,
      toggleSettingsDrawer() {
        settingsDrawerOpen.value = !settingsDrawerOpen.value;
      },
      // contactsList,
      tasksStore,
      contactsStore,
      fetchTaskStore,
      fetchContactsStore,
      authStore,
      redirectToLogin,
      userId,
      UserModal
      // tasksStore,
      // isContactsListLoaded,
      // localStorage,
    };
  },
};
</script>

<style lang="scss">
.q-toolbar {
  background-color: $q-primary;
  color: $color-on-primary-light;
}

.q-avatar {
  background-color: $q-primary;
  color: $color-on-primary-light;
}
</style>
