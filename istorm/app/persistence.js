
import produce from "immer";
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { toggleDrawer } from 'containers/Sidebar/actions';
import { syncAuth, requestRefresh } from "containers/AuthProvider/actions";
import { syncCredits, dismissCredits } from "containers/App/actions";
import { setToken } from 'utils/api';
import { isMobileOrTablet } from 'utils/mobileDetector';
import { REQUEST_LOGIN, REQUEST_LOGOUT, REQUEST_LOGIN_SUCCESS, REQUEST_LOGOUT_SUCCESS, REQUEST_REFRESH_SUCCESS, REQUEST_REFRESH, REQUEST_PROFILE_SUCCESS } from 'containers/AuthProvider/constants';
import { DISMISS_CREDITS } from 'containers/App/constants';
import {push, getLocation} from "connected-react-router";

const SKIP_REFRESH = [REQUEST_REFRESH, REQUEST_LOGIN, REQUEST_LOGOUT];
const SYNC_PERSISTANCE_REQUEST = "persitance/SYNC_PERSISTANCE_REQUEST";
const SYNC_PERSISTANCE_SUCCESS = "persitance/SYNC_PERSISTANCE_SUCCESS";

const persistoreConfig = {
  id: "istorm",
  version: 1
}
export const persistore = {
  set: (key, draft) => {
    window.localStorage.setItem(`${persistoreConfig.id}-${persistoreConfig.version}-${key}`, JSON.stringify(draft));
  },
  get: (key) => {
    return JSON.parse(window.localStorage.getItem(`${persistoreConfig.id}-${persistoreConfig.version}-${key}`));
  },
  delete: (key) => {
    window.localStorage.removeItem(`${persistoreConfig.id}-${persistoreConfig.version}-${key}`)
  }
}

export function syncPersistanceRequest() {
  return {
    type: SYNC_PERSISTANCE_REQUEST,
  };
}

export function syncPersistanceSuccess() {
  return {
    type: SYNC_PERSISTANCE_SUCCESS,
  };
}

export const initialState = {
  loading: false,
  sync: false,
};

/* eslint-disable default-case, no-param-reassign */
export const persitanceReducer = (state = initialState, action) =>
  produce(state, ( draft ) => {
    switch (action.type) {
      case SYNC_PERSISTANCE_REQUEST:
          draft.loading = true;
          draft.sync = false;
        break;
      case SYNC_PERSISTANCE_SUCCESS:
          draft.loading = false;
          draft.sync = true;
        break;
    }
  });

export const persitanceMiddleWare = store => next => action => {
  if(action.type.includes("REQUEST_") && !action.type.includes("SUCCESS") && !action.type.includes("ERROR") && SKIP_REFRESH.indexOf(action.type) === -1) {
    store.dispatch(requestRefresh())
  }

  next(action);
  switch (action.type) {
    case REQUEST_LOGIN_SUCCESS:
    case REQUEST_REFRESH_SUCCESS:
    case REQUEST_PROFILE_SUCCESS:
      const state = store.getState();
      // console.log(state)
      if(state.auth) {
        persistore.set("auth", state.auth);
      }
      break;
    case REQUEST_LOGOUT_SUCCESS:
        persistore.delete("auth");
      break;
    case DISMISS_CREDITS:
        const appState = store.getState();
        // console.log(appState)
        persistore.set("credits", appState.mapPage.dismiss_credits);
      break;
  }
}

export function* refreshPersistance() {
  const authStore = persistore.get("auth");
  const dismiss_credits = persistore.get("credits");
  if(dismiss_credits) {
    // yield put(dismissCredits());
    yield put(syncCredits);
  } else {
    if(window.location.pathname !== '/credits') {
      yield put(push("/credits"));
    }
  }
  if(authStore) {
    setToken(authStore.oauth.token);
    yield put(syncAuth(authStore))
  }
  if(isMobileOrTablet.any()) {
    yield put(toggleDrawer())
  }
  yield put(requestRefresh())
  yield put(syncPersistanceSuccess())
}

/**
 * Root saga manages watcher lifecycle
 */
export function* persistanceSaga() {
  yield takeLatest(SYNC_PERSISTANCE_REQUEST, refreshPersistance);
}


const selectPersistanceDomain = state => state.persistence || initialState;


const makeSelectPersistance = () =>
  createSelector(
    selectPersistanceDomain,
    substate => substate,
  );

const isSync = () =>
  createSelector(
    selectPersistanceDomain,
    substate => substate.sync
  );

export default makeSelectPersistance;
export { isSync };
