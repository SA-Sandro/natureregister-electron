<script lang="ts" setup>
import { onMounted, onBeforeUnmount, defineProps } from 'vue';
import { SpecimenObservation } from '@/types/SpecimenObservationType';
import { getCoordinates } from '@/utils/GetCoordinates';
import { popupNotifier } from '@/services/PopupNotifierManagement';
import { TitleMessages } from '@/const/popup/PopupTitle';
import { ErrorMessages } from '@/const/popup/PopupMessages';
import L, { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const OPENSTREET_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

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
  }).setView(position, 13);
  console.log(props.observationInfo.geospatialData.coordinates);
  L.tileLayer(OPENSTREET_LAYER_URL, {
    maxZoom: 50,
  }).addTo(map);

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
