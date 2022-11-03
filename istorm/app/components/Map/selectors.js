import { createSelector } from 'reselect';
import { initialState } from 'containers/App/reducer';

/**
 * Direct selector to the mapPage state domain
 */

const selectPopUps = state => state.popups || initialState.popups;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MapPage
 */

const makeLayerInfo = () =>
  createSelector(
    selectPopUps,
    substate => substate,
  );

/* const makeSelectDrawerOpen = () =>
  createSelector(
    selectSidebarDomain,
    substate => substate.drawer.open,
  ); */

export default makeLayerInfo;
export { selectPopUps };
