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

const { isOpen, closeDialogByEsc, closeOnBackdrop } = useDialog(DialogType.SETTING_BUTTON);
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
    class="align-middle select-none transition-transform duration-200 disabled:opacity-50 hover:scale-110 hover:shadow-lg focus:opacity-85 focus:shadow-none active:scale-95"
  >
    <SettingsIcon />
  </button>

  <div
    v-show="isOpen"
    id="dialog-overlay-setting-button"
    tabindex="0"
    @click="closeOnBackdrop"
    @keydown="closeDialogByEsc"
    class="absolute inset-0 z-50"
  >
    <div
      class="absolute top-4 right-4 w-60 bg-white rounded-2xl shadow-xl p-5 flex flex-col gap-4 transition-transform duration-200 ease-out transform scale-95"
    >
      <h3 class="text-green-700 font-extrabold uppercase text-sm tracking-wide">Carpeta actual</h3>
      <div class="flex gap-2">
        <button type="button" class="hover:scale-110 transsition-all cursor-pointer">
          <SelectFolder />
        </button>
        <p class="text-gray-800 font-semibold truncate">{{ folderName }}</p>
      </div>
    </div>
  </div>
</template>
