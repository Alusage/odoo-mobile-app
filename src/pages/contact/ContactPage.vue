<template>
  <q-page>
    <div>
      <q-toolbar > <q-input outlined v-model="state.searchTerm" label="Search contacts" /></q-toolbar>

       <q-virtual-scroll
         :items="filteredContacts"
         :items-fn="() => filteredContacts"
         separator
         :item-key="item => item.id"
         virtual-scroll-slice-size="10"
       >

          <q-intersection
           v-for="(contact, id) in state.rows"
           :key="id"
           transition="jump-right"
           style="height: 56px;">
          <q-item clickable v-ripple  @click="showContactCard(contact)">
          <q-item-section avatar>
            <!-- #ToDo : Get the color by the companies name -->
            <!-- #ToDo : Put a colored ring around the avatar from the companie name  -->
            <q-avatar v-if="getBase64Image(contact)">
              <img :src="getBase64Image(contact)">
            </q-avatar>
            <q-avatar v-else :color="getAvatarColor(contact.name)" text-color="white">
              {{ getInitials(contact.name) }}
            </q-avatar>
          </q-item-section>
          <q-item-section>
            {{ contact.name }}
          </q-item-section>
        </q-item>
        </q-intersection>
        </q-virtual-scroll>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="purple" @click="addNewContactDialog = true"></q-btn>
    </q-page-sticky>
    <q-dialog persistent maximized v-model="addNewContactDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">New Contact</div>

        </q-card-section>
        <q-card-section>
          <q-form>
            <q-input type="text" required v-model="state.newname" label="Name :" autofocus
              :rules="[(value) => !!value || 'Name is required']" />
            <q-input type="text" v-model="state.newstreet" label="Street :" />
            <q-input type="text" v-model="state.newstreet2" label="Street2 :" />
            <q-input type="text" v-model="state.newzip" label="ZIP :" />
            <q-input type="text" v-model="state.newcity" label="City :" />
            <q-input type="text" v-model="state.newphone" label="Phone :" />
            <q-input type="email" v-model="state.newemail" label="Email :" />

            <q-card-actions align="around" class="text-primary">
              <q-btn flat v-close-popup @click="clearNewContactForm">Cancel</q-btn>
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
import axios from 'axios'
import { defineComponent, reactive, onMounted, ref, computed } from "vue";
import { Notify, getCssVar } from 'quasar'
// import ContactPreview from '../../components/ContactPreview.vue';
import ContactCard from '../../components/ContactCard.vue';



export default defineComponent({


  name: 'ContactPage',
  components: {
    ContactCard, 
    // ContactPreview,
  },
  setup() {
    const state = reactive({
      apikey: 'admin',
      db: 'odoo',
      myId: '2',
      rows: [],
      searchTerm: '',
    })
    const addNewContactDialog = ref(false);
    const dialogVisible = ref(false);
    const selectedContact = ref(null);

    const fetchContactList = async () => {
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
                state.db,
                state.myId,
                state.apikey,
                'res.partner',
                'search_read',
                [[]],
                {
                  fields: ['name', 'email_normalized', 'phone', 'mobile', 'image_1920', 'street', 'street2', 'zip', 'city','write_date','function'],
                }
              ]
            }
          }
        };


        const response = await axios.request(options);
        state.rows = response.data.result;

        console.log(state.rows)
        console.log(state.rows[10].name)
      } catch (error) {
        console.error(error);
      }

    }
    onMounted(() => {
      fetchContactList();
    })

    const getBase64Image = (contact) => {
      return contact.image_1920 ? `data:image/png;base64,${contact.image_1920}` : null;
    }
const getBorderColor = (name) => {
  const colorName = "dark";
  let color = getCssVar(`${colorName}`);
  console.log(colorName + '=' +  color);
  return color;

}

    const colors = [
      'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey'
    ]
    const getAvatarColor = (name) => {

      const hash = [...name].reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);

      return colors[Math.abs(hash % colors.length)];

    },
      getInitials = (name) => {
        return name.charAt(0).toUpperCase();
      }

const filteredContacts = computed(() => {
  if (!state.searchTerm) {
    return state.rows;
  }
  return state.rows.filter(contact =>
    contact.name.toLowerCase().includes(state.searchTerm.toLowerCase())
  );
});


    const showContactCard = (contact) => {
      selectedContact.value = contact;
      dialogVisible.value = true;
    }
    const newContact = async () => {
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
                state.db,
                state.myId,
                state.apikey,
                'res.partner',
                'create',
                [{
                  name: state.newname,
                  street: state.newstreet,
                  street2: state.newstreet2,
                  zip: state.newzip,
                  city: state.newcity,
                  phone: state.newphone,
                }]
              ]
            }
          }
        };

        await axios.request(options);
        fetchContactList();
        clearNewContactForm();
        addNewContactDialog.value = false;
        Notify.create({
          message: 'Contact added successfully',
          color: 'green',
        })

      } catch (error) {
        console.error(error);
        Notify.create({
          message: 'Error adding contact',
          color: 'red',
        });
      }
    };
    const clearNewContactForm = () => {
      state.newname = '';
      state.newstreet = '';
      state.newstreet2 = '';
      state.newzip = '';
      state.newcity = '';
      state.newphone = '';
      state.newemail = '';
    }
    return {
      state,
      fetchContactList,
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
      filteredContacts


    }
  }
})
</script>
