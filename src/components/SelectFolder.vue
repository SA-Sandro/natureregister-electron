<script setup lang="ts">
async function selectPath() {
  const selectedPath = await window.electronAPI.selectFolder()
  if (!selectedPath) {
    console.error('No se seleccionó ninguna carpeta')
    return
  }
  const url = `${import.meta.env.VITE_API_URL}/retrieveAllImages?folderPath=${encodeURIComponent(selectedPath)}`
  return url
}
defineExpose({ selectPath })
</script>
<template>
  <button @click="selectPath">Seleccionar carpeta</button>
</template>
<style scoped></style>
