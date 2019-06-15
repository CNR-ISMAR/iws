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
    zoom: 5,
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
      options: {
        layers: 'remotesensing:ndvi',
        transparent: true,
        format: 'image/png',
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
