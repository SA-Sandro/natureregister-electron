import { useDialogStore } from '@/stores/dialogStore';
import { watch, nextTick } from 'vue';

export default function useDialog() {
  const dialog = useDialogStore();

  watch(
    () => dialog.isOpen,
    async (isOpen) => {
      document.body.classList.toggle('overflow-hidden', isOpen);
      if (isOpen) {
        await nextTick();
        document.getElementById('dialog-overlay')?.focus();
      }
    },
  );

  const closeDialogByEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') dialog.toggle();
  };

  const closeOnBackdrop = (event: MouseEvent) => {
    if ((event.target as HTMLElement).id === 'dialog-overlay') dialog.toggle();
  };

  return { dialog, closeDialogByEsc, closeOnBackdrop };
}
