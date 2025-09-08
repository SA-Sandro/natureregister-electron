<script setup lang="ts">
import { useImageStore } from '@/stores/imageStores';
import { computed } from 'vue';
import { toFileSrc } from '@/utils/UrlToFileSrc';
import { formatDate } from '@/utils/FormatDate';

const imageStore = useImageStore();
const images = computed(() =>
  imageStore.getImages().map((img) => ({
    ...img,
    url: toFileSrc(img.url),
    date: formatDate(img.date),
  })),
);
</script>

<template>
  <div class="flex flex-col items-center p-6 bg-[#f5f5f5] min-h-screen">
    <div
      v-if="images.length"
      class="grid gap-6 w-full max-w-6xl grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg"
      >
        <div class="relative w-full aspect-[4/3]">
          <img
            :src="image.url"
            :alt="image.date"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div class="p-3 flex justify-end">
          <p class="text-sm font-semibold text-gray-600">{{ image.date }}</p>
        </div>
      </div>
    </div>
    <div v-else class="text-gray-500 mt-12 text-lg font-medium">No images available.</div>
  </div>
</template>

<style scoped></style>
