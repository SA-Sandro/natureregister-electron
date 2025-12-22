<script lang="ts" setup>
import { useImageStore } from '@/stores/imageStore';
import { ref } from 'vue';
import { ObservationStatus } from '@/const/ObservationStatus';

const imageStore = useImageStore();
const selectedStatus = ref<ObservationStatus>(ObservationStatus.ALL);

const onStatusFilterChange = () => {
  imageStore.filterByStatus(selectedStatus.value);
};
</script>

<template>
  <div class="">
    <label class="block mb-2 font-medium text-gray-700">Elige una opción</label>
    <select
      v-model="selectedStatus"
      @change="onStatusFilterChange"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 cursor-pointer"
    >
      <option :value="ObservationStatus.ALL">Todas las observaciones</option>
      <option :value="ObservationStatus.PROCESSED">Registradas</option>
      <option :value="ObservationStatus.UNPROCESSED">Por procesar</option>
    </select>
  </div>
</template>
