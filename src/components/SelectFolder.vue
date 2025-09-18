<script setup lang="ts">
import { ImagesApiHandler } from '@/api/ImagesApiHandler';
import { LocalStorageService } from '@/services/LocalStorageService';
import { popupNotifier } from '@/services/PopupNotifierManagement';
import { ErrorMessages, InfoMessages } from '@/const/popup/PopupMessages';
import { TitleMessages } from '@/const/popup/PopupTitle';
import { onMounted } from 'vue';
import { useImageStore } from '@/stores/imageStores';
import { ImageApiImpl } from '@/api/http/imagesManagement/ImageApiImpl';
import FolderIcon from '@/components/Icons/FolderIcon.vue';
import getFolderNameFromPath from '@/utils/GetFolderNameFromPath';

const localStorageService = new LocalStorageService();
const imagesApi = new ImagesApiHandler(new ImageApiImpl());

const imageStore = useImageStore();

async function init() {
  const storedPath = localStorageService.getItem('selectedFolderPath');
  if (!storedPath) {
    popupNotifier.createNotification(TitleMessages.INFO, InfoMessages.SELECT_FOLDER);
    return;
  }
  await loadImages(storedPath);
}

onMounted(init);

async function selectPath() {
  const selectedPath = await window.electronAPI.selectFolder();
  if (!selectedPath) return;

  localStorageService.setItem('selectedFolderPath', selectedPath);
  getFolderNameFromPath();
  await loadImages(selectedPath);
}

async function loadImages(selectedPath: string) {
  try {
    const images = await imagesApi.fetchImages(selectedPath);
    imageStore.setImages(images);
  } catch (error) {
    popupNotifier.createNotification(
      TitleMessages.ERROR,
      ErrorMessages.RETRIEVE_IMAGES_ERROR,
      'warn',
    );
    console.error('The images could not be loaded correctly:', error);
  }
}
</script>
<template>
  <PopupNotifier style="margin: 10px" />
  <button @click="selectPath"><FolderIcon /></button>
</template>
<style scoped></style>
