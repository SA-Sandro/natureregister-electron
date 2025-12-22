<script lang="ts" setup>
import CameraIcon from '@/components/Icons/CameraIcon.vue';
</script>

<template>
  <div class="flex justify-center items-center gap-4">
    <CameraIcon />
    <input
      type="text"
      id="sicientific-name-filter"
      placeholder="Filtra por nombre científico..."
      class="w-64 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
    />
  </div>
</template>