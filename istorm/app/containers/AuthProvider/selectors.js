import { createSelector } from 'reselect';
import { initialState } from './reducer';
import moment from 'moment';

/**
 * Direct selector to the auth state domain
 */

const selectAuthDomain = state => state.auth || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Auth
 */

const makeSelectAuth = () =>
  createSelector(
    selectAuthDomain,
    substate => substate,
  );

const isLogged = () =>
  createSelector(
    selectAuthDomain,
    substate => (substate.oauth && substate.oauth.expire_at && substate.oauth.expire_at > moment().unix()) ? true : false,
  );

export default makeSelectAuth;
export { selectAuthDomain, isLogged };
