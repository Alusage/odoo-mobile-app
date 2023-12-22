<template>
  <!-- Search input using Quasar's q-select -->
  <q-select
    ref="search"
    dark dense standout use-input hide-selected clearable
    class="GL__toolbar-select"
    color="black"
    :stack-label="false"
    :label="inputLabel"
    v-model="useSearchBarLogic"
    :options="filteredOptions"
    option-label="name"
    @filter="filter"
    style="width: 31.25rem"
  >
    <!-- Append an icon to the search input -->
    <template v-slot:append>
      <!-- GitHub search icon -->
      <img src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg">
    </template>

    <!-- Display a spinner when no options are available -->
    <template v-slot:no-option>
      <q-item>
        <q-item-section>
          <div class="text-center">
            <!-- Loading spinner -->
            <q-spinner-pie color="grey-5" size="24px" />
          </div>
        </q-item-section>
      </q-item>
    </template>

    <!-- Display each option with icon and additional information -->
    <template v-slot:option="contacts">
      <q-item 
        v-bind="contacts.itemProps" 
        class="GL__select-GL__menu-link"
        @click="console.log(contacts.opt.label)"
      >
        <q-item-section side>
           <!-- Icon for each option -->
          <q-icon name="collections_bookmark" />
        </q-item-section>
        <q-item-section>
          <!-- Displaying the label and ID of the option -->
          {{ contacts.opt.label }} {{ contacts.opt.id }} 
          <q-item-section v-if="contacts.opt.isCompany">
            Entreprise, {{ contacts.opt.fromDb }}
          </q-item-section>
          <q-item-section v-else>
            Particulier, {{ contacts.opt.fromDb }}
          </q-item-section>
          
        </q-item-section>
        <q-item-section side :class="{ 'default-type': !contacts.opt.type }">
          <!-- Button for additional action related to the option -->
          <q-btn outline dense no-caps text-color="blue-grey-5" size="12px" class="bg-grey-1 q-px-sm"
          @click.stop="console.log('bouton cliqué')"
          >
            {{ contacts.opt.type || 'Jump to' }} 
            <!-- Arrow icon indicating the action -->
            <q-icon name="subdirectory_arrow_left" size="0.875rem" />
          </q-btn> 
        </q-item-section>
      </q-item>
    </template>
  </q-select>


</template>

<script>
import { defineComponent, ref, watchEffect, inject, onMounted } from 'vue';
import { useRoute } from 'vue-router';



export default defineComponent({
  
  name: 'SearchBar',
  
  setup() {
    
    const route = useRoute();

    const authStore = inject('authStore')
    const contactStore = inject('contactsStore')
    const tasksStore = inject('tasksStore')

    const { text, inputLabel, options, filteredOptions, search, filter } = useSearchBarLogic();
    
    onMounted(() => {
      contactStore.ReadContactsFromLocalStorage
      tasksStore.ReadContactsFromLocalStorage
      
    })

    // Watch for changes in the route and update the input label accordingly
    watchEffect(() => {
      inputLabel.value = "Search in" + " " + `${route.name || 'Unknown Page'}`;
    });

    function useSearchBarLogic() {
  // Reactive references for the search bar state
  const text = ref('');
  const inputLabel = ref(`Search in`);
  const options = ref(null);
  const filteredOptions = ref([]);
  const search = ref(null);

  
  function filter(val, update) {
    // Handle empty input
    if (val === '') {
      update(() => {
        filteredOptions.value = [];
      });
      return;
    }

    // Filter options based on user input
    update(() => {
      
      const filteredContacts = contactStore.contactsList.filter(contact => contact.name.includes(val) || (typeof contact.email === 'string' && contact.email.includes(val)))

      filteredOptions.value = filteredContacts.map(contact => ({
        label : contact.name,
        value : contact.id,
        isCompany: contact.is_company,
        fromDb: contact.fromDatabase,
      }))

      // fetchOptions(['|', ['name', 'ilike', val], ['email_normalized', 'ilike', val]]);
    });
  }

  // Return the state and methods for external use
  return {
    text,
    inputLabel,
    options,
    filteredOptions,
    search,
    filter,
  };
}

    return {
      text,
      inputLabel,
      options,
      filteredOptions,
      search,
      filter,
      useSearchBarLogic,
      authStore,
      contactStore,
      tasksStore,
    };
  },
    
});


</script>