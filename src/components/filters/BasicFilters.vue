<script setup lang="ts">
import { ref } from 'vue';
import LocalityFilter from '@/components/filters/LocalityFilter.vue';
import ScientificNameFilter from '@/components/filters/ScientificNameFilter.vue';
import { useImageStore } from '@/stores/imageStore';

const scientificNameValue = ref('');
const localityValue = ref('');
const imageStore = useImageStore();

const SCIENTIFIC_NAME_FILTER_ID = 'scientific-name-filter';
const LOCALITY_FILTER_ID = 'locality-filter';

const filterRefs = {
  [SCIENTIFIC_NAME_FILTER_ID]: scientificNameValue,
  [LOCALITY_FILTER_ID]: localityValue,
};

const deleteInputValue = (event: Event) => {
  const target = event.target as HTMLElement;
  const input = target.closest('div')?.querySelector('input') as HTMLInputElement;
  const targetRef = filterRefs[input.id as keyof typeof filterRefs];

  if (targetRef) {
    targetRef.value = '';
    input.value = '';
    imageStore.filterByScientificNameAndLocality(scientificNameValue.value, localityValue.value);
  }
};

const onChangeFilter = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const targetRef = filterRefs[input.id as keyof typeof filterRefs];

  if (targetRef) {
    targetRef.value = input.value;
  }

  imageStore.filterByScientificNameAndLocality(scientificNameValue.value, localityValue.value);
};

</script>

<template>
  <div class="flex justify-center items-center gap-4">
    <ScientificNameFilter :deleteInputValue="deleteInputValue" :onChangeFilter="onChangeFilter" />
    <LocalityFilter :deleteInputValue="deleteInputValue" :onChangeFilter="onChangeFilter" />
  </div>
</template>
