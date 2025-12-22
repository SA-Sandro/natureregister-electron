<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { SpecimenObservation } from '@/types/SpecimenObservationType';
import { getCoordinates } from '@/utils/GetCoordinates';
import { popupNotifier } from '@/services/PopupNotifierManagement';
import { TitleMessages } from '@/const/popup/PopupTitle';
import { ErrorMessages } from '@/const/popup/PopupMessages';
import L, { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const PNOA_ORTOPHOTO_URL = 'https://www.ign.es/wms-inspire/pnoa-ma';
const IGN_BASE_URL = 'https://www.ign.es/wms-inspire/ign-base';

const props = defineProps<{
  observationInfo: SpecimenObservation;
}>();
const cords = getCoordinates(props.observationInfo.geospatialData.coordinates);

let map: Map | null = null;
let position: [number, number] = [0, 0];

if (!cords) {
  popupNotifier.createNotification(TitleMessages.ERROR, ErrorMessages.INVALID_COORDINATES, 'error');
} else {
  const [x, y] = cords;
  position = [x, y];
}

onMounted(() => {
  map = L.map('map', {
    zoomControl: true,
  }).setView(position, 19);

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

  L.marker(position)
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
  <div id="map"></div>
</template>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
