import type * as L from 'leaflet';

export const MAP_TILE_UPDATE_OPTIONS: Pick<
  L.GridLayerOptions,
  'updateWhenIdle' | 'updateWhenZooming' | 'keepBuffer'
> = {
  updateWhenIdle: true,
  updateWhenZooming: false,
  keepBuffer: 2,
};
