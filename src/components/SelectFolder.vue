<script setup lang="ts">
import { LocalStorageService } from '@/services/LocalStorageService';
import { useImageStore } from '@/stores/imageStore';

const localStorageService = new LocalStorageService();
const imageStore = useImageStore();

async function selectPath() {
  const selectedPath = await window.electronAPI.selectFolder();
  if (!selectedPath) return;

  localStorageService.setItem('selectedFolderPath', selectedPath);

  await imageStore.loadImages(selectedPath);
}
</script>
<template>
  <PopupNotifier style="margin: 10px" />
  <button @click="selectPath">Seleccionar carpeta</button>
</template>
<style scoped></style>
