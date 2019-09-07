/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createReducer from './reducers';
import authSaga from './containers/AuthProvider/saga';
import historySaga from './containers/History/saga';
import mapSaga from './containers/App/saga';

export const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'sidebar'] 
}

export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  const persistedReducer = persistReducer(persistConfig, createReducer())

  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(...enhancers),
  );
  const persistore = persistStore(store);

  sagaMiddleware.run(authSaga);
  sagaMiddleware.run(historySaga);
  sagaMiddleware.run(mapSaga);
  // Extensions
  store.persistore = persistore;
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      
      store.replaceReducer(() => {
        const redu = persistReducer(persistConfig, createReducer(store.injectedReducers));
        //const redu = createReducer(store.injectedReducers);
        store.persistore.persist();
        return redu;
      });
    });
  }

  return { store, persistore };
}
