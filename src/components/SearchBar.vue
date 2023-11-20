<template>
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
    <template v-slot:append>
      <img src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg">
    </template>

    <template v-slot:no-option>
      <q-item>
        <q-item-section>
          <div class="text-center">
            <q-spinner-pie color="grey-5" size="24px" />
          </div>
        </q-item-section>
      </q-item>
    </template>

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
import { defineComponent, ref , watchEffect } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'SearchBar',
  setup() {
    const { text, inputLabel, options, filteredOptions, search, filter } = useSearchBarLogic();
    const route = useRoute();
    watchEffect(() => {
      inputLabel.value = `${route.name || 'Unknown Page'}`;
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
  const text = ref('');
  const inputLabel = ref(`Search in`);
  const options = ref(null);
  const filteredOptions = ref([]);
  const search = ref(null);

  const stringOptions = ['Option 1', 'Option 2', 'Option 3'];

  function filter(val, update) {
    if (options.value === null) {
      setTimeout(() => {
        options.value = stringOptions;
        search.value.filter('');
      }, 2000);
      update();
      return;
    }

    if (val === '') {
      update(() => {
        filteredOptions.value = options.value.map((op) => ({ label: op }));
      });
      return;
    }

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