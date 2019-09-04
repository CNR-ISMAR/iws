/*
 *
 * MapPage actions
 *
 */

import { /* TOGGLE_DRAWER, CLOSE_DRAWER, OPEN_DRAWER, TOGGLE_DRAWER_MINI, CLOSE_DRAWER_MINI, OPEN_DRAWER_MINI, */ REQUEST_FAVOURITES, REQUEST_FAVOURITES_SUCCESS, REQUEST_ERROR} from './constants';

/* export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER
  };
}

export function openDrawer() {
  return {
    type: OPEN_DRAWER
  };
}

export function closeDrawer() {
  return {
    type: CLOSE_DRAWER
  };
}

export function toggleDrawerMini() {
  return {
    type: TOGGLE_DRAWER_MINI
  };
}

export function openDrawerMini() {
  return {
    type: OPEN_DRAWER_MINI
  };
}

export function closeDrawerMini() {
  return {
    type: CLOSE_DRAWER_MINI
  };
} */

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

export function requestError(errorMessage) {
  return {
    type: REQUEST_ERROR,
    error: errorMessage
  };
}