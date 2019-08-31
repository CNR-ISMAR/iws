/*
 *
 * MapPage actions
 *
 */

import { UPDATE_HISTORY, SET_CURRENT_DATE } from './constants';

export function updateHistory(date) {
  return {
    type: UPDATE_HISTORY,
    date
  };
}

export function setCurrentDate(date) {
  return {
    type: SET_CURRENT_DATE,
    date
  };
}