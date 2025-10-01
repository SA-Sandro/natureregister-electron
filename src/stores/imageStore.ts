import type { Image } from '@/types/ImagesType';
import { toFileSrc } from '@/utils/UrlToFileSrc';
import { defineStore } from 'pinia';
import { useLoaderStore } from './loaderStore';
import { ImagesApiHandler } from '@/api/ImagesApiHandler';
import { popupNotifier } from '@/services/PopupNotifierManagement';
import { TitleMessages } from '@/const/popup/PopupTitle';
import { ErrorMessages, InfoMessages } from '@/const/popup/PopupMessages';
import { ImageApiImpl } from '@/api/http/imagesManagement/ImageApiImpl';
import { LocalStorageService } from '@/services/LocalStorageService';

export const useImageStore = defineStore('imageStore', {
  state: () => ({
    images: [] as Array<Image>,
  }),
  actions: {
    setImages(images: Array<Image>) {
      this.images = images;
    },
    async loadImages(selectedPath: string) {
      const loaderStore = useLoaderStore();
      try {
        loaderStore.setIsLoading(true);
        const images = await new ImagesApiHandler(new ImageApiImpl()).fetchImages(selectedPath);
        this.setImages(images);
      } catch (error) {
        popupNotifier.createNotification(
          TitleMessages.ERROR,
          ErrorMessages.RETRIEVE_IMAGES_ERROR,
          'warn',
        );
        console.error('The images could not be loaded correctly:', error);
      } finally {
        loaderStore.setIsLoading(false);
      }
    },
    async init() {
      const localStorageService = new LocalStorageService();
      const storedPath = localStorageService.getItem('selectedFolderPath');
      if (!storedPath) {
        popupNotifier.createNotification(TitleMessages.INFO, InfoMessages.SELECT_FOLDER);
        return;
      }
      await this.loadImages(storedPath);
    },
  },
  getters: {
    formattedImages: (state): Array<Image> => {
      return state.images.map((img: Image) => ({
        ...img,
        url: toFileSrc(img.url),
        date: img.date,
      }));
    },
  },
});
