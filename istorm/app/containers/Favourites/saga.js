/* import { call, put, select, takeLatest  } from 'redux-saga/effects';
import { REQUEST_FAVOURITES, DELETE_FAVOURITE } from 'containers/Favourites/constants';
import { requestFavouritesSuccess, requestError, deleteFavouriteSuccess,  } from '../../containers/Favourites/actions';
import { favourites, deleteFavourite } from 'utils/api';
import {requestFavouritesLayerSaga} from 'containers/MapPage/saga'

export function* FavouritesSaga(action) {

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
    yield put(deleteFavouriteSuccess(request));
    yield call(FavouritesSaga);
    yield call(requestFavouritesLayerSaga)
  } catch(e) {
    yield put(requestError(e.message));

  }
}


 
export default function* favSaga() {
    yield takeLatest(REQUEST_FAVOURITES, FavouritesSaga);
    yield takeLatest(DELETE_FAVOURITE, deleteFavouriteSaga);
}
 */