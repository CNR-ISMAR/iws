import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the auth state domain
 */

const selectNotifications = state => state.notifications || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Auth
 */

const makeSelectNotifications = () =>
  createSelector(
    selectNotifications,
    substate => substate,
  );



export default makeSelectNotifications;
export { selectNotifications };
