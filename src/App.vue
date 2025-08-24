<script setup lang="ts">
import { onMounted } from 'vue'
import SelectFolder from './components/SelectFolder.vue'

async function fetchImages(folderPath: string) {
  try {
    localStorage.setItem('selectedFolderPath', folderPath)

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/retrieveAllImages?folderPath=${encodeURIComponent(folderPath)}`,
    )
    if (!res.ok) {
      throw new Error(`Failed to retrieve images: ${res.statusText}`)
    }
    const images = await res.json()
    console.log('Imágenes:', images)
  } catch (err) {
    console.error('An error has occurred while retrieving images:', err)
  }
}

onMounted(() => {
  const storedPath = localStorage.getItem('selectedFolderPath')
  if (storedPath) {
    fetchImages(storedPath)
  }
})

function handleFolderSelected(folderPath: string) {
  fetchImages(folderPath)
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
