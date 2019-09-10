import { call, put, select, takeLatest } from 'redux-saga/effects';
import { REQUEST_LOGIN, REQUEST_REFRESH, REQUEST_LOGOUT } from 'containers/AuthProvider/constants';
import { requestError, requestLoginSuccess, requestLogoutSuccess, stopLoading } from '../../containers/AuthProvider/actions';
import makeSelectAuth, { tokensExistsExpired  } from '../../containers/AuthProvider/selectors';
import { login, loginRefresh, oauthOption, setToken, oauthOptionRefreshToken } from 'utils/api';
 //import {  } from 'containers/Auth/selectors';

// Individual exports for testing
export function* loginAuthSaga(action) {
  // See example in containers/HomePage/saga.js
  const loginOption = { 
    method: 'post',
    body: {...oauthOption, ...{
      username: action.request.email,
      password: action.request.password
    }}
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

export function* logoutAuthSaga() {
  yield put(requestLogoutSuccess());
}

export function* refreshAuthSaga() {

  const tokensExpired = yield select(tokensExistsExpired());

  if(tokensExpired) {
    const authDomain = yield select(makeSelectAuth())
    const loginOption = { 
      method: 'post',
      body: Object.assign(oauthOptionRefreshToken, {
        refresh_token: authDomain.oauth.refreshToken
      })
    };
    try {
      const request = yield call(loginRefresh, loginOption);
      setToken(request.access_token);
      yield put(requestLoginSuccess(request));
      yield call(userProfileSaga);
    } catch(e) {
      yield put(requestError(e.message));
      yield call(logoutAuthSaga);
    }
  } else {
    yield put(stopLoading())
  }
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
