import { nextTick, ref } from 'vue';
import { describe, expect, it } from 'vitest';
import { usePaginatedList } from '@/composables/usePaginatedList';

describe('usePaginatedList', () => {
  it('paginates items and resets to the first page when the list changes', async () => {
    const items = ref(Array.from({ length: 5 }, (_, index) => index + 1));
    const pagination = usePaginatedList(() => items.value, 2);
    pagination.currentPage.value = 2;

    expect(pagination.paginatedItems.value).toEqual([3, 4]);

    items.value = [6, 7, 8];
    await nextTick();

    expect(pagination.currentPage.value).toBe(1);
    expect(pagination.paginatedItems.value).toEqual([6, 7]);
  });

  it('preserves the page during an operation and clamps it if the list shrinks', async () => {
    const items = ref(Array.from({ length: 5 }, (_, index) => index + 1));
    const pagination = usePaginatedList(() => items.value, 2);
    pagination.currentPage.value = 3;

    await pagination.withPreservedPage(async () => {
      items.value = [1, 2, 3];
      await nextTick();
      pagination.clampPage();
    });

    expect(pagination.currentPage.value).toBe(2);
    expect(pagination.paginatedItems.value).toEqual([3]);
  });

  it('releases page preservation when the operation fails', async () => {
    const items = ref([1, 2, 3]);
    const pagination = usePaginatedList(() => items.value, 2);
    pagination.currentPage.value = 2;

    await expect(
      pagination.withPreservedPage(async () => {
        throw new Error('refresh failed');
      }),
    ).rejects.toThrow('refresh failed');

    items.value = [4, 5, 6];
    await nextTick();

    expect(pagination.currentPage.value).toBe(1);
  });
});
