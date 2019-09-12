/*
 *
 * MapPage actions
 *
 */

import { TOGGLE_LAYER_VISIBILITY, ZOOM_IN, ZOOM_OUT, SET_VIEWPORT, TOGGLE_LAYER_MEAN } from './constants';

export function toggleLayerMean() {
  return {
    type: TOGGLE_LAYER_MEAN
  };
}

export function setViewport(viewport) {
  return {
    type: SET_VIEWPORT,
    viewport: viewport
  };
}

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


