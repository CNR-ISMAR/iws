/*
 *
 * MapPage reducer
 *
 */
import produce from 'immer';
import { TOGGLE_LAYER_VISIBILITY, ZOOM_IN, ZOOM_OUT, SET_VIEWPORT } from './constants';

let currentTime = new Date();
currentTime.setUTCHours(0, 0, 0, 0);

const tomorrow = new Date();
tomorrow.setDate(currentTime.getDate() + 1);
const timeInterval = currentTime.toISOString().slice(0,10) + "/" + tomorrow.toISOString().slice(0,10);
const ncdate = currentTime.toISOString().slice(0,10).replace(/-/g,"");
const proxyUrl = process.env.PROXY_URL;

const waveUrl = proxyUrl + "/thredds/wms/tmes/TMES_waves_" + ncdate + ".nc";
// const waveUrl = 'http://localhost:3000/thredds/wms/tmes/TMES_waves_20190620.nc';
const seaLevelUrl = proxyUrl + "/thredds/wms/tmes/TMES_sea_level_" + ncdate + ".nc";

export const initialState = {
  bbox: [[46.286224,25.708008], [35.960223,11.733398]],
  viewport: {
    longitude: 12.33265,
    latitude: 45.43713, 
    zoom: 5,
    bearing: 0,
    pitch: 30
  },
  style: {
    version: 8,
    sources: {
      backgroundLayer: {
        type: "raster",
        tiles: ["https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: 'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
      }
    },
    layers: [{
      id: "backgroundLayer",
      type: "raster",
      source: "backgroundLayer",
      minzoom: 0,
      maxzoom: 22
    }]
  },
  options: {
    center: [40.088190, 16.291049],
    zoom: 7,
    zoomControl: false,
    boundsOptions: {
      paddingBottomRight: [250, 0],
    },
    timeDimension: true,
    timeDimensionOptions: {
        timeInterval: timeInterval,
        period: "PT1H",
        currentTime: currentTime.getTime()
    }, 
    timeDimensionControl: true,
    minZoom: 2,
     maxBounds: [
      [-85, -180],
      [85, 180],
    ],
  },
  baseLayers: ["wiki"],
  layers: {
    wmpMean: {
      name: "Wave mean period",
      id: "wmpMean",
      isVisible: true,
      url: waveUrl,
      isTimeseries: true,
      type: 'raster',
      source: {
      type: 'raster',
        tiles: [
          'http://localhost:3000/thredds/wms/tmes/TMES_waves_20190630.nc?LAYERS=wmd-std&ELEVATION=0&TIME=2019-06-30T00%3A00%3A00.000Z&TRANSPARENT=true&STYLES=boxfill%2Frainbow&COLORSCALERANGE=4.157%2C107.4&NUMCOLORBANDS=20&LOGSCALE=false&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&SRS=EPSG%3A3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
        ],
        width: 256,
        height: 256
      },
      paint: {

      }
    }
  }
};

/* eslint-disable default-case, no-param-reassign */
const mapPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_LAYER_VISIBILITY:
          draft.layers[action.layer].isVisible = !draft.layers[action.layer].isVisible;
        break;
      case ZOOM_IN:
        draft.viewport.zoom = draft.viewport.zoom + .5;
      break;
      case ZOOM_OUT:
        draft.viewport.zoom = draft.viewport.zoom - .5;
      break;
      case SET_VIEWPORT:
        draft.viewport = action.viewport;
      break;
    }
  });

export default mapPageReducer;
