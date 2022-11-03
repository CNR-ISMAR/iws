/*
 *
 * MapPage actions
 *
 */

import { UPDATE_HISTORY, SET_CURRENT_DATE, REQUEST_TIMELINE, SUCCESS_TIMELINE, ERROR_TIMELINE, TOGGLE_PLAY } from './constants';

export function togglePlay() {
  return {
    type: TOGGLE_PLAY
  }
}

export function requestTimeline(request) {
  return {
    type: REQUEST_TIMELINE,
    request
  };
}

export function successTimeline(response) {
  return {
    type: SUCCESS_TIMELINE,
    response
  };
}

export function errorTimeline(error) {
  return {
    type: ERROR_TIMELINE,
    error
  };
}

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