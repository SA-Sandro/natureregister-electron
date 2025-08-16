<script setup lang="ts">
import { onMounted } from 'vue';
import { ImagesApiHandler } from '@/api/ImagesApiHandler';
import { notifier } from '@/utils/notifyWrapper';
import { LocalStorageService } from '@/services/LocalStorageService';
import { ImageApiImpl } from '@/api/http/imagesManagement/ImageApiImpl';

const imagesApi = new ImagesApiHandler(new ImageApiImpl(), new LocalStorageService());
const localStorageService = new LocalStorageService();

onMounted(() => {
  notifier.notify({
    title: 'Bienvenido',
    text: 'Selecciona una carpeta para comenzar a registrar imágenes de la naturaleza.',
    type: 'info',
    duration: 5000,
  });
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
  <PopupNotifier />
  <button @click="selectPath">Seleccionar carpeta</button>
</template>
<style scoped></style>
