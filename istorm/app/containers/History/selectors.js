import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapPage state domain
 */

const selectHistoryDomain = state => state.history || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MapPage
 */

const makeSelectHistory = () =>
  createSelector(
    selectHistoryDomain,
    substate => substate,
  );

export default makeSelectHistory;
export { selectHistoryDomain };
