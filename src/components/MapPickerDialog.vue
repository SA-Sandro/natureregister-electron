<script setup lang="ts">
import useDialog from '@/composables/useDialog';
import { DialogType } from '@/const/DialogType';
import { useMapPicker } from '@/composables/useMapPicker';
import { nextTick, watch } from 'vue';

interface Props {
  initialCoordinates?: string;
}

interface Emits {
  (e: 'select-coordinates', coordinates: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { isOpen, closeDialogHandler } = useDialog(DialogType.MAP_PICKER);

const { getSelectedCoordinates, initializeMap } = useMapPicker(props.initialCoordinates || '');
const mapContainerId = 'map-picker-container';

watch(
  () => isOpen.value,
  async (open) => {
    if (open) {
      await nextTick();
      setTimeout(() => {
        initializeMap(mapContainerId);
      }, 0);
    }
  },
);

const handleSelectCoordinates = (e: MouseEvent | KeyboardEvent) => {
  const coordinates = getSelectedCoordinates();
  emit('select-coordinates', coordinates);
  closeDialogHandler(e);
};
</script>

<template>
  <transition name="bounce">
    <div
      v-if="isOpen"
      :id="`dialog-overlay-${DialogType.MAP_PICKER}`"
      class="fixed inset-0 bg-black/40 flex items-center justify-center"
      @click="closeDialogHandler"
      @keydown="closeDialogHandler"
      tabindex="0"
    >
      <dialog
        role="dialog"
        aria-modal="true"
        class="static w-[80%] h-[90vh] backdrop-blur-sm flex flex-col rounded-lg shadow-lg p-6"
      >
        <h2 class="text-2xl font-bold pb-4">Seleccionar ubicación</h2>
        <p class="text-sm text-gray-600 pb-4">
          Haz click en el mapa para seleccionar una ubicación
        </p>

        <div
          :id="mapContainerId"
          class="flex-1 rounded-lg overflow-hidden border border-gray-300 mb-4"
        ></div>

        <div class="flex gap-2 justify-end">
          <button
            id="dialog-overlay-cancel-button"
            type="button"
            @click="closeDialogHandler"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            id="dialog-overlay-confirm-button"
            type="button"
            @click="handleSelectCoordinates($event)"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Confirmar ubicación
          </button>
        </div>
      </dialog>
    </div>
  </transition>
</template>

<style scoped>
@import '@/assets/bounceAnimation.css';
</style>
