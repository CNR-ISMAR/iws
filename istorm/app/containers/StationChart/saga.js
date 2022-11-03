import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST_CHART } from './constants';
import { requestChartSuccess, requestError } from './actions';
import { chart } from 'utils/api';
 

export function* displayChartSaga(params) {
  try {
    const request = yield call(chart, params);
    // console.log('saga chart')
    yield put(requestChartSuccess(request));
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
  yield takeLatest(REQUEST_CHART, displayChartSaga);
}
