import { createSelector } from 'reselect';
import { initialState } from './reducer';

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
    substate => (substate.oauth && substate.oauth.expire_at) ? true : false,
  );

export default makeSelectAuth;
export { selectAuthDomain, isLogged };
