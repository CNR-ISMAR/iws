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
          let modified = {
            'sea_level-mean': action.result.results['sea_level-mean'],
            'wsh-mean': action.result.results['wsh-mean'],
            'wmp-mean': action.result.results['wmp-mean'],
            'wmd-mean': action.result.results['wmd-mean'],
            'sea_level-station': action.result.results['sea_level-station'] ? action.result.results['sea_level-station'] : [],
            'wsh-station': action.result.results['wsh-station'] ? action.result.results['wsh-station'] : [],
            'wmp-station': action.result.results['wmp-station'] ? action.result.results['wmp-station'] : [],
            'wmd-station': action.result.results['wmd-station'] ? action.result.results['wmd-station'] : [],

            'sea_level-area': action.result.results['sea_level-mean'].map((item, index) => {return {
                x:item.x,
                y:item.y+action.result.results['sea_level-std'][index].y,
                y0:item.y-action.result.results['sea_level-std'][index].y
            }}),
            'wsh-area': action.result.results['wsh-mean'].map((item, index) => {return {
                x:item.x,
                y:item.y+action.result.results['wsh-std'][index].y,
                y0:item.y-action.result.results['wsh-std'][index].y
            }}),
            'wmp-area': action.result.results['wmp-mean'].map((item, index) => {return {
                x:item.x,
                y:item.y+action.result.results['wmp-std'][index].y,
                y0:item.y-action.result.results['wmp-std'][index].y
            }}),
          }
          // console.log(modified)
          draft.loading = false;
          draft.error = initialState.error;
          draft.results = {...action.result, results: modified};
        break;
      case REQUEST_ERROR:
          draft.loading = false;
          draft.error = action.error;
      break;
    };
  });

export default chartReducer;
