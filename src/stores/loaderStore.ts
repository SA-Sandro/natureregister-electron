import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loaderStore', {
  state: () => ({
    isLoading: false,
    isRegistering: false,
  }),
  actions: {
    setIsLoading(value: boolean) {
      this.isLoading = value;
    },
    setIsRegistering(value: boolean) {
      this.isRegistering = value;
    },
  },
});
