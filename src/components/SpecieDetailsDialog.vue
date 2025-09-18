<script setup lang="ts">
import useDialog from '@/composables/useDialog';

const { closeDialogByEsc, closeOnBackdrop, dialog } = useDialog();
</script>
<!-- TODO: Think a way to sent species data to here -->
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
        arial-modal="true"
        class="static w-[70%] h-[95%] backdrop-blur-sm flex justify-center items-center rounded-lg shadow-lg"
      >
        <h2 class="text-xl">Hola a todos</h2>
      </dialog>
    </div>
  </transition>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
