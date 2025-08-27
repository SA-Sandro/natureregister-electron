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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.image-card {
  border: 1px solid black;
  width: 100%;
  height: auto;
}
</style>
