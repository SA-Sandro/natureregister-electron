import { useDialogStore } from '@/stores/dialogStore';
import { watch, nextTick, computed } from 'vue';

export default function useDialog(type: string) {
  const dialog = useDialogStore();

  const isOpen = computed(() => dialog.isOpen(type));

  watch(
    () => dialog.isOpen(type),
    async (open) => {
      document.body.classList.toggle('overflow-hidden', open);
      if (open) {
        await nextTick();
        document.getElementById(`dialog-overlay-${type}`)?.focus();
      }
    },
  );

  const closeDialogByEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') dialog.toggle(type);
  };

  const closeOnBackdrop = (event: MouseEvent) => {
    if ((event.target as HTMLElement).id === `dialog-overlay-${type}`) {
      dialog.toggle(type);
    }
  };

  return { isOpen, closeDialogByEsc, closeOnBackdrop };
}
