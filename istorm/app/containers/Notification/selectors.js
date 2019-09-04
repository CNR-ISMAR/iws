import { createSelector } from 'reselect';
import { initialState } from './reducer';
import moment from 'moment';

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
    substate => substate.testNotification,
  );



export default makeSelectNotifications;
export { selectNotifications };
