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
      <div class="image-overlay">
        <img :src="image.url" :alt="image.date" />
      </div>
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
  max-width: 1200px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.image-card {
  border: 1px solid black;
  width: 100%;
  display: flex;
  flex-direction: column;
  aspect-ratio: 1 / 1;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0.5rem;
}
.image-overlay {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  padding-bottom: 0.3rem;
}
.image-overlay img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  border-radius: 20px;
}
.image-card p {
  margin: 0.5rem 0;
  font-weight: bold;
  text-align: center;
}
</style>
