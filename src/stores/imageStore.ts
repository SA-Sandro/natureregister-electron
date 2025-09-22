import type { Image } from '@/types/ImagesType';
import { defineStore } from 'pinia';

export const useImageStore = defineStore('imageStore', {
  state: () => ({
    images: [] as Array<Image>,
  }),
  actions: {
    setImages(images: Array<Image>) {
      this.images = images;
    },
    getImages(): Array<Image> {
      return this.images;
    },
  },
});
