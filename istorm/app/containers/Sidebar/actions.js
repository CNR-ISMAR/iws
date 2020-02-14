/*
 *
 * MapPage actions
 *
 */

import { TOGGLE_DRAWER, CLOSE_DRAWER, OPEN_DRAWER, TOGGLE_DRAWER_MINI, CLOSE_DRAWER_MINI, OPEN_DRAWER_MINI} from './constants';

export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER
  };
}

export function openDrawer() {
  return {
    type: OPEN_DRAWER
  };
}

export function closeDrawer() {
  return {
    type: CLOSE_DRAWER
  };
}

export function toggleDrawerMini() {
  return {
    type: TOGGLE_DRAWER_MINI
  };
}

export function openDrawerMini() {
  return {
    type: OPEN_DRAWER_MINI
  };
}

export function closeDrawerMini() {
  return {
    type: CLOSE_DRAWER_MINI
  };
}
