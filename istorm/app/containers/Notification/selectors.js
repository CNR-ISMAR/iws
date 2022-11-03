import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the auth state domain
 */

const selectNotification = state => state.notification || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Auth
 */
const makeSelectNotification = () =>
  createSelector(
    selectNotification,
    substate => substate,
  );



export default makeSelectNotification;
export { selectNotification };
