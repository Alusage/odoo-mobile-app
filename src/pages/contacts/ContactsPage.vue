<template>
  <q-page>
    <div>
      <q-toolbar>
        <!-- <q-input 
          outlined 
          v-model="state.searchTerm" 
          label="Search contacts" 
        /> -->
      </q-toolbar>
    </div>

    <div class="q-pa-md" style="max-width: fit-content;">
      <h2>Contacts List </h2>
      <q-list bordered separator>
        <template v-for="contact in contactsStore.contactsList" :key="contact.id">
          <q-item class="q-my-md" clickable v-ripple style="max-height: 30px;">
            <q-item-section avatar>
              <!-- avatar image -->
              <q-avatar v-if="getBase64Image(contact)">
                <img :src="getBase64Image(contact)">
              </q-avatar>
              <q-avatar
                v-else
                :color="getAvatarColor(contact.name)"
                text-color="white"
              >
                {{ getInitials(contact.name) }}
              </q-avatar>
            
            
            <q-item-section>
              {{ contact.name }}
                <q-item-label caption lines="1"  v-if="contact.is_company" >
                  Company
                </q-item-label >
                <q-item-label caption lines="1" v-else >
                   Individual 
                </q-item-label >
            </q-item-section>
          </q-item-section>
          </q-item>
          <q-separator/>
        </template>
      </q-list>

        <!-- <p v-for="contact in contactsStore.contactsList" :key="contact.id">
          {{ contact.name }}
        </p> -->
      
    </div>

    <div v-if="isContactListFetched">
      <q-virtual-scroll
        ref="virtualScrollRef"
        :items="filteredContacts"
        :items-fn="() => filteredContacts"
        separator
        :item-key="(item) => item.id"
        virtual-scroll-slice-size="10"
      >
        <q-intersection
          v-for="(contact, id) in state.rows"
          :key="id"
          transition="jump-right"
          style="height: 3.5rem"
        >
          <q-item clickable v-ripple @click="showContactCard(contact)">
            <q-item-section avatar>
              <!-- #ToDo : Get the color by the companies name -->
              <!-- #ToDo : Put a colored ring around the avatar from the companie name  -->
              <q-avatar v-if="getBase64Image(contact)">
                <img :src="getBase64Image(contact)" />
              </q-avatar>
              <q-avatar
                v-else
                :color="getAvatarColor(contact.name)"
                text-color="white"
              >
                {{ getInitials(contact.name) }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              {{ contact.name }}
              <q-item-section v-if="contact.is_company" caption>
                Company
              </q-item-section>
              <q-item-section v-else caption> Individual </q-item-section>
            </q-item-section>
          </q-item>
        </q-intersection>
      </q-virtual-scroll>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="purple"
        @click="addNewContactDialog = true"
      ></q-btn>
    </q-page-sticky>
    <q-dialog persistent maximized v-model="addNewContactDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">New Contact</div>
        </q-card-section>

        <q-card-section>
          <q-form>
            <q-input
              type="text"
              required
              v-model="state.newname"
              label="Name :"
              autofocus
              :rules="[(value) => !!value || 'Name is required']"
            />

            <q-input type="text" v-model="state.newstreet" label="Street :" />

            <q-input type="text" v-model="state.newstreet2" label="Street2 :" />

            <q-input type="text" v-model="state.newzip" label="ZIP :" />

            <q-input type="text" v-model="state.newcity" label="City :" />

            <q-input type="text" v-model="state.newphone" label="Phone :" />

            <q-input type="email" v-model="state.newemail" label="Email :" />

            <q-card-actions align="around" class="text-primary">
              <q-btn flat v-close-popup @click="clearNewContactForm"
                >Cancel</q-btn
              >

              <q-btn color="primary" @click="newContact">Add</q-btn>
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>

  <q-dialog v-model="dialogVisible">
    <contact-card :contact="selectedContact" />
  </q-dialog>
</template>

<script>
import axios from "axios";
import { defineComponent, reactive, onMounted, ref, computed, inject } from "vue";
import { Notify, getCssVar } from "quasar";
// import ContactPreview from '../../components/ContactPreview.vue';
import ContactCard from "../../components/ContactCard.vue";
import { watch } from "vue";
// import { useContactsStore } from "src/stores/ContactsStore";

export default defineComponent({
  name: "ContactsPage",
  components: {
    ContactCard,

    // ContactPreview,
  },

  /**
   * Generates a new contact by making a POST request to the specified URL.
   *
   * @param {Object} state - The state object containing various properties.
   * @param {string} state.db - The name of the database.
   * @param {string} state.myId - The ID of the user.
   * @param {string} state.apikey - The API key.
   * @param {string} state.newname - The name of the new contact.
   * @param {string} state.newstreet - The street of the new contact.
   * @param {string} state.newstreet2 - The second street of the new contact.
   * @param {string} state.newzip - The ZIP code of the new contact.
   * @param {string} state.newcity - The city of the new contact.
   * @param {string} state.newphone - The phone number of the new contact.
   * @return {Promise<void>} - A promise that resolves when the new contact is added successfully.
   */
  setup() {
    console.log("Setup function called!");
    const state = reactive({
      apikey: "admin",
      db: "odoo",
      myId: "2",
      rows: [],
      searchTerm: "",
    });
    const addNewContactDialog = ref(false);
    const dialogVisible = ref(false);
    const selectedContact = ref(null);
    const virtualScrollRef = ref(null);
    const isContactListFetched = ref(false); // Define isContactListFetched as a ref
    const contactsStore = inject("contactsStore");
    const authStore = inject("authStore");
    /**
     * Fetches the contact list from the server.
     *
     * @return {Promise} A promise that resolves with the contact list.
     */
    const fetchContactList = async () => {
      try {
        const options = {
          method: "POST",
          url: "https://apps.alusage.fr/jsonrpc",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            jsonrpc: "2.0",
            params: {
              service: "object",
              method: "execute_kw",
              args: [
                state.db,
                state.myId,
                state.apikey,
                "res.partner",
                "search_read",
                [[]],
                {
                  fields: [
                    "name",
                    "email_normalized",
                    "phone",
                    "mobile",
                    "image_1920",
                    "street",
                    "street2",
                    "zip",
                    "city",
                    "write_date",
                    "function",
                    "is_company",
                  ],
                },
              ],
            },
          },
        };

        const response = await axios.request(options);
        state.rows = response.data.result;
        isContactListFetched.value = true;

        console.log(state.rows);
        console.log(state.rows[10].name);
      } catch (error) {
        console.error(error);
      }
    };


    watch(() => authStore.loginInfos, () => {
      contactsStore.fetchContactsList();
    }, 
    { deep: true })

    onMounted(() => {
      // Fetch the contact list when the component is mounted
      fetchContactList();
    });

    const getBase64Image = (contact) => {
      return contact.image_1920
        ? `data:image/png;base64,${contact.image_1920}`
        : null;
    };
    const getBorderColor = (name) => {
      const colorName = "dark";
      let color = getCssVar(`${colorName}`);
      console.log(colorName + "=" + color);
      return color;
    };

    const colors = [
      "red",
      "pink",
      "purple",
      "deep-purple",
      "indigo",
      "blue",
      "light-blue",
      "cyan",
      "teal",
      "green",
      "light-green",
      "lime",
      "yellow",
      "amber",
      "orange",
      "deep-orange",
      "brown",
      "grey",
      "blue-grey",
    ];
    const getAvatarColor = (name) => {
        const hash = [...name].reduce(
          (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc),
          0
        );

        return colors[Math.abs(hash % colors.length)];
      },
      getInitials = (name) => {
        return name.charAt(0).toUpperCase();
      };

    const filteredContacts = computed(() => {
      // Check if the search term is empty
      if (!state.searchTerm.trim()) {
        return state.rows;
      }

      // Convert the search term to lowercase for case-insensitive comparison
      const searchTermLowerCase = state.searchTerm.toLowerCase();

      // Use the filter method to create a new array containing only the contacts
      // whose names include the lowercase search term
      return state.rows.filter((contact) =>
        contact.name.toLowerCase().includes(searchTermLowerCase)
      );
    });

    /**
     * Displays the contact card for the specified contact.
     *
     * @param {object} contact - The contact object to display.
     */
    const showContactCard = (contact) => {
      if (contact) {
        selectedContact.value = contact;
        dialogVisible.value = true;
      }
    };

    /**
     * Generates a new contact by making a POST request to the specified URL.
     *
     * @param {Object} state - The state object containing various properties.
     * @param {string} state.db - The name of the database.
     * @param {string} state.myId - The ID of the user.
     * @param {string} state.apikey - The API key.
     * @param {string} state.newname - The name of the new contact.
     * @param {string} state.newstreet - The street of the new contact.
     * @param {string} state.newstreet2 - The second street of the new contact.
     * @param {string} state.newzip - The ZIP code of the new contact.
     * @param {string} state.newcity - The city of the new contact.
     * @param {string} state.newphone - The phone number of the new contact.
     * @return {Promise<void>} - A promise that resolves when the new contact is added successfully.
     */
    const newContact = async () => {
      // const contactsStore = useContactsStore();
      try {
        const options = {
          method: "POST",
          url: "https://apps.alusage.fr/jsonrpc",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            jsonrpc: "2.0",
            params: {
              service: "object",
              method: "execute_kw",
              args: [
                state.db,
                state.myId,
                state.apikey,
                "res.partner",
                "create",
                [
                  {
                    name: state.newname,
                    street: state.newstreet,
                    street2: state.newstreet2,
                    zip: state.newzip,
                    city: state.newcity,
                    phone: state.newphone,
                  },
                ],
              ],
            },
          },
        };

        await axios.request(options);
        await contactsStore.fetchContactsList(), fetchContactList();
        clearNewContactForm();
        addNewContactDialog.value = false;
        Notify.create({
          message: "Contact added successfully",
          color: "green",
        });
      } catch (error) {
        console.error(error);
        Notify.create({
          message: "Error adding contact",
          color: "red",
        });
      }
    };

    /**
     * Clears the new contact form by resetting all its fields.
     */
    const clearNewContactForm = () => {
      state.newname = "";
      state.newstreet = "";
      state.newstreet2 = "";
      state.newzip = "";
      state.newcity = "";
      state.newphone = "";
      state.newemail = "";
    };

    /**
     * Updates the filtered contacts based on the current search term.
     *
     * @param {string} state.searchTerm - The current search term.
     * @return {void} This function does not return anything.
     */

    return {
      state,
      fetchContactList,
      isContactListFetched, // Add isContactListFetched to the returned object
      newContact,
      getAvatarColor,
      getInitials,
      getBase64Image,
      clearNewContactForm,
      addNewContactDialog,
      dialogVisible,
      selectedContact,
      showContactCard,
      ContactCard,
      // ContactPeview,
      getBorderColor,
      filteredContacts,
      virtualScrollRef,
      contactsStore,

      watch,
    };
  },
});
</script>
src/stores/ContactsStore
