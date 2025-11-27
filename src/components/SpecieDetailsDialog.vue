<script setup lang="ts">
import useDialog from '@/composables/useDialog';
import { DialogType } from '@/const/DialogType';
import { useSpecimenInfoStore } from '@/stores/specimenInfoStore';
import formatDate from '@/utils/FormatDate';
import { storeToRefs } from 'pinia';

const { closeDialogByEsc, closeOnBackdrop, isOpen } = useDialog(DialogType.DETAILS);
const specimenInfoStore = useSpecimenInfoStore();
const { observationInfo } = storeToRefs(specimenInfoStore);
</script>

<template>
  <transition name="bounce">
    <div
      v-if="isOpen"
      id="dialog-overlay-details"
      class="fixed inset-0 bg-black/40 flex items-center justify-center"
      @click="closeOnBackdrop"
      @keydown="closeDialogByEsc"
      tabindex="0"
    >
      <dialog
        role="dialog"
        aria-modal="true"
        class="static w-[70%] h-[95%] backdrop-blur-sm flex justify-center rounded-lg shadow-lg p-4"
      >
        <div>
          <div>
            <div v-if="observationInfo">
              <div>
                <h1 class="text-2xl font-bold px-5 py-2">
                  {{ observationInfo.observation.specimenInfo.scientificName }}
                </h1>
                <p class="px-5 text-gray-600">
                  {{ observationInfo.observation.specimenInfo.genus }} |
                  {{ observationInfo.observation.specimenInfo.family }}
                </p>
              </div>
              <div class="flex pt-4 px-5 gap-1.5">
                <div class="flex-1 flex justify-center items-center">
                  <img
                    :src="observationInfo.imagePath"
                    :alt="observationInfo.observation.specimenInfo.scientificName"
                    class="max-h-full max-w-full aspect-[4/3] object-contain"
                  />
                </div>
                <div class="flex-1">
                  <div class="relative h-full">
                    <img src="/public/map_fake.png" alt="mapa" class="h-full" />
                    <div
                      class="text-gray-700 flex font-medium text-md gap-x-2 absolute bottom-0 bg-white border-2 border-solid p-1"
                    >
                      <p>{{ observationInfo.observation.geospatialData.observationSite }},</p>
                      <p>{{ observationInfo.observation.geospatialData.locality || 'Almogía' }},</p>
                      <p>{{ observationInfo.observation.geospatialData.province }},</p>
                      <p>{{ observationInfo.observation.geospatialData.coordinates }},</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex py-5 gap-x-5 justify-center">
            <div class="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 class="font-semibold mb-2">Datos de la especie</h3>
              <p><strong>Fecha de registro:</strong> {{ formatDate(observationInfo.date) }}</p>
              <p><strong>Género:</strong> {{ observationInfo.observation.specimenInfo.genus }}</p>
              <p><strong>Familia:</strong> {{ observationInfo.observation.specimenInfo.family }}</p>
            </div>
            <div class="bg-gray-100 rounded-lg shadow-sm px-5">
              <h3 class="font-semibold mb-2">Observaciones</h3>
              <ul class="list-disc pl-5">
                <li v-for="(obs, index) in observationInfo.observation.comments" :key="index">
                  {{ obs }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  </transition>
</template>
<style scoped>
@import '@/assets/bounceAnimation.css';
</style>
