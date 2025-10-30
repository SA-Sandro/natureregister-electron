<script setup lang="ts">
import { ref } from 'vue';
import { useImageStore } from '@/stores/imageStore';
import { useDialogStore } from '@/stores/dialogStore';
import { useSpecimenInfoStore } from '@/stores/specimenInfoStore';
import { DialogType } from '@/const/DialogType';
import formatDate from '@/utils/FormatDate';
import ZoomedInSelectedImageDialog from './ZoomedInSelectedImageDialog.vue';

const imageStore = useImageStore();
const dialog = useDialogStore();
const specimenInfo = useSpecimenInfoStore();

const selectedImageUrl = ref<string>('');
const { DETAILS, ZOOM } = DialogType;

const openDetails = (url: string, date: string) => {
  specimenInfo.setSpecimenInfo({ imagePath: url, recordDate: date });
  dialog.toggle(DETAILS);
};

const zoomImage = (url: string) => {
  selectedImageUrl.value = url;
  dialog.toggle(ZOOM);
};
</script>

<template>
  <div class="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
    <div
      v-if="imageStore.imagesWithObservationsRaw.length > 0"
      class="grid gap-6 w-full max-w-6xl grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]"
    >
      <div
        v-for="(obs, index) in imageStore.imagesWithObservationsRaw"
        :key="index"
        class="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-transform duration-200"
      >
        <div class="relative w-full aspect-[4/3] cursor-zoom-in">
          <img
            @click="zoomImage(obs.imagePath)"
            loading="lazy"
            :src="obs.imagePath"
            :alt="obs.observation?.specimenInfo?.scientificName ?? 'Sin determinar'"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div class="p-3">
          <p
            class="text-lg italic font-bold cursor-pointer hover:text-blue-600 transition-colors"
            @click="openDetails(obs.imagePath, formatDate(obs.date))"
          >
            {{ obs.observation?.specimenInfo?.scientificName || 'Sin nombre científico' }}
          </p>
          <p class="text-sm text-gray-600">
            {{ obs.observation?.geospatialData?.observationSite || 'Sin sitio de observación' }}
          </p>
          <p class="text-right text-sm font-semibold text-gray-500 mt-2">
            {{ obs.observation?.observedAt || 'Sin fecha especificada'}}</p>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500 mt-12 text-lg font-medium">No hay imágenes disponibles</p>

    <ZoomedInSelectedImageDialog :imageUrl="selectedImageUrl || ''" />
  </div>
</template>
