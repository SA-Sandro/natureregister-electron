<script setup lang="ts">
import { useImageStore } from '@/stores/imageStore';
import { computed } from 'vue';
import { useDialogStore } from '@/stores/dialogStore';
import { useSpecimenInfoStore } from '@/stores/specimenInfoStore';
import formatDate from '@/utils/FormatDate';

const dialog = useDialogStore();
const imageStore = useImageStore();
const specimentInfo = useSpecimenInfoStore();

const images = computed(() => imageStore.formattedImages);

const openDialogWithSpecificInfo = (url: string, date: string) => {
  specimentInfo.setSpecimenInfo({ imagePath: url, recordDate: date });
  dialog.toggle();
};
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
        class="bg-white rounded-sm shadow-md overflow-hidden transition-transform"
      >
        <div class="relative w-fullc= aspect-[4/3]">
          <img
            loading="lazy"
            :src="image.url"
            :alt="formatDate(image.date)"
            class="absolute inset-0 w-full h-full"
          />
        </div>
        <div class="p-3 flex justify-around items-center">
          <button
            @click="openDialogWithSpecificInfo(image.url, formatDate(image.date))"
            class="cursor-pointer text-black"
          >
            Más detalles
          </button>
          <p class="text-sm font-semibold text-gray-600">{{ formatDate(image.date) }}</p>
        </div>
      </div>
    </div>
    <div v-else class="text-gray-500 mt-12 text-lg font-medium">No hay imágenes disponibles</div>
  </div>
</template>

<style scoped></style>
