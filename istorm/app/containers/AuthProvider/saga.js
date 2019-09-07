import { call, put, select, takeLatest } from 'redux-saga/effects';
import { REQUEST_LOGIN, REQUEST_LOGOUT, REQUEST_REFRESH } from 'containers/AuthProvider/constants';
import { requestError, requestLoginSuccess, requestLogoutSuccess } from '../../containers/AuthProvider/actions';

import { login, oauthOption, setToken } from 'utils/api';
 //import {  } from 'containers/Auth/selectors';

// Individual exports for testing
export function* loginAuthSaga(action) {
  // See example in containers/HomePage/saga.js
  const loginOption = { 
    method: 'post',
    body: Object.assign(oauthOption, { 
      username: action.request.email,
      password: action.request.password
    })
  };
  try {
    const request = yield call(login, loginOption);
    setToken(request.access_token);
    yield put(requestLoginSuccess(request));
    if(typeof action.redirect !== "undefined") {
      action.redirect("/");
    }
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* logoutAuthSaga(action) {
  console.info("logout saga");
  console.info(action);
  yield put(requestLogoutSuccess());
  // See example in containers/HomePage/saga.js
}

export function* refreshAuthSaga(action) {
    // setToken(request.access_token);
  // See example in containers/HomePage/saga.js
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* authSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(REQUEST_LOGIN, loginAuthSaga);
  yield takeLatest(REQUEST_LOGOUT, logoutAuthSaga);
  yield takeLatest(REQUEST_REFRESH, refreshAuthSaga);
}
