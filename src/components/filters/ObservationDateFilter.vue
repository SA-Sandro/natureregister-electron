<script setup lang="ts">
import { computed } from 'vue';
import { ObservationStatus } from '@/const/ObservationStatus';

const selectedSortDirection = defineModel<ObservationStatus>({
  default: ObservationStatus.ANY_SORT,
});

const orderByObservationDate = computed(
  () => selectedSortDirection.value !== ObservationStatus.ANY_SORT,
);

const toggleOrderByObservationDate = () => {
  if (orderByObservationDate.value) {
    selectedSortDirection.value = ObservationStatus.ANY_SORT;
  } else {
    selectedSortDirection.value = ObservationStatus.DESCENDENT_SORT;
  }
};

const setObservationDateDirection = (direction: ObservationStatus) => {
  if (orderByObservationDate.value) {
    selectedSortDirection.value = direction;
  }
};
</script>

<template>
  <section class="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm">
    <div class="mb-5">
      <h3 class="text-xl font-semibold text-slate-900">Fecha de la observación</h3>
      <p class="mt-1 text-sm text-slate-500">
        Activa esta opción para ordenar las imágenes por la fecha de observación.
      </p>
    </div>

    <div class="py-3">
      <button
        @click="toggleOrderByObservationDate"
        type="button"
        class="flex items-center justify-between w-full rounded-2xl border px-4 py-3 text-left transition hover:border-slate-300 hover:bg-slate-50"
      >
        <div>
          <p class="text-sm font-semibold text-slate-900">Ordenar por fecha</p>
          <p class="text-xs text-slate-500">
            Las imágenes aparecerán según la fecha de observación.
          </p>
        </div>
        <div
          class="flex h-8 w-14 items-center rounded-full border px-1.5 transition"
          :class="
            orderByObservationDate ? 'border-blue-500 bg-blue-600' : 'border-slate-300 bg-white'
          "
        >
          <span
            class="h-6 w-6 rounded-full bg-white transition"
            :class="orderByObservationDate ? 'translate-x-5' : 'translate-x-0'"
          />
        </div>
      </button>
    </div>
    <div class="rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
      <p class="text-sm text-slate-600">
        Al activar esta opción, los resultados se reorganizarán automáticamente por la fecha en la
        que se realizó la observación.
      </p>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <span class="text-sm font-semibold text-slate-800">Orden:</span>
        <div class="inline-flex rounded-full border border-slate-200 bg-white p-1">
          <button
            type="button"
            @click="setObservationDateDirection(ObservationStatus.DESCENDENT_SORT)"
            :class="[
              'cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition',
              selectedSortDirection === ObservationStatus.DESCENDENT_SORT
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100',
            ]"
          >
            Descendente
          </button>
          <button
            type="button"
            @click="setObservationDateDirection(ObservationStatus.ASCENDENT_SORT)"
            :class="[
              'cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition',
              selectedSortDirection === ObservationStatus.ASCENDENT_SORT
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100',
            ]"
          >
            Ascendente
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
