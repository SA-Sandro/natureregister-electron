<script setup lang="ts">
const emit = defineEmits<{ (e: 'folder-selected', path: string): void }>();
async function selectPath() {
  const selectedPath = await window.electronAPI.selectFolder();
  if (!selectedPath) {
    console.error('No se seleccionó ninguna carpeta');
    return;
  }
  emit('folder-selected', selectedPath);
}
</script>
<template>
  <button @click="selectPath">Seleccionar carpeta</button>
</template>
<style scoped></style>

//TODO : Clean this component.
