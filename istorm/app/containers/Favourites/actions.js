/*
 *
 * MapPage actions
 *
 */

import { REQUEST_FAVOURITES, REQUEST_FAVOURITES_SUCCESS, DELETE_FAVOURITE, REQUEST_ERROR} from './constants';

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

export function deleteFavourite(id) {
  return {
    type: DELETE_FAVOURITE,
    id: id
  };
}

export function deleteFavouriteSuccess(id) {
  return {
    type: DELETE_FAVOURITE_SUCCESS
  };
}

export function requestError(errorMessage) {
  return {
    type: REQUEST_ERROR,
    error: errorMessage
  };
}
