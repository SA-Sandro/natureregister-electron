<script setup lang="ts">
import SelectFolder from './SelectFolder.vue';
</script>

<template>
  <div class="w-full h-25 flex justify-between items-center p-3">
    <div>
      <div class="flex items-center">
        <img src="/logo_nt.png" alt="Nature Register Logo" class="w-25" />
        <span class="ml-4 text-2xl font-semibold text-green-700 tracking-wide">
          Nature Register
        </span>
      </div>
    </div>
    <div>
      <SelectFolder />
    </div>
  </div>
</template>
