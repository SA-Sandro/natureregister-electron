<script setup lang="ts">
import { onMounted } from 'vue';
import { ImagesApiHandler } from '@/api/ImagesApiHandler';
import { LocalStorageService } from '@/services/LocalStorageService';
import { ImageApiImpl } from '@/api/http/imagesManagement/ImageApiImpl';

const imagesApi = new ImagesApiHandler(new ImageApiImpl(), new LocalStorageService());
const localStorageService = new LocalStorageService();

onMounted(() => {
  const storedPath = localStorageService.getItem('selectedFolderPath');
  if (storedPath) {
    imagesApi.fetchImages(storedPath);
  }
});

async function selectPath() {
  const selectedPath = await window.electronAPI.selectFolder();
  if (!selectedPath) {
    console.error('No se seleccionó ninguna carpeta');
    return;
  }
  imagesApi.fetchImages(selectedPath);
}
</script>
<template>
  <button @click="selectPath">Seleccionar carpeta</button>
</template>
<style scoped></style>
