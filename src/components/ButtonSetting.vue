<script setup lang="ts">
import { ref } from 'vue';
import SettingsIcon from '@/components/Icons/SettingsIcon.vue';
import SelectFolder from '@/components/SelectFolder.vue';
import { useFolderStore } from '@/stores/folderStore';
import { storeToRefs } from 'pinia';
import getFolderNameFromPath from '@/utils/GetFolderNameFromPath';

const isOpen = ref(false);
const popupVisible = ref(false);

const togglePopup = () => {
  isOpen.value = !isOpen.value;
  popupVisible.value = !popupVisible.value;
};
//obtenemos el nombre actual de la carpeta e iniciamos getfoldernamefrompath para que cargue el nombre al iniciar la app
const folderStore = useFolderStore();
const { folderName } = storeToRefs(folderStore);
getFolderNameFromPath();
</script>

<template>
  <div>
    <button
      @click="togglePopup"
      data-ripple-dark="true"
      data-popover-target="popover-select-folder"
      class="align-middle select-none transition-all dissabled:opacity-50 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none hover:scale-110"
    >
      <SettingsIcon />
    </button>
    <div
      v-show="popupVisible"
      class="h-25 w-45 flex justify-center items-center flex-col gap-3 rounded-2xl absolute z-50 right-0 bg-white"
    >
      <h3 class="uppercase text-green-700 font-black font-sans tracking-tigh">Carpeta actual</h3>
      <div class="flex gap-2 justify-center !items-center">
        <button type="button" class="hover:scale-110 transsition-all cursor-pointer">
          <SelectFolder />
        </button>
        <p class="text-black font-black">{{ folderName }}</p>
      </div>
    </div>
  </div>
</template>
