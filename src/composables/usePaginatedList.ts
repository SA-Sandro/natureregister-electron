import { computed, ref, watch } from 'vue';

export function usePaginatedList<T>(items: () => readonly T[], pageSize: number) {
  const currentPage = ref(1);
  const preservePage = ref(false);

  const paginatedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    return items().slice(startIndex, startIndex + pageSize);
  });

  const totalPages = computed(() => Math.ceil(items().length / pageSize));

  watch(
    items,
    () => {
      if (!preservePage.value) currentPage.value = 1;
    },
    { flush: 'sync' },
  );

  function clampPage() {
    currentPage.value = Math.min(currentPage.value, Math.max(totalPages.value, 1));
  }

  async function withPreservedPage<TResult>(operation: () => Promise<TResult>): Promise<TResult> {
    preservePage.value = true;
    try {
      return await operation();
    } finally {
      preservePage.value = false;
    }
  }

  return { currentPage, paginatedItems, clampPage, withPreservedPage } as const;
}
