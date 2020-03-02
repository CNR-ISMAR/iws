import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapPage state domain
 */

const selectFavourites = state => state.favourites || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MapPage
 */

const makeSelectFavourites = () =>
  createSelector(
    selectFavourites,
    substate => substate,
  );

/* const makeSelectDrawerOpen = () =>
  createSelector(
    selectSidebarDomain,
    substate => substate.drawer.open,
  ); */

export default makeSelectFavourites;
export { selectFavourites };
