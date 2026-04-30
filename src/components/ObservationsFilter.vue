<script lang="ts" setup>
import BasicFilters from '@/components/filters/BasicFilters.vue';
import AdditionalFilters from '@/components/filters/AdditionalFilters.vue';
</script>

<template>
  <div class="w-full flex justify-center items-center">
    <div
      class="max-w-7xl gap-10 flex justify-between items-center px-6 py-4 border-b border-gray-200"
    >
      <div class="text-2xl">Mis Observaciones</div>
      <div class="flex items-center gap-10">
        <BasicFilters />
        <AdditionalFilters />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
