import * as L from 'leaflet';
import { MAP_TILE_UPDATE_OPTIONS } from '@/utils/MapTileOptions';

const ESRI_WORLD_IMAGERY_URL =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const ESRI_WORLD_IMAGERY_ATTRIBUTION =
  'Source: Esri, Vantor, Earthstar Geographics, and the GIS User Community';

export const createEsriWorldImageryLayer = (): L.TileLayer =>
  L.tileLayer(ESRI_WORLD_IMAGERY_URL, {
    attribution: ESRI_WORLD_IMAGERY_ATTRIBUTION,
    maxNativeZoom: 23,
    maxZoom: 23,
    ...MAP_TILE_UPDATE_OPTIONS,
  });
