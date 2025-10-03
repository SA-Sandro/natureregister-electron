import { defineStore } from 'pinia';

export const useFolderStore = defineStore('folderStore', {
  state: () => ({
    folderName: '' as string,
  }),
  actions: {
    setFolderName(folderName: string) {
      this.folderName = folderName;
    },
    getFolderName(): string {
      return this.folderName;
    },
  },
});
