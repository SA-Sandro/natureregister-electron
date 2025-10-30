import type { Image } from '@/types/ImagesType';
import { toFileSrc } from '@/utils/UrlToFileSrc';
import { defineStore } from 'pinia';
import { popupNotifier } from '@/services/PopupNotifierManagement';
import { TitleMessages } from '@/const/popup/PopupTitle';
import { ErrorMessages, InfoMessages } from '@/const/popup/PopupMessages';
import { ImageApiImpl } from '@/api/SPImage/ImageApiImpl';
import { LocalStorageService } from '@/services/LocalStorageService';
import { SpecimenObservationImpl } from '@/api/SPObservation/SpecimenObservationImpl';
import { ImageLinkedToObservationType } from '@/types/SpecimenObservationType';
import { getUuidFromUrl } from '@/utils/GetUuidFromUrl';
import { toRaw } from 'vue';
import { useLoaderStore } from './loaderStore';

export const useImageStore = defineStore('imageStore', {
  state: () => ({
    images: [] as Array<Image>,
    imagesWithObservations: [] as Array<ImageLinkedToObservationType>,
  }),
  actions: {
    setImages(images: Array<Image>) {
      this.images = images;
    },
    async loadImages(selectedPath: string) {
      try {
        useLoaderStore().setIsLoading(true);
        const images = await new ImageApiImpl().getAll(selectedPath);
        this.setImages(images);
        await this.loadImagesLinkedToObservations();
        useLoaderStore().setIsLoading(false);
      } catch (error) {
        popupNotifier.createNotification(
          TitleMessages.ERROR,
          ErrorMessages.RETRIEVE_IMAGES_ERROR,
          'warn',
        );
        console.error('The images could not be loaded correctly:', error);
      } finally {
        useLoaderStore().setIsLoading(false);
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
    async loadImagesLinkedToObservations() {
      const specimenObservations = await new SpecimenObservationImpl().getAll();
      const obsMap = new Map(specimenObservations.map((obs) => [obs.uuid, obs]));

      const enriched = this.images.map((image: Image) => {
        const filename = getUuidFromUrl(image.url);
        const observation = obsMap.get(filename) || null;
        return {
          imagePath: image.url,
          date: image.date,
          observation,
        } as ImageLinkedToObservationType;
      });
      this.imagesWithObservations = enriched;
      return enriched;
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
    imagesWithObservationsRaw: (state) => state.imagesWithObservations.map((img) => toRaw(img)),
  },
});
