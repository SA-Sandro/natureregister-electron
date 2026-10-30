<script setup lang="ts">
import { ref } from 'vue';
import { ErrorMessages, SuccessMessages } from '@/const/popup/PopupMessages';
import { TitleMessages } from '@/const/popup/PopupTitle';
import { useImageStore } from '@/stores/imageStore';
import { popupNotifier } from '@/services/PopupNotifierManagement';
import type { ImageLinkedToObservationType } from '@/types/SpecimenObservationType';

const props = defineProps<{
  linkedImgWithObs: ImageLinkedToObservationType;
}>();

const imageStore = useImageStore();
const isDeleting = ref(false);

const deleteUnprocessedImage = async () => {
  const image = props.linkedImgWithObs;
  if (
    image.observation ||
    isDeleting.value ||
    !window.confirm(
      'La imagen se moverá a la papelera y podrás recuperarla desde allí. ¿Continuar?',
    )
  ) {
    return;
  }

  isDeleting.value = true;
  try {
    await window.electronAPI.moveToTrash(image.imagePath);
  } catch (error) {
    console.error('Error deleting image:', error);
    popupNotifier.createNotification(
      TitleMessages.ERROR,
      ErrorMessages.DELETE_IMAGE_ERROR,
      'error',
    );
    isDeleting.value = false;
    return;
  }

  try {
    await imageStore.refreshImages();
    popupNotifier.createNotification(
      TitleMessages.SUCCESS,
      SuccessMessages.SUCCESSFUL_IMAGE_DELETION,
      'success',
    );
  } catch (error) {
    console.error('Error refreshing images after deletion:', error);
    popupNotifier.createNotification(
      TitleMessages.ERROR,
      ErrorMessages.IMAGE_DELETED_REFRESH_ERROR,
      'error',
    );
  } finally {
    isDeleting.value = false;
  }
};
</script>

<template>
  <button
    v-if="!linkedImgWithObs.observation"
    type="button"
    :disabled="isDeleting"
    @click.stop="deleteUnprocessedImage"
    aria-label="Mover imagen a la papelera"
    title="Mover imagen a la papelera"
    class="absolute right-2 top-2 z-10 flex size-5 cursor-pointer items-center justify-center rounded-full border-2 border-white/90 bg-red-500 text-white shadow-lg transition duration-200 hover:scale-110 hover:bg-red-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-600 disabled:cursor-wait disabled:opacity-60 disabled:hover:scale-100"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      class="h-5 w-5"
      aria-hidden="true"
    >
      <path stroke-linecap="round" d="M5 12h14" />
    </svg>
  </button>
</template>
