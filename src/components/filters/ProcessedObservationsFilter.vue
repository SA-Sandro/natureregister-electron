<script lang="ts" setup>
import { ObservationStatus } from '@/const/ObservationStatus';

const selectedStatus = defineModel<ObservationStatus>({ default: ObservationStatus.ALL });
</script>

<template>
  <div class="py-3">
    <select
      v-model="selectedStatus"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 cursor-pointer"
    >
      <option :value="ObservationStatus.ALL">Todas las observaciones</option>
      <option :value="ObservationStatus.PROCESSED">Registradas</option>
      <option :value="ObservationStatus.UNPROCESSED">Por procesar</option>
    </select>
  </div>
</template>
