<script setup lang="ts">
import useDialog from '@/composables/useDialog';
import { DialogType } from '@/const/DialogType';
const { isOpen, closeDialogByEsc, closeOnBackdrop } = useDialog(DialogType.ZOOM);
const props = defineProps<{
  imageUrl: string;
}>();
</script>

<template>
  <transition name="bounce">
    <div
      v-if="isOpen"
      id="dialog-overlay-zoom"
      class="fixed inset-0 bg-black/40 flex items-center justify-center"
      @click="closeOnBackdrop"
      @keydown="closeDialogByEsc"
      tabindex="0"
    >
      <div class="relative bg-white rounded-lg p-4 shadow-lg">
        <img
          v-if="props.imageUrl"
          :src="props.imageUrl"
          alt="Imagen ampliada"
          class="max-h-[90vh] max-w-[90vw] object-contain"
        />
      </div>
    </div>
  </transition>
</template>
<style scoped>
@import '@/assets/bounceAnimation.css';
</style>
