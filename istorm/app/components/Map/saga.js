import { call, put, select, takeLatest } from 'redux-saga/effects';
import { REQUEST_POPUP } from 'containers/App/constants';
import { requestPopUpSuccess } from 'containers/App/actions';
import { popup } from 'utils/api';
 

export function* popupSaga() {
  // console.log('notificationSaga')
  try {
    const request = yield call(popup);
    console.log('saga popup')
    yield put(requestPopUpSuccess(request));
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
  yield takeLatest(REQUEST_POPUP, popupSaga);
}
