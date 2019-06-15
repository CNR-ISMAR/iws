/*
 *
 * Auth reducer
 *
 */
import produce from 'immer';
import { REQUEST_LOGIN, REQUEST_LOGOUT, REQUEST_REFRESH, REQUEST_LOGIN_SUCCESS, REQUEST_LOGOUT_SUCCESS, REQUEST_REFRESH_SUCCESS, REQUEST_ERROR } from './constants';

export const initialState = {
  loading: false,
  user: null,
  error: null,
  oauth: {
    token: null,
    refreshToken: null,
    expire_at: null 
  }
};

/* eslint-disable default-case, no-param-reassign */
const authReducer = (state = initialState, action) =>
  produce(state, ( draft ) => {
    switch (action.type) {
      case REQUEST_LOGIN:
          draft.loading = true;
        break;
      case REQUEST_LOGIN_SUCCESS:
          draft.loading = false;
          draft.error = initialState.error;
        break;
      case REQUEST_LOGOUT:
          draft.loading = true;
        break;
      case REQUEST_LOGOUT_SUCCESS:
          draft.loading = false;
          draft.error = initialState.error;
        break;
      case REQUEST_REFRESH:
          draft.loading = true;
        break;
      case REQUEST_REFRESH_SUCCESS:
          draft.loading = false;
          draft.error = initialState.error;
        break;
      case REQUEST_ERROR:
          draft.loading = false;
          draft.error = action.error;
        break;
    }
  });

export default authReducer;
