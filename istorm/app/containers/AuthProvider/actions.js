/*
 *
 * Auth actions
 *
 */

import { SYNC_AUTH, REQUEST_NOTIFICATION, REQUEST_NOTIFICATION_SUCCESS, 
        DELETE_NOTIFICATION, DELETE_NOTIFICATION_SUCCESS, UPDATE_NOTIFICATION,
        REQUEST_PROFILE, REQUEST_PROFILE_SUCCESS ,STOP_LOADING, 
        REQUEST_LOGIN, REQUEST_LOGOUT, REQUEST_REFRESH, 
        REQUEST_LOGIN_SUCCESS, REQUEST_LOGOUT_SUCCESS, 
        REQUEST_REFRESH_SUCCESS, REQUEST_ERROR } from './constants';

export function stopLoading(request) {
  return {
    type: STOP_LOADING,
    request: request
  };
}
export function syncAuth(request) {
  return {
    type: SYNC_AUTH,
    request: request
  };
}

export function requestProfile(request) {
  return {
    type: REQUEST_PROFILE,
    request: request
  };
}

export function requestProfileSuccess(result) {
  return {
    type: REQUEST_PROFILE_SUCCESS,
    result: result
  };
}

export function requestLogin(request, redirect) {
  return {
    type: REQUEST_LOGIN,
    request: request,
    redirect: redirect
  };
}

export function requestLoginSuccess(result) {
  return {
    type: REQUEST_LOGIN_SUCCESS,
    result: result
  };
}

export function requestLogout() {
  return {
    type: REQUEST_LOGOUT,
  };
}

export function requestLogoutSuccess() {
  return {
    type: REQUEST_LOGOUT_SUCCESS,
  };
}

export function requestNotification(request) {
  return {
    type: REQUEST_NOTIFICATION,
    request: request
  };
}

export function requestNotificationSuccess(result) {
  return {
    type: REQUEST_NOTIFICATION_SUCCESS,
    result: result
  };
}

export function deleteNotification(id) {
  return {
    type: DELETE_NOTIFICATION,
    id: id
  };
}

export function deleteNotificationSuccess() {
  return {
    type: DELETE_NOTIFICATION_SUCCESS
  };
}

export function updateNotification(id) {
  return {
    type: UPDATE_NOTIFICATION,
    id: id
  };
}

export function requestRefresh() {
  return {
    type: REQUEST_REFRESH,
  };
}

export function requestRefreshSuccess() {
  return {
    type: REQUEST_REFRESH_SUCCESS,
  };
}

export function requestError(errorMessage) {
  return {
    type: REQUEST_ERROR,
    error: errorMessage
  };
}
