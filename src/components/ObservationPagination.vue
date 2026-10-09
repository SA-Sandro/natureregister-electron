<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  pageSize: number;
  totalItems: number;
}>();

const emit = defineEmits<{
  'update:currentPage': [page: number];
}>();

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize));
const firstItem = computed(() => (props.currentPage - 1) * props.pageSize + 1);
const lastItem = computed(() => Math.min(props.currentPage * props.pageSize, props.totalItems));

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
    emit('update:currentPage', page);
  }
};
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="flex w-full flex-wrap items-center justify-center gap-4 px-4 py-6"
    aria-label="Navegación de páginas de imágenes"
  >
    <p class="text-sm text-slate-600" aria-live="polite">
      Mostrando {{ firstItem }}–{{ lastItem }} de {{ totalItems }}
    </p>
    <div class="flex items-center gap-2">
      <button
        type="button"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        class="cursor-pointer rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Anterior
      </button>
      <span class="min-w-28 text-center text-sm text-slate-700" aria-current="page">
        Página {{ currentPage }} de {{ totalPages }}
      </span>
      <button
        type="button"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        class="cursor-pointer rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  </nav>
</template>
