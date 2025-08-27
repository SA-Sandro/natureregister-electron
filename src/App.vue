<script setup lang="ts">
import SelectFolder from '@/components/SelectFolder.vue';
import ImageLibrary from '@/components/ImageLibrary.vue';
</script>

<template>
  <div>
    <div>
      <img alt="Vue logo" src="/public/logo_nt.png" width="125" />
    </div>
    <h1>Imágenes</h1>
    <p>Revisa la consola para ver las imágenes obtenidas.</p>
    <SelectFolder />
    <ImageLibrary />
  </div>
</template>

<style scoped></style>
