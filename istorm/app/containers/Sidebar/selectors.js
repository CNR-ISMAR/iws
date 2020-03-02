import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapPage state domain
 */

const selectSidebarDomain = state => state.sidebar || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MapPage
 */

const makeSelectSidebar = () =>
  createSelector(
    selectSidebarDomain,
    substate => substate,
  );

const makeSelectDrawerOpen = () =>
  createSelector(
    selectSidebarDomain,
    substate => substate.drawer.open,
  );

export default makeSelectSidebar;
export { selectSidebarDomain, makeSelectDrawerOpen };
