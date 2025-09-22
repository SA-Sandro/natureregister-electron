<script setup lang="ts">
import useDialog from '@/composables/useDialog'
import { useSpecimenInfoStore } from '@/stores/specimenInfoStore'
import { storeToRefs } from 'pinia'

const { closeDialogByEsc, closeOnBackdrop, dialog } = useDialog()
const specimenInfoStore = useSpecimenInfoStore()
const { specimenInfo } = storeToRefs(specimenInfoStore)
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
        class="static w-[70%] h-[95%] backdrop-blur-sm flex justify-center items-center rounded-lg shadow-lg"
      >
        <h2 class="text-xl">Hola a todos</h2>

        <template v-if="specimenInfo">
          <img
            :src="specimenInfo.imagePath"
            alt="specimenInfo.scientificName || 'recorded image'"
            class="max-h-full max-w-full object-contain"
          />
          <h4>Date => {{ specimenInfo.recordDate }}</h4>
        </template>
      </dialog>
    </div>
  </transition>
</template>