import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapPage state domain
 */

const selectMapPageDomain = state => state.mapPage || initialState;

const selectRouter = state => state.router;

const selectNotifications = state => state.appStates || initialState;

/**
 * Other specific selectors
 */
const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

/**
 * Default selector used by MapPage
 */

const makeSelectMapPage = () =>
  createSelector(
    selectMapPageDomain,
    substate => substate,
  );
const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
const makeSelectVisibleWmsLayer = () =>
  createSelector(
    selectMapPageDomain,
    substate => Object.keys(substate.layers).map(wmsLayer => substate.layers[wmsLayer]).filter(layer => layer.isVisible),
  );

const makeSelectLayers = () =>
  createSelector(
    selectMapPageDomain,
    substate => substate.layers,
  );

const makeSelectNotifications = () =>
  createSelector(
    selectNotifications,
    substate => substate,
  );


export default makeSelectMapPage;
export { selectMapPageDomain, makeSelectVisibleWmsLayer, makeSelectLocation, makeSelectLayers, makeSelectNotifications };
