<script setup lang="ts">
import LocalityFilter from '@/components/filters/LocalityFilter.vue';
import ScientificNameFilter from '@/components/filters/ScientificNameFilter.vue';
import { useImageStore } from '@/stores/imageStore';

const filterByCriteria = () => {
  const imageStore = useImageStore();
  const selectedFilters = {
    scientificNameValue: document.getElementById('sicientific-name-filter') as HTMLInputElement,
    localityValue: document.getElementById('locality-filter') as HTMLInputElement,
  };

  imageStore.filterByScientificNameAndLocality(
    selectedFilters.scientificNameValue.value,
    selectedFilters.localityValue.value,
  );
};

const deleteInputValue = (event: Event) => {
  const target = event.target as HTMLElement;
  const input = target.closest('div')?.querySelector('input') as HTMLInputElement;
  if (input) {
    input.value = '';
  }
};

</script>

<template>
  <div class="flex justify-center items-center gap-6">
    <div class="flex justify-center items-center gap-4">
      <ScientificNameFilter :deleteInputValue="deleteInputValue" />
      <LocalityFilter :deleteInputValue="deleteInputValue" />
    </div>

    <button
      @click="filterByCriteria"
      class="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-all"
    >
      Buscar
    </button>
  </div>
</template>
