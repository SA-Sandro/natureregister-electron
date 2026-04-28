<script setup lang="ts">
import { ref } from 'vue';
import { useImageStore } from '@/stores/imageStore';
import { useDialogStore } from '@/stores/dialogStore';
import { useSpecimenInfoStore } from '@/stores/specimenInfoStore';
import { DialogType } from '@/const/DialogType';
import ZoomedInSelectedImageDialog from '@/components/ZoomedInSelectedImageDialog.vue';
import { ImageLinkedToObservationType } from '@/types/SpecimenObservationType';
import ObservationRegisterForm from '@/components/ObservationRegisterForm.vue';

const { DETAILS, ZOOM, FORM } = DialogType;
const imageStore = useImageStore();
const dialog = useDialogStore();
const specimenInfo = useSpecimenInfoStore();

const selectedImageUrl = ref<string>('');
const uuid = ref<string>('');

const openDetails = (observationInfo: ImageLinkedToObservationType) => {
  specimenInfo.setSpecimenInfo(observationInfo);
  dialog.toggle(DETAILS);
};

const zoomImage = (url: string) => {
  selectedImageUrl.value = url;
  dialog.toggle(ZOOM);
};

const openRegisterForm = (uuidValue: string, imageUrl: string) => {
  uuid.value = uuidValue;
  selectedImageUrl.value = imageUrl;
  dialog.toggle(`${FORM}_${uuidValue}`);
};
</script>

<template>
  <div class="flex flex-col items-center bg-gray-100 min-h-screen">
    <div
      v-if="imageStore.imagesWithObservations.length > 0"
      class="grid gap-6 w-full p-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 auto-rows-fr"
    >
      <div
        v-for="linkedImgWithObs in imageStore.imagesWithObservations"
        :key="linkedImgWithObs.uuid"
        class="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-transform duration-200 flex flex-col h-full"
      >
        <div class="relative w-full aspect-[4/3] cursor-zoom-in overflow-hidden">
          <img
            @click="zoomImage(linkedImgWithObs.imagePath)"
            loading="lazy"
            :src="linkedImgWithObs.imagePath"
            :alt="linkedImgWithObs.observation?.specimenInfo?.scientificName ?? 'Sin determinar'"
            class="w-full h-full"
          />
        </div>

        <div
          v-if="linkedImgWithObs.observation != undefined"
          class="p-3 flex flex-col justify-between h-28"
        >
          <div>
            <p
              class="text-lg italic font-bold cursor-pointer hover:text-blue-600 transition-colors line-clamp-2"
              @click="() => openDetails(linkedImgWithObs)"
            >
              {{ linkedImgWithObs.observation.specimenInfo.scientificName || 'Indeterminado' }}
            </p>
            <p class="text-sm text-gray-600 line-clamp-2">
              {{ linkedImgWithObs.observation.geospatialData.observationSite || 'Indeterminado' }}
            </p>
          </div>
          <p class="text-right text-sm font-semibold text-gray-500">
            {{ linkedImgWithObs.observation.observedAt || 'Indeterminado' }}
          </p>
        </div>
        <div v-else class="flex flex-col justify-center items-center py-2">
          <p class="text-lg w-full text-left p-2">Sin procesar</p>
          <button
            @click="openRegisterForm(linkedImgWithObs.uuid, linkedImgWithObs.imagePath)"
            class="cursor-pointer bg-green-100 p-1 rounded-lg"
          >
            Añadir observación
          </button>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500 mt-12 text-lg font-medium">No hay imágenes disponibles</p>

    <ZoomedInSelectedImageDialog :imageUrl="selectedImageUrl || ''" />
    <ObservationRegisterForm :uuid="uuid" :imageUrl="selectedImageUrl" />
  </div>
</template>
