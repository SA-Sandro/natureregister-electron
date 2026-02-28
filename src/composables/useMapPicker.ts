import { ref, onBeforeUnmount } from 'vue';
import L, { Map, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const PNOA_ORTOPHOTO_URL = 'https://www.ign.es/wms-inspire/pnoa-ma';
const IGN_BASE_URL = 'https://www.ign.es/wms-inspire/ign-base';
const DEFAULT_POSITION: [number, number] = [36.7372, -4.4436]; // Centro de Málaga

export function useMapPicker(initialCoordinates?: string) {
  let map: Map | null = null;
  let marker: Marker | null = null;
  const selectedCoordinates = ref<[number, number] | null>(null);

  if (initialCoordinates) {
    const coords = initialCoordinates.split(',').map((c) => parseFloat(c.trim()));
    if (coords.length === 2 && coords.every((c) => !isNaN(c))) {
      selectedCoordinates.value = [coords[0], coords[1]];
    }
  }

  const initializeMap = (containerId?: string) => {
    if (map) {
      cleanup();
    }

    const position = selectedCoordinates.value || DEFAULT_POSITION;
    
    map = L.map(containerId, {
      zoomControl: true,
    }).setView(position, 12);

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

    if (selectedCoordinates.value) {
      addMarker(selectedCoordinates.value);
    }

    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      selectedCoordinates.value = [lat, lng];
      addMarker([lat, lng]);
    });
  };

  const addMarker = (position: [number, number]) => {
    if (marker) {
      marker.remove();
    }

    marker = L.marker(position)
      .addTo(map!)
      .bindPopup(
        `<strong>Ubicación seleccionada</strong><br/>Lat: ${position[0].toFixed(6)}<br/>Lng: ${position[1].toFixed(6)}`,
      )
      .openPopup();
  };

  const getSelectedCoordinates = (): string => {
    if (!selectedCoordinates.value) {
      return '';
    }
    return `${selectedCoordinates.value[0].toFixed(6)}, ${selectedCoordinates.value[1].toFixed(6)}`;
  };

  const cleanup = () => {
    if (map) {
      map.remove();
      map = null;
      marker = null;
    }
  };

  onBeforeUnmount(() => {
    cleanup();
  });

  return {
    initializeMap,
    getSelectedCoordinates,
    selectedCoordinates,
    cleanup,
  };
}
