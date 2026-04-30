<script setup lang="ts">
import { onMounted } from 'vue';
import SettingsIcon from '@/components/Icons/SettingsIcon.vue';
import SelectFolder from '@/components/SelectFolder.vue';
import { useFolderStore } from '@/stores/folderStore';
import { storeToRefs } from 'pinia';
import getFolderNameFromPath from '@/utils/GetFolderNameFromPath';
import { LocalStorageService } from '@/services/LocalStorageService';
import useDialog from '@/composables/useDialog';
import { DialogType } from '@/const/DialogType';
import { useDialogStore } from '@/stores/dialogStore';

const { isOpen, closeDialogHandler } = useDialog(DialogType.SETTING_BUTTON);
const folderStore = useFolderStore();
const dialog = useDialogStore();
const { folderName } = storeToRefs(folderStore);

onMounted(() => {
  const folderPath = new LocalStorageService().getItem('selectedFolderPath');
  const initialFolderName = getFolderNameFromPath(folderPath);

  if (initialFolderName) {
    folderStore.setFolderName(initialFolderName);
  }
});

const showSettingsDialog = () => {
  dialog.toggle(DialogType.SETTING_BUTTON);
};
</script>

<template>
  <button
    @click="showSettingsDialog"
    class="cursor-pointer inline-flex size-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 active:scale-95"
    aria-label="Abrir ajustes"
  >
    <SettingsIcon />
  </button>

  <div
    v-show="isOpen"
    id="dialog-overlay-setting-button"
    tabindex="0"
    @click="closeDialogHandler"
    @keydown="closeDialogHandler"
    class="fixed inset-0 z-50 bg-slate-950/10 backdrop-blur-sm"
  >
    <div
      class="absolute top-4 right-4 w-72 rounded-[28px] border border-slate-200 bg-white/95 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-md"
    >
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-[11px] uppercase tracking-[0.3em] text-emerald-700 font-bold mb-2">
            Carpeta actual
          </p>
          <p class="text-slate-900 font-semibold leading-5 truncate">
            {{ folderName || 'No hay ninguna carpeta seleccionada' }}
          </p>
        </div>
        <div
          class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shadow-sm"
        >
          <SelectFolder />
        </div>
      </div>
    </div>
  </div>
</template>
