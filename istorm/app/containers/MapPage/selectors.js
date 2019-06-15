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

export default makeSelectMapPage;
export { selectMapPageDomain };
