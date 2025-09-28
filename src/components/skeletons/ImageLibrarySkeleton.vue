<script setup lang="ts"></script>

<template>
  <div class="flex flex-col items-center p-6 min-h-screen">
    <div
      class="grid gap-6 w-full max-w-6xl grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]"
    >
      <div v-for="n in 20" :key="n" class="bg-white rounded-sm shadow-md overflow-hidden">
        <div class="relative w-full aspect-[4/3] bg-gray-300"></div>

        <div class="p-3 flex justify-around items-center">
          <div class="h-6 w-20 bg-gray-300 rounded"></div>
          <div class="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>
