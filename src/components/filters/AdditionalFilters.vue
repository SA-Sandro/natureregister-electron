<script setup lang="ts">
import FiltersIcon from '@/components/Icons/FiltersIcon.vue';
import ObservationStateFilter from '@/components/filters/ObservationStateFilter.vue';
import ObservationDateFilter from '@/components/filters/ObservationDateFilter.vue';
import useDialog from '@/composables/useDialog';
import { DialogType } from '@/const/DialogType';
import { useDialogStore } from '@/stores/dialogStore';
import { useImageStore } from '@/stores/imageStore';
import { ref } from 'vue';
import { ObservationStatus } from '@/const/ObservationStatus';

const { isOpen, closeDialogHandler } = useDialog(DialogType.FILTERS);
const dialog = useDialogStore();

const showFiltersDialog = () => {
  dialog.toggle(DialogType.FILTERS);
};

const imageStore = useImageStore();

const selectedStatus = ref<ObservationStatus>(ObservationStatus.ALL);
const selectedSortDirection = ref<ObservationStatus>(ObservationStatus.ANY_SORT);

const onStatusFilterChange = () => {
  imageStore.filterBySpecifiedFilters(selectedStatus.value, selectedSortDirection.value);
  dialog.toggle(DialogType.FILTERS);
};
</script>

<template>
  <button
    @click="showFiltersDialog"
    class="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition duration-200 active:scale-95 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-pointer"
  >
    <FiltersIcon />
    <span>Filters</span>
  </button>

  <transition name="bounce">
    <div
      v-if="isOpen"
      id="dialog-overlay-filters-button"
      tabindex="0"
      @click="closeDialogHandler"
      @keydown="closeDialogHandler"
      class="absolute inset-0 z-50 backdrop-blur-sm bg-white/10"
    >
      <div
        @click.stop
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl rounded-[32px] border border-slate-200/80 bg-white/95 shadow-2xl ring-1 ring-slate-200/60 overflow-hidden"
      >
        <header
          class="flex flex-col gap-3 bg-slate-50 px-6 py-6 border-b border-slate-200/80 md:flex-row md:items-start md:justify-between"
        >
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Filtros</p>
            <h2 class="mt-2 text-2xl font-semibold text-slate-900">Ajusta tu búsqueda</h2>
            <p class="mt-1 text-sm text-slate-500">
              Selecciona el estado de la observación y ordena los resultados por fecha.
            </p>
          </div>
          <button
            id="dialog-overlay-cancel-button"
            type="button"
            @click="closeDialogHandler"
            class="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            aria-label="Cerrar diálogo"
          >
            ✕
          </button>
        </header>

        <main class="grid gap-6 p-6 md:grid-cols-[1.05fr_0.95fr]">
          <ObservationStateFilter v-model="selectedStatus" />
          <ObservationDateFilter v-model="selectedSortDirection" />
        </main>

        <footer
          class="flex flex-col gap-3 border-t border-slate-200/80 px-6 py-5 md:flex-row md:items-center md:justify-between"
        >
          <div class="flex flex-wrap gap-3">
            <button
              type="button"
              @click="onStatusFilterChange"
              class="cursor-pointer rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Aplicar filtros
            </button>
            <button
              id="dialog-overlay-cancel-button"
              type="button"
              @click="closeDialogHandler"
              class="cursor-pointer rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
          </div>
          <p class="text-sm text-slate-500">
            La configuración actual te ayudará a encontrar observaciones más relevantes.
          </p>
        </footer>
      </div>
    </div>
  </transition>
</template>
<style scoped>
@import '@/assets/bounceAnimation.css';
</style>
