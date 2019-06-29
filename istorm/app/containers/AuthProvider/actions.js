/*
 *
 * Auth actions
 *
 */

import { REQUEST_LOGIN, REQUEST_LOGOUT, REQUEST_REFRESH, REQUEST_LOGIN_SUCCESS, REQUEST_LOGOUT_SUCCESS, REQUEST_REFRESH_SUCCESS, REQUEST_ERROR } from './constants';

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
