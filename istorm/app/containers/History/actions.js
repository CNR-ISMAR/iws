/*
 *
 * MapPage actions
 *
 */

import { UPDATE_HISTORY } from './constants';

export function updateHistory(date) {
  return {
    type: UPDATE_HISTORY,
    date
  };
}