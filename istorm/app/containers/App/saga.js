import { call, put, select, takeLatest  } from 'redux-saga/effects';
import { REQUEST_NOTIFICATIONS } from './constants';
import { requestNotificationsSuccess, requestError } from './actions';
import { notifications } from 'utils/api';

export function* NotificationsSaga(action) {
  /* const options = {
    method: 'get'
  }; */
  try {
    const request = yield call(notifications);
    yield put(requestNotificationsSuccess(request));
    
  } catch(e) {
    yield put(requestError(e.message));
    
  }

}

/* export function* deleteFavouriteSaga(action) {
  const options = {
    method: 'delete'
  }; 
  try {
    const request = yield call(deleteFavourite, action.id);
    yield put(deleteFavouriteSuccess(request));
    yield call(FavouritesSaga)
  } catch(e) {
    yield put(requestError(e.message));

  }
} */
 
export default function* NotifySaga() {
    yield takeLatest(REQUEST_NOTIFICATIONS, NotificationsSaga);
    /* yield takeLatest(DELETE_FAVOURITE, deleteFavouriteSaga); */
}
