<script setup lang="ts">
import { computed } from 'vue';
import useDialog from '@/composables/useDialog';
import { useDialogStore } from '@/stores/dialogStore';
import { DialogType } from '@/const/DialogType';
import MapIcon from './Icons/MapIcon.vue';
import MapPickerDialog from './MapPickerDialog.vue';
import { popupNotifier } from '@/services/PopupNotifierManagement';
import { TitleMessages } from '@/const/popup/PopupTitle';
import { SuccessMessages } from '@/const/popup/PopupMessages';
import { useImageStore } from '@/stores/imageStore';
import { ObservationStatus } from '@/const/ObservationStatus';
import { SpecimenObservationImpl } from '@/api/SPObservation/SpecimenObservationImpl';

const props = defineProps<{
  uuid: string;
  imageUrl: string;
}>();

const dialogType = computed(() => `${DialogType.FORM}_${props.uuid}`);
const { isOpen, closeDialogHandler } = useDialog(dialogType);
const dialogStore = useDialogStore();

const currentId = computed(() => props.uuid);

import { useObservationForm } from '@/composables/useObservationForm';

const { field, mapToSpecimenObservation } = useObservationForm(currentId);

const scientificName = field('scientificName');
const family = field('family');
const order = field('order');
const observedAt = field('observedAt');
const observationPlace = field('observationPlace');
const province = field('province');
const locality = field('locality');
const comments = field('comments');
const coordinates = field('coordinates');
const imagePath = computed(() => props.imageUrl);

const today = computed(() => new Date().toISOString().slice(0, 10));
const observedAtError = computed(() => observedAt.value && observedAt.value > today.value);

const openMapPicker = () => {
  dialogStore.toggle(DialogType.MAP_PICKER);
};

const handleSelectCoordinates = (selectedCoords: string) => {
  coordinates.value = selectedCoords;
};

const registerObservation = async () => {
  if (observedAtError.value) return;

  const mappedObservation = mapToSpecimenObservation();
  mappedObservation.imagePath = imagePath.value;

  await new SpecimenObservationImpl().create(mappedObservation);
  popupNotifier.createNotification(
    TitleMessages.SUCCESS,
    SuccessMessages.SUCCESSFUL_OBSERVATION_REGISTRATION,
    'success',
  );

  const store = useImageStore();
  const localService = new (await import('@/services/LocalStorageService')).LocalStorageService();
  const selectedPath = localService.getItem('selectedFolderPath');
  if (selectedPath) {
    await store.loadImages(selectedPath);
  }

  await store.loadImagesLinkedToObservations();

  dialogStore.toggle(dialogType.value);
  store.filterByStatus(ObservationStatus.UNPROCESSED);
};
</script>
<template>
  <transition name="bounce">
    <div
      v-if="isOpen"
      :id="`dialog-overlay-form_${props.uuid}`"
      class="fixed inset-0 bg-black/40 flex items-center justify-center"
      @click="closeDialogHandler"
      @keydown="closeDialogHandler"
      tabindex="0"
    >
      <dialog
        role="dialog"
        aria-modal="true"
        class="static w-[35%] h-auto max-h-[90vh] backdrop-blur-sm flex justify-center rounded-lg shadow-lg p-6"
      >
        <div class="w-full flex flex-col">
          <h2 class="text-2xl font-bold pb-4">Registrar nueva observación</h2>
          <div>
            <form @submit.prevent="registerObservation" class="flex flex-col gap-4">
              <div>
                <label for="scientificName" class="text-sm"> Nombre científico </label>
                <input
                  type="text"
                  id="scientificName"
                  v-model="scientificName"
                  placeholder="Ej: Scarabus laticollis"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="family" class="block text-sm font-medium mb-2"> Familia </label>
                  <input
                    type="text"
                    id="family"
                    v-model="family"
                    placeholder="Ej: Scarabaeidae"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                  />
                </div>
                <div>
                  <label for="order" class="block text-sm font-medium mb-2"> Orden </label>
                  <input
                    type="text"
                    id="order"
                    v-model="order"
                    placeholder="Ej: Coleoptera"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                  />
                </div>
              </div>
              <div>
                <label for="observedAt" class="block text-sm font-medium mb-2">
                  Fecha de observación
                </label>
                <input
                  type="date"
                  id="observedAt"
                  v-model="observedAt"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                />
                <p v-if="observedAtError" class="text-red-600 text-sm mt-1">
                  La fecha seleccionada no puede ser en el futuro
                </p>
              </div>
              <div>
                <label for="observationPlace" class="block text-sm font-medium mb-2">
                  Lugar de observación
                </label>
                <input
                  type="text"
                  id="observationPlace"
                  v-model="observationPlace"
                  placeholder="Ej: La Albuquería"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="province" class="block text-sm font-medium mb-2"> Provincia </label>
                  <input
                    type="text"
                    id="province"
                    v-model="province"
                    placeholder="Ej: Málaga"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                  />
                </div>
                <div>
                  <label for="locality" class="block text-sm font-medium mb-2"> Localidad </label>
                  <input
                    type="text"
                    id="locality"
                    v-model="locality"
                    placeholder="Ej: Coín"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                  />
                </div>
              </div>
              <div>
                <label for="coordinates" class="block text-sm font-medium mb-2">
                  Coordenadas
                </label>
                <div class="relative">
                  <input
                    type="text"
                    disabled="true"
                    id="coordinates"
                    v-model="coordinates"
                    placeholder="Latitud, Longitud"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                  />
                  <div
                    class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-75 transition-opacity"
                    @click="openMapPicker"
                  >
                    <MapIcon />
                  </div>
                </div>
              </div>
              <div>
                <label for="comments" class="block text-sm font-medium mb-2"> Comentarios </label>
                <textarea
                  id="comments"
                  v-model="comments"
                  placeholder="Observaciones adicionales..."
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                ></textarea>
              </div>
              <div class="mt-6 flex gap-2 justify-end">
                <button
                  id="dialog-overlay-cancel-button"
                  type="button"
                  @click="closeDialogHandler"
                  class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  :disabled="observedAtError"
                  class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Registrar observación
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  </transition>
  <MapPickerDialog
    :initial-coordinates="coordinates"
    @select-coordinates="handleSelectCoordinates"
  />
</template>
<style scoped>
@import '@/assets/bounceAnimation.css';
</style>
