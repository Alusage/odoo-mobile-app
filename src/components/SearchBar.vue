<template>
  <!-- Search input using Quasar's q-select -->
  <q-select
    ref="search"
    dark dense standout use-input hide-selected clearable
    class="GL__toolbar-select"
    color="black"
    :stack-label="false"
    :label="inputLabel"
    v-model="text"
    :options="filteredOptions"
    @filter="filter"
    style="width: 18.75rem"
  >
    <!-- Append an icon to the search input -->
    <template v-slot:append>
      <img src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg">
    </template>

    <!-- Display a spinner when no options are available during filtering -->
    <template v-slot:no-option>
      <q-item>
        <q-item-section>
          <div class="text-center">
            <q-spinner-pie color="grey-5" size="24px" />
          </div>
        </q-item-section>
      </q-item>
    </template>

    <!-- Customize the display of each option in the dropdown menu -->
    <template v-slot:option="scope">
      <q-item
        v-bind="scope.itemProps"
        class="GL__select-GL__menu-link"
      >
        <q-item-section side>
          <q-icon name="collections_bookmark" />
        </q-item-section>
        <q-item-section side :class="{ 'default-type': !scope.opt.type }">
          <q-btn outline dense no-caps text-color="blue-grey-5" size="12px" class="bg-grey-1 q-px-sm">
            {{ scope.opt.type || 'Jump to' }}
            <q-icon name="subdirectory_arrow_left" size="14px" />
          </q-btn>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { defineComponent, onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

/**
 * SearchBar component for handling search functionality.
 * Uses Quasar's q-select for the search input.
 */
export default defineComponent({
  name: 'SearchBar',

  // Setup function for the component
  setup() {
    // Use search bar logic to manage state and behavior
    const { text, inputLabel, options, filteredOptions, search, filter } = useSearchBarLogic();

    // Use Vue Router to get the current route
    const route = useRoute();

    // Watch for changes in the route and update the input label accordingly
    watchEffect(() => {
      inputLabel.value = "Search in" + " " + `${route.name || 'Unknown Page'}`;
    });

    // Return the properties and methods to be used in the template
    return {
      text,
      inputLabel,
      options,
      filteredOptions,
      search,
      filter,
    };
  },
});

/**
 * Custom logic for the search bar.
 * Manages the state and behavior of the search input.
 * @returns {Object} - State and methods for external use.
 */
function useSearchBarLogic() {
  // Reactive references for the search bar state
  const text = ref('');
  const inputLabel = ref(`Search in`);
  const options = ref(null);
  const filteredOptions = ref([]);
  const search = ref(null);

  // Example options for the dropdown
  // const stringOptions = ['Option 1', 'Option 2', 'Option 3'];

  const isContactListFetched = ref(false);

  /** 
   * Function to fetch options for the dropdown. 
   * @returns {Object} - state and methods for external use.
   */
  async function fetchOptions() {
    try {
      const dataOptions = {
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
              'odoo',
              '2',
              'admin',
              'res.partner',
              'search_read',
              [[]],
              {
                fields: ['name', 'email_normalized', 'phone', 'mobile', 'image_1920', 'street', 'street2', 'zip', 'city', 'write_date', 'function'],
              }
            ]
          }
        }
      } ;
      const response = await axios.request(dataOptions);
      options.value = response.data.result;
      isContactListFetched.value = true;

      console.log(options.value)
      console.log(options.value[10].name)

    } catch (error) {
      console.error(error);
    }

  }

  onMounted(() => {
    fetchOptions();
  });

  /**
   * Function to filter options based on user input.
   * @param {string} val - User input for filtering options.
   * @param {Function} update - Function to update the filtered options.
   */
  function filter(val, update) {
    // Simulate an asynchronous fetch of options
    if (options.value === null || !isContactListFetched.value) {
      setTimeout(() => {
        console.warn('Options not yet fetched.');
        // options.value = stringOptions;
        search.value.filter('');
      }, 2000);
      update();
      return;
    }

    // Handle empty input
    if (val === '') {
      update(() => {
        filteredOptions.value = options.value.map((op) => ({ label: op }));
      });
      return;
    }

    // Filter options based on input
    update(() => {
      filteredOptions.value = [
        { label: val, type: 'In this module' },
        { label: val, type: 'All app' },
        { label: val, type: 'In this server' },
        ...options.value
          .filter((op) => op.toLowerCase().includes(val.toLowerCase()))
          .map((op) => ({ label: op })),
      ];
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
</script>
