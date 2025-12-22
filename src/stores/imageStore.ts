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
import { useLoaderStore } from './loaderStore';
import { ObservationStatus } from '@/const/ObservationStatus';

export const useImageStore = defineStore('imageStore', {
  state: () => ({
    allImagesWithObservations: [] as Array<ImageLinkedToObservationType>,

    imagesWithObservations: [] as Array<ImageLinkedToObservationType>,

    images: [] as Array<Image>,
  }),

  actions: {
    setImages(images: Array<Image>) {
      this.images = images;
    },

    setImagesWithObservations(images: Array<ImageLinkedToObservationType>) {
      this.imagesWithObservations = images;
    },

    async loadImages(selectedPath: string) {
      const loader = useLoaderStore();
      try {
        loader.setIsLoading(true);
        const images = await new ImageApiImpl().getAll(selectedPath);
        this.setImages(images);
        await this.loadImagesLinkedToObservations();
      } catch (error) {
        popupNotifier.createNotification(
          TitleMessages.ERROR,
          ErrorMessages.RETRIEVE_IMAGES_ERROR,
          'error',
        );
        console.error('Error loading images:', error);
      } finally {
        loader.setIsLoading(false);
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
      const observations = await new SpecimenObservationImpl().getAll();
      const obsMap = new Map(observations.map((obs) => [obs.uuid, obs]));

      const enriched = this.images.map((image: Image) => {
        const uuid = getUuidFromUrl(image.url);
        return {
          imagePath: image.url,
          date: image.date,
          observation: obsMap.get(uuid),
        } as ImageLinkedToObservationType;
      });

      this.allImagesWithObservations = enriched;

      this.imagesWithObservations = enriched;
    },

    filterByStatus(status: string) {
      const base = this.allImagesWithObservations;
      switch (status) {
        case ObservationStatus.ALL:
          this.imagesWithObservations = [...base];
          break;
        case ObservationStatus.PROCESSED:
          this.imagesWithObservations = base.filter((img) => img.observation);
          break;
        case ObservationStatus.UNPROCESSED:
          this.imagesWithObservations = base.filter((img) => !img.observation);
          break;
      }
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
