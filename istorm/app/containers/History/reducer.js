/*
 *
 * MapPage reducer
 *
 */
import produce from 'immer';
import moment from "moment";
import { UPDATE_HISTORY, SET_CURRENT_DATE, REQUEST_TIMELINE, SUCCESS_TIMELINE, ERROR_TIMELINE, TOGGLE_PLAY } from './constants';

const dateFormat = "YYYY-MM-DD";
const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";

export const initialState = {
  loading: false,
  play: false,
  max: moment().toISOString(),
  min: moment().toISOString(),
  from: moment().toISOString(),
  to: moment().toISOString(),
  current: null,
  results: null,
  error: null
};

/* eslint-disable default-case, no-param-reassign */
const timelineReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_PLAY:
          draft.play = !draft.play;
        break;
      case REQUEST_TIMELINE:
          draft.loading = true;
          draft.error = null;
          draft.results = null;
          draft.current = null;
        break;
      case SUCCESS_TIMELINE:
          draft.loading = false;
          draft.max = action.response.max;
          draft.min = action.response.min;
          draft.from = action.response.from;
          draft.to = action.response.to;
          draft.results = action.response.results;
          //draft.current = action.response.current;
          draft.current = "2019-09-01T06:00:00.000Z";
        break;
      case ERROR_TIMELINE:
          draft.loading = false;
          draft.results = action.error;
        break;
      case UPDATE_HISTORY:
        draft.from = action.date.from.format(dateFormat);
        draft.to = action.date.to.format(dateFormat);
        break;
      case SET_CURRENT_DATE:
        draft.current = action.date.toISOString();
        break;
    };
  });

export default timelineReducer;
