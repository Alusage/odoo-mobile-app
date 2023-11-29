// useStores.js
import { useContactsStore } from "src/stores/ContactsStore"
import { useTasksStore } from "src/stores/tasksStore";

export function useStores() {
  const contactsStore = useContactsStore();
  const tasksStore = useTasksStore();

  return {
    contactsList: contactsStore.contactsList,
    tasksList: tasksStore.tasksList,
  };
}
