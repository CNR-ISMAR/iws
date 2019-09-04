import { REQUEST_NOTIFICATION } from './constants';

export function requestNotification() {
    return {
      type: REQUEST_NOTIFICATION
    };
  }
  
  /* export function requestLoginSuccess(result) {
    return {
      type: REQUEST_LOGIN_SUCCESS,
      result: result
    };
  } */