<script setup lang="ts">
import ImageLibrarySkeleton from '@/components/skeletons/ImageLibrarySkeleton.vue';
import ImageLibrary from '@/components/ImageLibrary.vue';
import ObservationsFilter from '@/components/ObservationsFilter.vue';
import PageLayout from '@/layouts/PageLayout.vue';
import SpecieDetailsDialog from '@/components/SpecieDetailsDialog.vue';
import { useLoaderStore } from './stores/loaderStore';
import { onMounted } from 'vue';
import { useImageStore } from './stores/imageStore';

const loaderStore = useLoaderStore();
const imageStore = useImageStore();

onMounted(async () => {
  await imageStore.init();
});
</script>

<template>
  <PageLayout>
    <template #observationFilter>
      <ObservationsFilter />
    </template>
    <template #observationLibrary>
      <template v-if="loaderStore.isLoading">
        <ImageLibrarySkeleton />
      </template>
      <template v-else>
        <ImageLibrary />
        <SpecieDetailsDialog />
      </template>
    </template>
  </PageLayout>
</template>

<style scoped></style>
