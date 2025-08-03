<script setup lang="ts">
async function selectPath() {
  try {
    console.log('Función selectPath llamada')
    const selectedPath = await window.electronAPI.selectFolder()
    if (selectedPath) {
      console.log('Ruta seleccionada: ', selectedPath)
      const encodedPath = encodeURIComponent(selectedPath)
      const url = `http://localhost:3000/api/images/retrieveAllImages?folderPath=${encodedPath}`
      console.log('📤 URL enviada al backend:', url)

      const response = await fetch(url)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ Error en el backend [${response.status}]:`, errorText)
        return
      }

      const data = await response.json()
      console.log('Datos recibidos:', JSON.stringify(data, null, 2))

      if (data && data.length > 0) {
        // Aquí haces lo que necesites con las imágenes
        console.log('Imágenes recibidas correctamente')
      } else {
        console.log('No se ha seleccionado una ruta válida o no hay imágenes en la carpeta')
      }
    } else {
      console.log('No se ha seleccionado ninguna ruta')
    }
  } catch (err) {
    console.error('Error al hacer fetch:', err)
  }
}
</script>
<template>
  <button @click="selectPath">Seleccionar carpeta</button>
</template>
<style scoped></style>
