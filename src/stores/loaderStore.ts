import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loaderStore', {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setIsLoading(value: boolean) {
      this.isLoading = value;
    },
  },
});
