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
            'sea_level-max': action.result.results['sea_level-mean'].map((item, index) => {return {x:item.x, y:item.y+action.result.results['sea_level-std'][index].y}} ),
            // 'sea_level-min': action.result.results['sea_level-mean'].map((item, index) => {return {x:item.x, y:item.y-action.result.results['sea_level-std'][index].y}} ),
            'wsh-mean': action.result.results['wsh-mean'],
            'wsh-max': action.result.results['wsh-mean'].map((item, index) => {return {x:item.x, y:item.y+action.result.results['wsh-std'][index].y}} ),
            // 'wsh-min': action.result.results['wsh-mean'].map((item, index) => {return {x:item.x, y:item.y-action.result.results['wsh-std'][index].y}} ),
            'wmd-mean': action.result.results['wmd-mean'],
            // 'wmd-max': action.result.results['wmd-mean'].map((item, index) => {return {x:item.x, y:item.y+action.result.results['wmd-std'][index].y}} ),
            // 'wmd-min': action.result.results['wmd-mean'].map((item, index) => {return {x:item.x, y:item.y-action.result.results['wmd-std'][index].y}} ),
            'wmp-mean': action.result.results['wmp-mean'],
            'wmp-max': action.result.results['wmp-mean'].map((item, index) => {return {x:item.x, y:item.y+action.result.results['wmp-std'][index].y}} ),
            // 'wmp-min': action.result.results['wmp-mean'].map((item, index) => {return {x:item.x, y:item.y-action.result.results['wmp-std'][index].y}} ),
          }
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
