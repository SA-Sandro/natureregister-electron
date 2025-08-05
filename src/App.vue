<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/images/retrieveAllImages');
    const images = await res.json();
    console.log('Imágenes:', images);
  } catch (err) {
    console.error('Error al obtener imágenes:', err);
  }
});
</script>

<template>
  <div>
    <h1>Imágenes</h1>
    <p>Revisa la consola para ver las imágenes obtenidas.</p>
  </div>
</template>

<style scoped></style>
