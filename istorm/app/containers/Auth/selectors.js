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
    auth => (auth) => (auth.oauth && auth.oauth.expire_at) ? auth.oauth.expire_at : false,
    expire_at => (expire) => expire ? moment(isLogged) : false
  );

export default makeSelectAuth;
export { selectAuthDomain, isLogged };
