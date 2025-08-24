<script lang="ts"></script>
<template>
  <div v-if="images.length > 0" class="image-library">
    <div v-for="(image, index) in images" :key="index" class="image-card">
      <img :src="image.url" :alt="image.name" />
      <p>{{ image.name }}</p>
    </div>
  </div>
  <div v-else>
    <p>No images available.</p>
  </div>
</template>
<style scoped>
.image-library {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.image-card {
  border: 1px solid black;
  width: 100%;
}
</style>
