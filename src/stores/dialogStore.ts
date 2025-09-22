import { defineStore } from 'pinia';

export const useDialogStore = defineStore('dialogStore', {
  state: () => ({
    isOpen: false,
  }),
  actions: {
    close() {
      this.isOpen = false;
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});
