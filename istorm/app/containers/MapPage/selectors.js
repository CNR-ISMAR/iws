import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapPage state domain
 */

const selectMapPageDomain = state => state.mapPage || initialState;

/**
 * Other specific selectors
 */

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
    substate => flatten(substate.wmsLayers.map(wmsLayer => wmsLayer.filter(layer => layer.isVisible))),
  );

export default makeSelectMapPage;
export { selectMapPageDomain, makeSelectVisibleWmsLayer };
