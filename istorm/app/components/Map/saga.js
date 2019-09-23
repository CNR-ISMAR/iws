import { call, put, select, takeLatest } from 'redux-saga/effects';
import { REQUEST_INFO_LAYER, POST_FAVOURITE, DELETE_FAVOURITE } from 'containers/App/constants';
import { requestInfoLayerSuccess, requestError , postFavouriteSuccess, deleteFavouriteSuccess  } from 'containers/App/actions';
import { popups, postFavourite, deleteFavourite } from 'utils/api';
import {FavouritesSaga} from 'containers/Favourites/saga';
 

export function* infoLayerSaga(options) {
  try {
    const request = yield call(popups, options);
    console.log('infoLayerSaga')
    yield put(requestInfoLayerSuccess(request));
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
    yield call(FavouritesSaga);
  } catch(e) {
    yield put(requestError(e.message));

  }
}

export function* deleteFavouriteSaga(action) {
  try {
    const request = yield call(deleteFavourite, action.id);
    yield put(deleteFavouriteSuccess(request));
    yield call(FavouritesSaga);
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
}
