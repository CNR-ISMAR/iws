/*
 *
 * MapPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  options: {
    center: [41.879156, 12.457727],
    zoom: 8,
    timeDimension: true,
    /* timeDimensionOptions: {
        timeInterval: "2019-03-30/2019-04-30",
        period: "PT1H"
    }, */
    timeDimensionControl: true,
    minZoom: 2,
     maxBounds: [
      [-85, -180],
      [85, 180],
    ],
  },
  baseLayers: ["wiki"],
  wmsLayers: [
    [{
      url: "http://dev.plasive.org:8085/geoserver/wms",
      isTimeseries: true,
      options: {
        layers: 'remotesensing:ndvi',
        transparent: true,
        format: 'image/png',
        version: "1.3.0",
        tiled: true
      }
    }]
]
};

/* eslint-disable default-case, no-param-reassign */
const mapPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default mapPageReducer;
