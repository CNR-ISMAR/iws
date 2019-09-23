/*
 *
 * MapPage actions
 *
 */

import { TOGGLE_LAYER_VISIBILITY, ZOOM_IN, ZOOM_OUT, SET_VIEWPORT, 
  TOGGLE_LAYER_MEAN,REQUEST_INFO_LAYER, REQUEST_INFO_LAYER_SUCCESS, 
  POST_FAVOURITE,  POST_FAVOURITE_SUCCESS, DELETE_FAVOURITE, 
  REQUEST_FAVOURITES_LAYER, REQUEST_FAVOURITES_LAYER_SUCCESS,
  DELETE_FAVOURITE_SUCCESS, REQUEST_ERROR, CLOSE_INFO_LAYER } from './constants';

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


export function requestFavouritesLayer() {
  return {
    type: REQUEST_FAVOURITES_LAYER,
    
  };
}

export function requestFavouritesLayerSuccess(result) {
  return {
    type: REQUEST_FAVOURITES_LAYER_SUCCESS,
    result: result
  };
}

export function requestInfoLayerSuccess(result) {
  console.log('REQUEST_INFO_LAYER_SUCCESS')
  return {
    type: REQUEST_INFO_LAYER_SUCCESS,
    result: result
  };
}


export function postFavourite(Params) {
  console.log('Add Favourite')
  return {
    type: POST_FAVOURITE,
    Params: Params
  };
}

export function deleteFavourite(id) {
  console.log('Del / Favourite: '+id)
  return {
    type: DELETE_FAVOURITE,
    id: id
  };
}

export function deleteFavouriteSuccess() {
  return {
    type: DELETE_FAVOURITE_SUCCESS
  };
}

export function postFavouriteSuccess(results) {
  return {
    type: POST_FAVOURITE_SUCCESS,
    results: results,
  };
} 

export function requestError(errorMessage) {
  return {
    type: REQUEST_ERROR,
    error: errorMessage
  };
}

export function closeInfoLayer() {
  return {
    type: CLOSE_INFO_LAYER
  };
}

