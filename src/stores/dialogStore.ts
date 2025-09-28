import { defineStore } from 'pinia';

export const useDialogStore = defineStore('dialogStore', {
  state: () => ({
    dialogs: {} as Record<string, boolean>,
  }),
  actions: {
    toggle(id: string) {
      this.dialogs[id] = !this.dialogs[id];
    },
  },
  getters: {
    isOpen: (state) => {
      return (id: string) => !!state.dialogs[id];
    },
  },
});
