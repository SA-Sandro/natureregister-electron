<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SelectFolder from './components/SelectFolder.vue'
const selectFolderRef = ref<InstanceType<typeof SelectFolder> | null>(null)

onMounted(async () => {
  if (!selectFolderRef.value) return
  try {
    const url = await selectFolderRef.value.selectPath()
    if (!url) return
    const res = await fetch(url)
    const images = await res.json()
    console.log('Imágenes:', images)
  } catch (err) {
    console.error('Error al obtener imágenes:', err)
  }
})
</script>

<template>
  <div>
    <h1>Imágenes</h1>
    <p>Revisa la consola para ver las imágenes obtenidas.</p>
    <select-folder ref="selectFolderRef"></select-folder>
  </div>
</template>

<style scoped></style>
