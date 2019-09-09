import { call, put, select, takeLatest  } from 'redux-saga/effects';
import { REQUEST_FAVOURITES, DELETE_FAVOURITE} from 'containers/Favourites/constants';
import { requestFavouritesSuccess, requestError } from '../../containers/Favourites/actions';
import { favourites, DeleteFavourite } from 'utils/api';

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

export function* DeleteFavouriteSaga(action) {
  const options = {
    method: 'delete'
  }; 
  console.log(action)
  try {
    const request = yield call(DeleteFavourite(options, action.id));
    // yield put(requestFavouritesSuccess(request));
   
  } catch(e) {
    yield put(requestError(e.message));
    
  }
}
 
export default function* favSaga() {
    yield takeLatest(REQUEST_FAVOURITES, FavouritesSaga);
    yield takeLatest(DELETE_FAVOURITE, DeleteFavouriteSaga);
}