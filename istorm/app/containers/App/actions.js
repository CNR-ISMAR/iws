/*
 *
 * MapPage actions
 *
 */

import { TOGGLE_LAYER_VISIBILITY, ZOOM_IN, ZOOM_OUT, SET_VIEWPORT,
  TOGGLE_LAYER_MEAN,REQUEST_INFO_LAYER, REQUEST_INFO_LAYER_SUCCESS,
  POST_FAVOURITE,  POST_FAVOURITE_SUCCESS, POST_FAVOURITE_EMPTY, DELETE_POST_FAVOURITE,
  REQUEST_FAVOURITES_LAYER, REQUEST_FAVOURITES_LAYER_SUCCESS,
  DELETE_POST_FAVOURITE_SUCCESS, REQUEST_ERROR, EMPTY_INFO_LAYER, TOGGLE_INFO_LAYER,
  REQUEST_FAVOURITES, REQUEST_FAVOURITES_SUCCESS, DELETE_FAVOURITE, SYNC_DISMISS,
   DELETE_FAVOURITE_SUCCESS, FILL_IF_IS_FAVOURITE, SET_LAT_LON, DISMISS_CREDITS, SET_POINT_POPUP } from './constants';


export function toggleInfoLayer(open) {
    return {
      type: TOGGLE_INFO_LAYER,
      open: open
    };
}

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
  // console.log('REQUEST_INFO_LAYER_SUCCESS')
  return {
    type: REQUEST_INFO_LAYER_SUCCESS,
    result: result
  };
}


export function postFavourite(Params) {
  // console.log('Add Favourite')
  return {
    type: POST_FAVOURITE,
    Params: Params
  };
}

export function postFavouriteSuccess(results) {
  return {
    type: POST_FAVOURITE_SUCCESS,
    results: results,
  };
}


export function postFavouriteEmpty() {
  return {
    type: POST_FAVOURITE_EMPTY,

  };
}

export function deleteFavourite(id) {
  return {
    type: DELETE_FAVOURITE,
    id: id
  };
}


export function requestFavourites(request) {

  return {
    type: REQUEST_FAVOURITES,
    request: request
  };
}

export function requestFavouritesSuccess(result) {
  return {
    type: REQUEST_FAVOURITES_SUCCESS,
    result: result
  };
}

export function deleteFavouriteSuccess() {
  return {
    type: DELETE_FAVOURITE_SUCCESS
  };
}


export function fillIfIsFavourite(item) {
  return {
    type: FILL_IF_IS_FAVOURITE,
    item: item
  };
}


export function requestError(errorMessage) {
  return {
    type: REQUEST_ERROR,
    error: errorMessage
  };
}

export function emptyInfoLayer() {
  return {
    type: EMPTY_INFO_LAYER
  };
}

export function getLatLon(latitude, longitude) {
  return {
    type: SET_LAT_LON,
    latitude: latitude,
    longitude: longitude
  };
}

export function dismissCredits() {
  return {
    type: DISMISS_CREDITS
  };
}
export function syncDismiss() {
  return {
    type: SYNC_DISMISS
  };
}

export function setPointPopup(popup) {
  return {
    type: SET_POINT_POPUP,
    popup: popup
  };
}

