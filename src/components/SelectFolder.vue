<script setup lang="ts">
import { onMounted } from 'vue';
import { ImagesApiHandler } from '@/api/ImagesApiHandler';
import { LocalStorageService } from '@/services/LocalStorageService';
import { ImageApiImpl } from '@/api/http/imagesManagement/ImageApiImpl';
import { PopupNotifierManagement } from '@/services/PopupNotifierManagement';

const imagesApi = new ImagesApiHandler(new ImageApiImpl(), new LocalStorageService());
const localStorageService = new LocalStorageService();

onMounted(() => {
  const storedPath = localStorageService.getItem('selectedFolderPath');
  if (!storedPath) {
    new PopupNotifierManagement().createNotification(
      'Info',
      'Selecciona una carpeta para visualizar sus imágenes',
    );
    return;
  }
  imagesApi.fetchImages(storedPath);
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
  <PopupNotifier style="margin: 10px;"/>
  <button @click="selectPath">Seleccionar carpeta</button>
</template>
<style scoped></style>
