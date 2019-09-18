import { call, put, select, takeLatest } from 'redux-saga/effects';
import { REQUEST_INFO_LAYER } from 'containers/App/constants';
import { requestInfoLayerSuccess, requestError } from 'containers/App/actions';
import { popups } from 'utils/api';
 

export function* infoLayerSaga(options) {
  try {
    const request = yield call(popups, options);
    console.log('saga popups')
    yield put(requestInfoLayerSuccess(request));
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
}
