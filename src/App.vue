<script setup lang="ts">
import { onMounted } from 'vue';
import SelectFolder from '@/components/SelectFolder.vue';
import { ImagesApiHandler } from '@/api/ImagesApiHandler';

const imagesApi = new ImagesApiHandler();

onMounted(() => {
  const imagesApi = new ImagesApiHandler();
  const storedPath = localStorage.getItem('selectedFolderPath');
  if (storedPath) {
    imagesApi.fetchImages(storedPath);
  }
});

function handleFolderSelected(folderPath: string) {
  imagesApi.fetchImages(folderPath);
}
</script>

<template>
  <div>
    <h1>Imágenes</h1>
    <p>Revisa la consola para ver las imágenes obtenidas.</p>
    <select-folder @folder-selected="handleFolderSelected"></select-folder>
  </div>
</template>

<style scoped></style>
