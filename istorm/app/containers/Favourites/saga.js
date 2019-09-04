import { call, put, select, takeLatest  } from 'redux-saga/effects';
import { REQUEST_FAVOURITES, REQUEST_FAVOURITES_SUCCESS} from 'containers/Favourites/constants';
import { requestFavourites, requestFavouritesSuccess, requestError } from '../../containers/Favourites/actions';
import { getFavourites } from 'utils/api';

export function* FavouritesSaga() {
    const options = {
      method: 'get'
    };
    try {
      const request = yield call(getFavourites, options);
      yield put(requestFavouritesSuccess(request));
    } catch(e) {
      yield put(requestError(e.message));
      
    }
  }

export default function* favSaga() {
    yield takeLatest(REQUEST_FAVOURITES, FavouritesSaga);
}