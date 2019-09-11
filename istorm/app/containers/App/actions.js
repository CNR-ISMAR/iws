/*
 *
 * MapPage actions
 *
 */

import { TOGGLE_LAYER_VISIBILITY, ZOOM_IN, ZOOM_OUT, SET_VIEWPORT, TOGGLE_LAYER_MEAN, REQUEST_NOTIFICATIONS, REQUEST_NOTIFICATIONS_SUCCESS, REQUEST_ERROR } from './constants';

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


export function requestNotifications(request) {
  return {
    type: REQUEST_NOTIFICATIONS,
    request: request
  };
}

export function requestNotificationsSuccess(result) {
  return {
    type: REQUEST_NOTIFICATIONS_SUCCESS,
    result: result
  };
}

export function requestError(errorMessage) {
  return {
    type: REQUEST_ERROR,
    error: errorMessage
  };
}
