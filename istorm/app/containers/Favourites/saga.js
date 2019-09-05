import { call, put, select, takeLatest  } from 'redux-saga/effects';
import { REQUEST_FAVOURITES} from 'containers/Favourites/constants';
import { requestFavouritesSuccess, requestError } from '../../containers/Favourites/actions';
import { favourites } from 'utils/api';

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

export default function* favSaga() {
    yield takeLatest(REQUEST_FAVOURITES, FavouritesSaga);
}