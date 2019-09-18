/*
 *
 * MapPage reducer
 *
 */
import produce from 'immer';
import { REQUEST_CHART, REQUEST_CHART_SUCCESS, REQUEST_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: null,
  results: []
};

/* eslint-disable default-case, no-param-reassign */
const chartReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_CHART:
        draft.loading = true;
        draft.error = initialState.error;
        draft.results = []
      break;
      case REQUEST_CHART_SUCCESS:
          draft.loading = false;
          draft.error = initialState.error;
          draft.results = action.result;
        break;
      case REQUEST_ERROR:
          draft.loading = false;
          draft.error = action.error;
      break;
    };
  });

export default chartReducer;
