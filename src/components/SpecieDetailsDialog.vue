<script setup lang="ts">
import useDialog from '@/composables/useDialog';
import { DialogType } from '@/const/DialogType';
import { useSpecimenInfoStore } from '@/stores/specimenInfoStore';
import formatDate from '@/utils/FormatDate';
import { storeToRefs } from 'pinia';
import ObservationMap from '@/components/ObservationMap.vue';

const { closeDialogHandler, isOpen } = useDialog(DialogType.DETAILS);
const specimenInfoStore = useSpecimenInfoStore();
const { observationInfo } = storeToRefs(specimenInfoStore);
</script>

<template>
  <transition name="bounce">
    <div
      v-if="isOpen && observationInfo"
      id="dialog-overlay-details"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-6"
      @click.self="closeDialogHandler"
      @keydown.esc="closeDialogHandler"
      tabindex="0"
    >
      <dialog
        role="dialog"
        aria-modal="true"
        class="static flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-white p-0 shadow-2xl"
      >
        <header
          class="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-7"
        >
          <div class="min-w-0">
            <p class="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Registro de especie
            </p>
            <h1 class="text-xl font-semibold text-slate-900 sm:text-2xl">
              {{
                observationInfo.observation?.specimenInfo.scientificName || 'Especie sin determinar'
              }}
            </h1>
            <p class="mt-1 text-sm text-slate-600">
              {{ observationInfo.observation?.specimenInfo.genus || 'Género no indicado' }}
              <span aria-hidden="true">·</span>
              {{ observationInfo.observation?.specimenInfo.family || 'Familia no indicada' }}
            </p>
          </div>
          <button
            type="button"
            id="dialog-overlay-cancel-button"
            @click="closeDialogHandler"
            aria-label="Cerrar detalles"
            class="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            ×
          </button>
        </header>

        <div class="min-h-0 overflow-y-auto">
          <section class="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div
              class="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md bg-slate-100"
            >
              <img
                :src="observationInfo.imagePath"
                :alt="
                  observationInfo.observation?.specimenInfo.scientificName || 'Imagen de la especie'
                "
                class="h-full w-full object-contain"
              />
            </div>
            <div
              class="flex min-h-[260px] flex-col overflow-hidden rounded-md border border-slate-200 bg-slate-50"
            >
              <div class="border-b border-slate-200 px-4 py-3">
                <h2 class="text-sm font-semibold text-slate-800">Lugar de observación</h2>
                <p class="mt-1 text-sm text-slate-600">
                  {{
                    observationInfo.observation?.geospatialData.observationSite ||
                    'Lugar no indicado'
                  }}
                  <span v-if="observationInfo.observation?.geospatialData.locality">
                    · {{ observationInfo.observation.geospatialData.locality }}
                  </span>
                  <span v-if="observationInfo.observation?.geospatialData.province">
                    · {{ observationInfo.observation.geospatialData.province }}
                  </span>
                </p>
                <p class="mt-1 text-xs text-slate-500">
                  Coordenadas:
                  {{ observationInfo.observation?.geospatialData.coordinates || 'No registradas' }}
                </p>
              </div>
              <div class="min-h-[220px] flex-1">
                <ObservationMap
                  v-if="observationInfo.observation"
                  :observation-info="observationInfo.observation"
                />
                <div
                  v-else
                  class="flex h-full items-center justify-center px-4 text-center text-sm text-slate-500"
                >
                  No hay datos de ubicación para mostrar en el mapa.
                </div>
              </div>
            </div>
          </section>

          <section class="grid gap-6 border-t border-slate-200 bg-white p-4 sm:grid-cols-2 sm:p-6">
            <div>
              <h2 class="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Datos del registro
              </h2>
              <dl class="divide-y divide-slate-100 text-sm">
                <div class="flex justify-between gap-4 py-2">
                  <dt class="text-slate-500">Fecha</dt>
                  <dd class="text-right font-medium text-slate-800">
                    {{ formatDate(observationInfo.date) }}
                  </dd>
                </div>
                <div class="flex justify-between gap-4 py-2">
                  <dt class="text-slate-500">Género</dt>
                  <dd class="text-right font-medium text-slate-800">
                    {{ observationInfo.observation?.specimenInfo.genus || 'No indicado' }}
                  </dd>
                </div>
                <div class="flex justify-between gap-4 py-2">
                  <dt class="text-slate-500">Familia</dt>
                  <dd class="text-right font-medium text-slate-800">
                    {{ observationInfo.observation?.specimenInfo.family || 'No indicada' }}
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <h2 class="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Observaciones
              </h2>
              <p class="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {{ observationInfo.observation?.comments || 'No hay comentarios registrados.' }}
              </p>
            </div>
          </section>
        </div>
      </dialog>
    </div>
  </transition>
</template>
<style scoped>
@import '@/assets/bounceAnimation.css';
</style>
