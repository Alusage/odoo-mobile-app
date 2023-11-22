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
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" class="GL__select-GL__menu-link">
        <q-item-section side>
          <!-- Icon for each option -->
          <q-icon name="collections_bookmark" />
        </q-item-section>
        <q-item-section>
          <!-- Displaying the label and ID of the option -->
          {{ scope.opt.label }} {{ scope.opt.id }} 
          <q-item-section v-if="scope.opt.isCompany">
            Entreprise
          </q-item-section>
          <q-item-section v-else>
            Particulier
          </q-item-section>
          
        </q-item-section>
        <q-item-section side :class="{ 'default-type': !scope.opt.type }">
          <!-- Button for additional action related to the option -->
          <q-btn outline dense no-caps text-color="blue-grey-5" size="12px" class="bg-grey-1 q-px-sm">
            {{ scope.opt.type || 'Jump to' }} 
            <!-- Arrow icon indicating the action -->
            <q-icon name="subdirectory_arrow_left" size="14px" />
          </q-btn> 
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'SearchBar',
  setup() {
    const { text, inputLabel, options, filteredOptions, search, filter } = useSearchBarLogic();
    const route = useRoute();

    // Watch for changes in the route and update the input label accordingly
    watchEffect(() => {
      inputLabel.value = "Search in" + " " + `${route.name || 'Unknown Page'}`;
    });

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

function useSearchBarLogic() {
  // Reactive references for the search bar state
  const text = ref('');
  const inputLabel = ref(`Search in`);
  const options = ref(null);
  const filteredOptions = ref([]);
  const search = ref(null);
  const isContactListFetched = ref(false);

  /** 
   * Function to fetch options for the dropdown. 
   * @param {Array} domain - Domain for fetching options.
   * @returns {Object} - Response from the API.
   */
  async function fetchOptions(domain) {
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
              [domain],
              {
                fields: ['name', 'email_normalized', 'phone', 'mobile', 'image_1920', 'street', 'street2', 'zip', 'city', 'write_date', 'function', 'is_company', 'commercial_company_name'],
              }
            ]
          }
        }
      };
      const response = await axios.request(dataOptions);
      options.value = response.data.result;
      isContactListFetched.value = true;
      filteredOptions.value = options.value.map((op) => ({ 
        label: op.name, 
        value: op.id,
        isCompany: op.is_company,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Function to filter options based on user input.
   * @param {string} val - User input for filtering options.
   * @param {Function} update - Function to update the filtered options.
   */
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
      fetchOptions(['|', ['name', 'ilike', val], ['email_normalized', 'ilike', val]]);
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