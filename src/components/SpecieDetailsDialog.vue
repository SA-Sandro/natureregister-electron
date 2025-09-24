<script setup lang="ts">
import useDialog from '@/composables/useDialog';
import { useSpecimenInfoStore } from '@/stores/specimenInfoStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const { closeDialogByEsc, closeOnBackdrop, dialog } = useDialog();
const specimenInfoStore = useSpecimenInfoStore();
const { specimenInfo } = storeToRefs(specimenInfoStore);

// Datos falsos para el prototipo
const specimentInfo = ref({
  scientificName: 'Papilio machaon',
  genus: 'Papilio',
  family: 'Papilionidae',
  imagePath: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Papilio_machaon_-_01.jpg',
  recordDate: '23/09/2025',
  location: {
    coordinates: '40.4168° N, 3.7038° W',
    municipality: 'Madrid',
    province: 'Madrid',
    locality: 'Parque del Retiro',
  },
  observations: [
    'Se observó cerca del estanque central.',
    'Actividad a plena luz del día.',
    'No se detectaron depredadores cercanos.',
  ],
});
</script>

<template>
  <transition name="bounce">
    <div
      v-if="dialog.isOpen"
      id="dialog-overlay"
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
            <div v-if="specimenInfo">
              <div>
                <h1 class="text-2xl font-bold px-5 py-2">{{ specimentInfo.scientificName }}</h1>
                <p class="px-5 text-gray-600">
                  {{ specimentInfo.genus }} | {{ specimentInfo.family }}
                </p>
              </div>
              <div class="flex pt-4 px-5 gap-1.5">
                <div class="flex-1 flex justify-center items-center">
                  <img
                    :src="specimenInfo.imagePath"
                    :alt="specimentInfo.scientificName"
                    class="max-h-full max-w-full"
                  />
                </div>
                <div class="flex-1">
                  <div class="relative h-full">
                    <img src="/public/map_fake.png" alt="mapa" class="h-full"/>
                    <div class="text-gray-700 flex font-medium text-md gap-x-2 absolute bottom-0 bg-white border-2 border-solid p-1">
                      <p>{{ specimentInfo.location.locality }}</p>
                      <p>{{ specimentInfo.location.municipality }}</p>
                      <p>{{ specimentInfo.location.province }}</p>
                      <p>{{ specimentInfo.location.coordinates }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex py-5 gap-x-5 justify-center">
            <div class="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 class="font-semibold mb-2">Datos de la especie</h3>
              <p><strong>Fecha de registro:</strong> {{ specimentInfo.recordDate }}</p>
              <p><strong>Género:</strong> {{ specimentInfo.genus }}</p>
              <p><strong>Familia:</strong> {{ specimentInfo.family }}</p>
            </div>
            <div class="bg-gray-100 rounded-lg shadow-sm px-5">
              <h3 class="font-semibold mb-2">Observaciones</h3>
              <ul class="list-disc pl-5">
                <li v-for="(obs, index) in specimentInfo.observations" :key="index">{{ obs }}</li>
              </ul>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  </transition>
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-out 0.2s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  60% {
    transform: scale(1.07);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.5);
    opacity: 0;
  }
}
</style>
