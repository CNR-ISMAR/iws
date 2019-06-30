import invariant from 'invariant';
import { isEmpty, isFunction, isString } from 'lodash';

import checkStore from './checkStore';
import createReducer from '../reducers';
import { persistConfig } from '../configureStore';
import { persistReducer } from 'redux-persist';

export function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    );

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    )
      return;

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(persistReducer(persistConfig, createReducer(store.injectedReducers)));
    //store.replaceReducer(createReducer(store.injectedReducers));
    //store.persistore.persist();
  };
}

export default function getInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
