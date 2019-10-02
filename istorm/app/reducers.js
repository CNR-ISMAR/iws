/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import authReducer from 'containers/AuthProvider/reducer';
import timelineReducer from 'containers/History/reducer';
import mapReducer from 'containers/App/reducer';
import {favouriteReducer, latLngReducer} from 'containers/App/reducer';
import notificationSnakeReducer from 'containers/NotificationSnake/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    auth: authReducer,
    timeline: timelineReducer,
    mapPage: mapReducer,
    favourites: favouriteReducer,
    latLng: latLngReducer,
    notificationsSnake: notificationSnakeReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
