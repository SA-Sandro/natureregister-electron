<script setup lang="ts">
import { useImageStore } from '@/stores/imageStore';
import { computed, ref } from 'vue';
import { useDialogStore } from '@/stores/dialogStore';
import { useSpecimenInfoStore } from '@/stores/specimenInfoStore';
import formatDate from '@/utils/FormatDate';
import ZoomedInSelectedImageDialog from './ZoomedInSelectedImageDialog.vue';
import { DialogType } from '@/const/DialogType';


const dialog = useDialogStore();
const imageStore = useImageStore();
const specimenInfo = useSpecimenInfoStore();
const selectedImageUrl = ref<string | null>(null);
const {DETAILS, ZOOM} = DialogType;

const images = computed(() => imageStore.formattedImages);

const openDialogWithSpecificInfo = (url: string, date: string) => {
  specimenInfo.setSpecimenInfo({ imagePath: url, recordDate: date });
  dialog.toggle(DETAILS);
};

const manageZoomInSelectedImage = (url: string) => {
  selectedImageUrl.value = url;
  dialog.toggle(ZOOM);
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
        <div class="relative w-fullc= aspect-[4/3] cursor-zoom-in">
          <img
            @click="manageZoomInSelectedImage(image.url)"
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
  <ZoomedInSelectedImageDialog :imageUrl="selectedImageUrl" />
</template>

<style scoped></style>
