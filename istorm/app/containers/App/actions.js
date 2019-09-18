/*
 *
 * MapPage actions
 *
 */

import { TOGGLE_LAYER_VISIBILITY, ZOOM_IN, ZOOM_OUT, SET_VIEWPORT, 
  TOGGLE_LAYER_MEAN,REQUEST_INFO_LAYER, REQUEST_INFO_LAYER_SUCCESS, REQUEST_ERROR } from './constants';

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

export function requestInfoLayer(options) {
  return {
    type: REQUEST_INFO_LAYER,
    parameters: options,
  };
}

export function requestInfoLayerSuccess(result) {
  console.log('REQUEST_INFO_LAYER_SUCCESS')
  return {
    type: REQUEST_INFO_LAYER_SUCCESS,
    result: result
  };
}

export function requestError(errorMessage) {
  return {
    type: REQUEST_ERROR,
    error: errorMessage
  };
}
