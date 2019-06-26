/*
 *
 * MapPage actions
 *
 */

import { TOGGLE_LAYER_VISIBILITY, ZOOM_IN, ZOOM_OUT } from './constants';

export function toggleLayerVisibility(layer) {
  return {
    type: TOGGLE_LAYER_VISIBILITY,
    layer: layer
  };
}

export function zoomIn() {
  return {
    type: ZOOM_IN
  };
}

export function zoomOut() {
  return {
    type: ZOOM_OUT
  };
}
