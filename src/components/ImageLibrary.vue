<script setup lang="ts">
import { ref } from 'vue';
import { useImageStore } from '@/stores/imageStore';
import { useDialogStore } from '@/stores/dialogStore';
import { useSpecimenInfoStore } from '@/stores/specimenInfoStore';
import { DialogType } from '@/const/DialogType';
import ZoomedInSelectedImageDialog from '@/components/ZoomedInSelectedImageDialog.vue';
import { ImageLinkedToObservationType } from '@/types/SpecimenObservationType';
import ObservationRegisterForm from '@/components/ObservationRegisterForm.vue';
import { formatDate } from '@/utils/FormatDate';

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
          class="p-2 flex flex-col justify-between h-28 bg-white border-t border-slate-100"
        >
          <div class="flex flex-col">
            <p
              class="text-base font-semibold text-slate-900 cursor-pointer hover:text-emerald-600 transition-colors line-clamp-2"
              @click="() => openDetails(linkedImgWithObs)"
            >
              {{ linkedImgWithObs.observation.specimenInfo.scientificName || 'Indeterminado' }}
            </p>
            <div class="flex items-center">
              <span class="text-xs text-slate-400">📍</span>
              <p class="text-xs text-slate-600 pl-1">
                {{
                  linkedImgWithObs.observation.geospatialData.observationSite ||
                  'Ubicación no registrada'
                }}
              </p>
            </div>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-slate-200">
            <span
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200"
            >
              Procesada
            </span>
            <p class="text-xs font-semibold text-slate-700">
              {{ linkedImgWithObs.observation.observedAt || '—' }}
            </p>
          </div>
        </div>
        <div
          v-else
          class="p-2 flex flex-col justify-between h-28 bg-emerald-50 border-t border-emerald-200"
        >
          <div class="flex flex-col">
            <p class="text-base font-semibold text-slate-900">Sin procesar</p>
            <p class="text-xs text-slate-600 pt-1">Añade información para completar</p>
          </div>
          <div class="flex items-center justify-between p-0.5 border-t border-emerald-200">
            <button
              @click="openRegisterForm(linkedImgWithObs.uuid, linkedImgWithObs.imagePath)"
              class="cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold py-1 px-3 rounded-md transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              Procesar
            </button>
            <p class="text-xs text-slate-500 mt-5">
              {{ formatDate(linkedImgWithObs.date) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500 mt-12 text-lg font-medium">No hay imágenes disponibles</p>

    <ZoomedInSelectedImageDialog :imageUrl="selectedImageUrl || ''" />
    <ObservationRegisterForm :uuid="uuid" :imageUrl="selectedImageUrl" />
  </div>
</template>
