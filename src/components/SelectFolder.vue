<script setup lang="ts">
async function selectPath() {
  try {
    const selectedPath = await window.electronAPI.selectFolder()
    if (selectedPath) {
      const encodedPath = encodeURIComponent(selectedPath)
      const url = `http://localhost:3000/api/images/retrieveAllImages?folderPath=${encodedPath}`

      const response = await fetch(url)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Request to backend failed with status[${response.status}]:`, errorText)
        return
      }

      const data = await response.json()

      if (data && data.length > 0) {
        // Aquí haces lo que necesites con las imágenes
        console.log('Images:', JSON.stringify(data, null, 2))
      }
    }
  } catch (err) {
    console.error('An error has occurred:', err)
  }
}
</script>
<template>
  <button @click="selectPath">Seleccionar carpeta</button>
</template>
<style scoped></style>
