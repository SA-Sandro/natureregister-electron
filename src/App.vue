<script setup lang="ts">
import ImageLibrary from '@/components/ImageLibrary.vue';
import PageLayout from '@/layouts/PageLayout.vue';
import SpecieDetailsDialog from '@/components/SpecieDetailsDialog.vue';
import ImageLibrarySkeleton from '@/components/skeletons/ImageLibrarySkeleton.vue';
import { useLoaderStore } from './stores/loaderStore';
import { onMounted } from 'vue';
import { useImageStore } from './stores/imageStore';

onMounted(async () => {
  await useImageStore().init();
});

const loaderStore = useLoaderStore();
</script>

<template>
  <PageLayout>
    <ImageLibrarySkeleton v-if="loaderStore.isLoading" />
    <ImageLibrary v-else />
    <SpecieDetailsDialog />
  </PageLayout>
</template>

<style scoped></style>
