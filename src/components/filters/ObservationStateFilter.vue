<script setup lang="ts">
import { ObservationStatus } from '@/const/ObservationStatus';

const selectedStatus = defineModel<ObservationStatus>({ default: ObservationStatus.ALL });
</script>

<template>
  <section class="rounded-[28px] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
    <div class="flex items-center justify-between gap-4 mb-5">
      <div>
        <h3 class="text-xl font-semibold text-slate-900">Estado de observación</h3>
        <p class="mt-1 text-sm text-slate-500">
          Elige entre observaciones registradas, por procesar o ambas.
        </p>
      </div>
      <span
        class="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600"
        >Actual</span
      >
    </div>

    <div>
      <ProcessedObservationsFilter v-model="selectedStatus" />
    </div>
  </section>
</template>

<style scoped></style>
