import { call, put, select, takeLatest } from 'redux-saga/effects';
import { REQUEST_LOGIN, REQUEST_REFRESH, REQUEST_LOGOUT, 
        REQUEST_PROFILE, REQUEST_NOTIFICATION, DELETE_NOTIFICATION, UPDATE_NOTIFICATION } from 'containers/AuthProvider/constants';
import { requestError, 
  requestLoginSuccess, 
  requestLogoutSuccess, 
  requestProfileSuccess,
  requestNotificationSuccess,
  deleteNotificationSuccess,
  stopLoading } from '../../containers/AuthProvider/actions';
import makeSelectAuth, { tokensExistsExpired  } from '../../containers/AuthProvider/selectors';
import { push } from 'connected-react-router';
import {  login, loginRefresh, oauthOption, 
          setToken, oauthOptionRefreshToken, getProfile, 
          notification, deleteNotification, updateNotification } from 'utils/api';
import {enqueueSuccess,enqueueRemove} from "containers/NotificationSnake/actions";
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
    yield call(userProfileSaga);
    yield put(push("/"));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* userProfileSaga() {
  const options = {
    method: 'get'
  };
  try {
    const request = yield call(getProfile, options);
    yield put(requestProfileSuccess(request));
    yield call(notificationSaga);
  } catch(e) {
    yield put(requestError(e.message));
    yield call(logoutAuthSaga);
  }
}

export function* notificationSaga() {
  const options = {
    method: 'get'
  }; 
  console.log('notificationSaga')
  try {
    const request = yield call(notification, options);
    yield put(requestNotificationSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
    /* yield call(logoutAuthSaga); */
  }
}

export function* deleteNotificationSaga(action) {
   try {
    const request = yield call(deleteNotification, action.id);
    // yield put(deleteNotificationSuccess(request));
    yield put(enqueueRemove("Notification removed"));
    yield call(notificationSaga)
  } catch(e) {
    yield put(requestError(e.message));

  }
}

export function* updateNotificationSaga(action) {
  try {
   const request = yield call(updateNotification, action.id);
   console.log('updateNotificationSaga')
   // yield put(deleteNotificationSuccess(request));
   yield call(notificationSaga)
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
      yield call(notificationSaga);
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
  yield takeLatest(REQUEST_PROFILE, userProfileSaga);
  yield takeLatest(REQUEST_NOTIFICATION, notificationSaga);
  yield takeLatest(DELETE_NOTIFICATION, deleteNotificationSaga);
  yield takeLatest(UPDATE_NOTIFICATION, updateNotificationSaga);
}
