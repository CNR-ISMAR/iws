/*
 *
 * MapPage reducer
 *
 */
import produce from 'immer';
import moment from "moment";
import { UPDATE_HISTORY, SET_CURRENT_DATE, REQUEST_TIMELINE, SUCCESS_TIMELINE, ERROR_TIMELINE } from './constants';

const dateFormat = "YYYY-MM-DD";
const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";

export const initialState = {
  loading: false,
  max: "2019-09-10T23:00:00.000Z",
  min: "2019-08-28T00:00:00.000Z",
  from: "2019-08-30T00:00:00.000Z",
  to: "2019-09-05T23:00:00.000Z",
  current: "2019-08-31T00:00:00.000Z",
  results: null,
  error: null
};

/* eslint-disable default-case, no-param-reassign */
const timelineReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_TIMELINE:
          draft.loading = true;
          draft.error = null;
        break;
      case SUCCESS_TIMELINE:
          draft.loading = false;
          draft.max = action.response.max;
          draft.min = action.response.min;
          draft.from = action.response.from;
          draft.to = action.response.to;
          draft.results = action.response.results;
          draft.current = action.response.current;
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
