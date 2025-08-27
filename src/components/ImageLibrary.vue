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
  <div class="flex flex-col items-center p-4">
    <div
      v-if="images.length"
      class="grid gap-4 max-w-[1200px] mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 [@media(min-width:1100px)]:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="flex flex-col w-full border border-black overflow-hidden aspect-[6/7]"
      >
        <div class="w-full aspect-[4/3] overflow-hidden">
          <img :src="image.url" :alt="image.date" class="w-full h-full object-cover block" />
        </div>
        <p class="mt-2 mb-2 !font-bold text-center">{{ image.date }}</p>
      </div>
    </div>
    <div v-else>
      <p>No images available.</p>
    </div>
  </div>
</template>
<style scoped></style>
