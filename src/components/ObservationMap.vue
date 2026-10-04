<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { SpecimenObservation } from '@/types/SpecimenObservationType';
import { getCoordinates } from '@/utils/GetCoordinates';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@/utils/ConfigureLeafletIcons';

const PNOA_ORTOPHOTO_URL = 'https://www.ign.es/wms-inspire/pnoa-ma';
const IGN_BASE_URL = 'https://www.ign.es/wms-inspire/ign-base';

const props = defineProps<{
  observationInfo: SpecimenObservation;
}>();
const cords = getCoordinates(props.observationInfo.geospatialData.coordinates);

let map: L.Map | null = null;

onMounted(() => {
  if (!cords) return;

  map = L.map('map', {
    zoomControl: true,
  }).setView(cords, 19);

  const pnoa = L.tileLayer.wms(PNOA_ORTOPHOTO_URL, {
    layers: 'OI.OrthoimageCoverage',
    format: 'image/png',
    maxZoom: 19,
    transparent: false,
  });

  pnoa.addTo(map);

  const labels = L.tileLayer.wms(IGN_BASE_URL, {
    layers: 'IGNBaseTodo',
    format: 'image/png',
    maxZoom: 16,
    transparent: true,
    opacity: 0.6,
  });

  labels.addTo(map);

  L.marker(cords)
    .addTo(map)
    .bindPopup(
      props.observationInfo.geospatialData.observationSite +
        ', ' +
        props.observationInfo.geospatialData.locality +
        ', ' +
        props.observationInfo.geospatialData.province,
    )
    .openPopup();
});

onBeforeUnmount(() => {
  map?.remove();
});
</script>

<template>
  <div
    v-if="cords"
    id="map"
    role="region"
    aria-label="Mapa de ubicación de la observación"
  ></div>
  <div
    v-else
    class="flex h-full min-h-[220px] items-center justify-center px-4 text-center text-sm text-slate-500"
    role="status"
  >
    Ubicación no disponible
  </div>
</template>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
