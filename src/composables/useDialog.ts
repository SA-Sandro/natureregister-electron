import { DialogType } from '@/const/DialogType';
import { useDialogStore } from '@/stores/dialogStore';
import { watch, nextTick, computed, unref, type Ref } from 'vue';

const DIALOG_OVERLAY_ID_PREFIX = 'dialog-overlay-';

export default function useDialog(type: string | Ref<string>) {
  const dialog = useDialogStore();

  const resolveType = () => unref(type);

  const isOpen = computed(() => dialog.isOpen(resolveType()));

  watch(
    () => dialog.isOpen(resolveType()),
    async (open) => {
      document.body.classList.toggle('overflow-hidden', open);
      if (open) {
        await nextTick();
        document.getElementById(`${DIALOG_OVERLAY_ID_PREFIX}${resolveType()}`)?.focus();
      }
    },
  );

  const closeDialogHandler = (event: KeyboardEvent | MouseEvent) => {
    const currentType = resolveType();
    if (event instanceof KeyboardEvent && event.key === 'Escape') dialog.toggle(currentType);

    if (!(event instanceof MouseEvent)) return;

    if (
      (event.target as HTMLElement).id ===
        `${DIALOG_OVERLAY_ID_PREFIX}${DialogType.CANCEL_BUTTON}` ||
      (event.target as HTMLElement).id === `${DIALOG_OVERLAY_ID_PREFIX}${DialogType.CONFIRM_BUTTON}`
    ) {
      event.stopPropagation();
      dialog.toggle(currentType);
    }

    if ((event.target as HTMLElement).id === `${DIALOG_OVERLAY_ID_PREFIX}${currentType}`) {
      dialog.toggle(currentType);
    }
  };

  return { isOpen, closeDialogHandler };
}
