<script setup lang="ts">
import { useImageStore } from '@/stores/imageStores';
import { computed } from 'vue';
import { toFileSrc } from '@/utils/UrlToFileSrc';
const imageStore = useImageStore();
const images = computed(() =>
  imageStore.getImages().map((img) => ({
    ...img,
    url: toFileSrc(img.url),
  })),
);
</script>
<template>
  <div v-if="images.length > 0" class="image-library">
    <div v-for="(image, index) in images" :key="index" class="image-card">
      <img :src="image.url" :alt="image.date" />
      <p>{{ image.date }}</p>
    </div>
  </div>
  <div v-else>
    <p>No images available.</p>
  </div>
</template>
<style scoped>
.image-library {
  display: grid;
  gap: 1rem;
  width: 100%;
  max-width: 1200px; /* opcional, limita el ancho máximo del grid */
  margin: 0 auto;

  /* Flujo automático de columnas */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.image-card {
  border: 1px solid black;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
</style>
