import { call, put, select, takeLatest } from 'redux-saga/effects';
import { REQUEST_INFO_LAYER, POST_FAVOURITE, DELETE_FAVOURITE, REQUEST_FAVOURITES_LAYER,REQUEST_FAVOURITES } from 'containers/App/constants';
import { requestInfoLayerSuccess, requestError , postFavouriteSuccess, deleteFavouriteSuccess, requestFavouritesLayerSuccess, togglePaper, postFavouriteEmpty  } from 'containers/App/actions';
import { popups, postFavourite, deleteFavourite, geoJsonFavourites } from 'utils/api';

import {enqueueSuccess} from "containers/NotificationSnake/actions";

import { requestFavouritesSuccess, /* postFavouriteSuccess */ } from 'containers/App/actions';
import { favourites } from 'utils/api';

export function* infoLayerSaga(options) {
  try {
    const request = yield call(popups, options);
    console.log('infoLayerSaga')
    yield put(requestInfoLayerSuccess(request));
    yield put(postFavouriteEmpty())
    yield put(togglePaper(true))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* postFavouriteSaga(action) {
  const options = {
    method: 'post',
    body: {...action.Params}
  };
  try {
    const request = yield call(postFavourite, options);
    console.log('postFavouriteSaga')
    yield put(postFavouriteSuccess(request));
    yield put(enqueueSuccess("Favourite added"));
    yield call(FavouritesSaga);
    yield call(requestFavouritesLayerSaga)
  } catch(e) {
    yield put(requestError(e.message));

  }
}

export function* requestFavouritesLayerSaga() {
  try {
    const request = yield call(geoJsonFavourites);
    console.log('requestFavouritesLayerSaga')
    yield put(requestFavouritesLayerSuccess(request));
  } catch(e) {
    // console.log('requestFavouritesLayerSaga: '+e.message)
    yield put(requestError(e.message));
  }
}

// export function* deleteFavouriteSaga(action) {
//   try {
//     const request = yield call(deleteFavourite, action.id);
//     yield put(deleteFavouriteSuccess(request));
//     yield call(FavouritesSaga);
//   } catch(e) {
//     yield put(requestError(e.message));
//
//   }
// }


export function* FavouritesSaga(action) {
  /* const options = {
    method: 'get'
  }; */
  
  try {
    const request = yield call(favourites);
    yield put(requestFavouritesSuccess(request));
    
  } catch(e) {
    yield put(requestError(e.message));
    
  }
}

export function* deleteFavouriteSaga(action) {
  const options = {
    method: 'delete'
  }; 
  try {
    const request = yield call(deleteFavourite, action.id);
    yield put(postFavouriteEmpty())
    // yield put(deleteFavouritesSuccess(request));
    yield call(FavouritesSaga);
    yield call(requestFavouritesLayerSaga)
  } catch(e) {
    yield put(requestError(e.message));

  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* mapPageSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(REQUEST_INFO_LAYER, infoLayerSaga);
  yield takeLatest(POST_FAVOURITE, postFavouriteSaga);
  yield takeLatest(DELETE_FAVOURITE, deleteFavouriteSaga);
  yield takeLatest(REQUEST_FAVOURITES_LAYER, requestFavouritesLayerSaga);
  yield takeLatest(REQUEST_FAVOURITES, FavouritesSaga);
}
