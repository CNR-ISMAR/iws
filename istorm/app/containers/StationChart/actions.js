/*
 *
 * MapPage actions
 *
 */

import { REQUEST_CHART, REQUEST_CHART_SUCCESS,
    REQUEST_ERROR} from './constants';
  
  export function requestChart(params) {
    // console.log('requestChart')
    return {
      type: REQUEST_CHART,
      params: params
    };
  }
  
  export function requestChartSuccess(result) {
    // console.log('requestChartSuccess')
    return {
      type: REQUEST_CHART_SUCCESS,
      result: result
    };
  }
  
  export function requestError(errorMessage) {
    return {
      type: REQUEST_ERROR,
      error: errorMessage
    };
  }
