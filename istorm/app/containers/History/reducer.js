/*
 *
 * MapPage reducer
 *
 */
import produce from 'immer';
import moment from "moment";
import { UPDATE_HISTORY, SET_CURRENT_DATE } from './constants';

const dateFormat = "YYYY-MM-DD";
const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";

export const initialState = {
  max: "2019-09-10T23:00:00.000Z",
  min: "2019-08-28T00:00:00.000Z",
  from: "2019-08-30T00:00:00.000Z",
  to: "2019-09-05T23:00:00.000Z",
  current: "2019-08-31T00:00:00.000Z",
  results: {
    "2019-08-30T00:00:00.000Z": {
      "dataset": "waves",
      "timestamp": 1567274400,
      "date": "2019-08-30T00:00:00.000Z",
      "wave_metadata": "2019-08-30T00:00:00.000Z",
      "wave_image": "/static/waves/waves_1567274400.png",
      "sea_level_mean": "WMS TILE URL",
      "sea_level_avg": "WMS TILE URL"
    },
    "2019-08-31T00:00:00.000Z": {
      "dataset": "waves",
      "timestamp": 1567274400,
      "date": "2019-08-31T20:00:00.000Z",
      "wave_metadata": "2019-08-30T00:00:00.000Z",
      "wave_image": "/static/waves/waves_1567274400.png",
      "sea_level_mean": "WMS TILE URL",
      "sea_level_avg": "WMS TILE URL"
    },
    "2019-09-01T00:00:00.000Z": {
      "dataset": "waves",
      "timestamp": 1567274400,
      "date": "2019-09-01T00:00:00.000Z",
      "wave_metadata": "2019-08-30T00:00:00.000Z",
      "wave_image": "/static/waves/waves_1567274400.png",
      "sea_level_mean": "WMS TILE URL",
      "sea_level_avg": "WMS TILE URL"
    },
    "2019-09-02T23:00:00.000Z": {
      "dataset": "waves",
      "timestamp": 1567202400,
      "date": "2019-09-02T23:00:00.000Z",
      "wave_metadata": "2019-09-05T23:00:00.000Z",
      "wave_image": "/static/waves/waves_1567274400.png",
      "sea_level_mean": "WMS TILE URL",
      "sea_level_avg": "WMS TILE URL"
    },
    "2019-09-03T23:00:00.000Z": {
      "dataset": "waves",
      "timestamp": 1567202400,
      "date": "2019-08-31T00:00:00.000Z",
      "wave_metadata": "2019-09-03T23:00:00.000Z",
      "wave_image": "/static/waves/waves_1567274400.png",
      "sea_level_mean": "WMS TILE URL",
      "sea_level_avg": "WMS TILE URL"
    },
    "2019-09-04T23:00:00.000Z": {
      "dataset": "waves",
      "timestamp": 1567202400,
      "date": "2019-09-04T23:00:00.000Z",
      "wave_metadata": "2019-09-05T23:00:00.000Z",
      "wave_image": "/static/waves/waves_1567274400.png",
      "sea_level_mean": "WMS TILE URL",
      "sea_level_avg": "WMS TILE URL"
    },
    "2019-09-05T23:00:00.000Z": {
      "dataset": "waves",
      "timestamp": 1567202400,
      "date": "2019-09-05T23:00:00.000Z",
      "wave_metadata": "2019-09-05T23:00:00.000Z",
      "wave_image": "/static/waves/waves_1567274400.png",
      "sea_level_mean": "WMS TILE URL",
      "sea_level_avg": "WMS TILE URL"
    }
  }
};

/* eslint-disable default-case, no-param-reassign */
const historyPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_HISTORY:
        draft.from = action.date.from.format(dateFormat);
        draft.to = action.date.to.format(dateFormat);
        break;
      case SET_CURRENT_DATE:
        draft.current = action.date.toISOString();
        break;
    };
  });

export default historyPageReducer;
