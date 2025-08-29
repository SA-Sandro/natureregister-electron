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
  <div class="flex flex-col items-center p-4 bg-[#EEEEEE]">
    <div
      v-if="images.length"
      class="grid gap-8 max-w-[75rem] mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 [@media(min-width:68.75rem)]:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="flex flex-col w-full border border-gray-200 overflow-hidden bg-white shadow"
      >
        <div class="relative w-full h-64">
          <img
            :src="image.url"
            :alt="image.date.toString()"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div class="h-20 flex flex-col justify-end !m-3">
          <p class="text-right text-xs !font-bold">{{ image.date }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No images available.</p>
    </div>
  </div>
</template>

<style scoped></style>
