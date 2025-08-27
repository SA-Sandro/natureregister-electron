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
  grid-template-columns: repeat(auto-fill, minmax(220px, 280px));
  gap: 1rem;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin-inline: auto;
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

@media (min-screen-width: 1200px) {
  .image-library {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
