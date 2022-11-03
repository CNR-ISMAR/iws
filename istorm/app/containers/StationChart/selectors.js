import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapPage state domain
 */

const selectChart = state => state.chart || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MapPage
 */

const makeSelectChart = () =>
  createSelector(
    selectChart,
    substate => substate,
  );

/* const makeSelectDrawerOpen = () =>
  createSelector(
    selectSidebarDomain,
    substate => substate.drawer.open,
  ); */

export default makeSelectChart;
export { selectChart };
