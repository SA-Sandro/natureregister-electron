<script lang="ts" setup>
import CameraIcon from '@/components/Icons/CameraIcon.vue';

defineProps<{
  deleteInputValue: (event: Event) => void;
  onChangeFilter: (event: Event) => void;
}>();

</script>

<template>
  <div class="flex justify-center items-center gap-4">
    <CameraIcon />
    <div class="relative w-64">
      <input
        type="text"
        id="scientific-name-filter"
        placeholder="Filtra por nombre científico..."
        class="w-full px-4 py-2 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        @input="onChangeFilter"
      />
      <button
        @click="deleteInputValue"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 flex items-center justify-center size-5 cursor-pointer"
        aria-label="Limpiar filtro"
      >
        ✕
      </button>
    </div>
  </div>
</template>
