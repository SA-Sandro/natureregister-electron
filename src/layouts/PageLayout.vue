<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue';
</script>

<template>
  <header class="bg-green-50 w-full position-fixed top-0 z-10">
    <MainHeader />
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>2024 &copy; Nature Register</footer>
</template>
