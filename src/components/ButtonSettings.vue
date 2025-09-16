<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icons } from '@/assets/Icons';
import { useImageStore } from '@/stores/imageStores';

const isOpen = ref(false);
const popupVisible = ref(false);

const togglePopup = () => {
  isOpen.value = !isOpen.value;
  popupVisible.value = !popupVisible.value;
};

const imageStore = useImageStore();
const selectedFolder = computed(() => imageStore.selectedFolderName);
</script>

<template>
  <div>
    <button @click="togglePopup">
      <span v-html="Icons['adjustment']"></span>
    </button>
    <div v-show="popupVisible" class="popup">
      <h3>Carpeta actual</h3>
      <div class="linePopup">
        <p>{{ selectedFolder }}</p>
        <button>
          <span v-html="Icons['folder']"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup {
  height: 12rem;
  width: 24rem;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  gap: 1.5rem;
  border: 3px solid black;
}
.linePopup {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>

<!-- investigar como pasar el selected folder a butonsetting, usar stores?  -->
