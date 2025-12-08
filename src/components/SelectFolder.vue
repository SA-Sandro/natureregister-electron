<script setup lang="ts">
import { LocalStorageService } from '@/services/LocalStorageService';
import { useImageStore } from '@/stores/imageStore';
import FolderIcon from '@/components/Icons/FolderIcon.vue';
import getFolderNameFromPath from '@/utils/GetFolderNameFromPath';
import { useFolderStore } from '@/stores/folderStore';

const localStorageService = new LocalStorageService();
const imageStore = useImageStore();
const folderStore = useFolderStore();

async function selectPath() {
  const selectedPath = await window.electronAPI.selectFolder();
  if (!selectedPath) return;

  localStorageService.setItem('selectedFolderPath', selectedPath);
  const folderName = getFolderNameFromPath(selectedPath);
  if (folderName) {
    folderStore.setFolderName(folderName);
  }

  await imageStore.loadImages(selectedPath);
}
</script>
<template>
  <button @click="selectPath"><FolderIcon /></button>
</template>
<style scoped></style>
