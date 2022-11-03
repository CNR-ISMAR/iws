import { call, put, select, takeLatest } from 'redux-saga/effects';
import { DISMISS_CREDITS } from 'containers/App/constants';
import { push } from 'connected-react-router';

export function* dismissCreditsSaga(options) {
    if(window.location.pathname === '/credits') {
    yield put(push("/"));
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
  yield takeLatest(DISMISS_CREDITS, dismissCreditsSaga);
}
