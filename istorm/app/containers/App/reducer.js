/*
 *
 * MapPage reducer
 *
 */
import produce from 'immer';
import moment from 'moment';
import { TOGGLE_LAYER_VISIBILITY, ZOOM_IN, ZOOM_OUT, SET_VIEWPORT, 
  TOGGLE_LAYER_MEAN, REQUEST_INFO_LAYER, REQUEST_INFO_LAYER_SUCCESS, 
  POST_FAVOURITE, POST_FAVOURITE_SUCCESS, POST_FAVOURITE_EMPTY, DELETE_POST_FAVOURITE, 
  DELETE_POST_FAVOURITE_SUCCESS, REQUEST_ERROR, CLOSE_INFO_LAYER,
  REQUEST_FAVOURITES_LAYER, REQUEST_FAVOURITES_LAYER_SUCCESS, TOGGLE_PAPER,
  REQUEST_FAVOURITES, REQUEST_FAVOURITES_SUCCESS, DELETE_FAVOURITE, 
  FILL_IF_IS_FAVOURITE,
  DELETE_FAVOURITE_SUCCESS, SET_LAT_LON, TOGGLE_SIDEPANEL  } from './constants';

import theme from 'theme'
import { elementType } from 'prop-types';
import labels from "../../utils/labels";
import TableRow from "@material-ui/core/TableRow/TableRow";
import React from "react";
import ReactMapGL from "react-map-gl/dist/es6/components/interactive-map";

let currentTime = new Date();
currentTime.setUTCHours(0, 0, 0, 0);

const currentTimeDimention = moment(currentTime).format("YYYY-MM-DD");
const currentTimeDimentionOneYearBefore = moment(currentTime).subtract(1, "years").format("YYYY-MM-DD");

const tomorrow = new Date();
tomorrow.setDate(currentTime.getDate() + 1);
const timeInterval = currentTime.toISOString().slice(0,10) + "/" + tomorrow.toISOString().slice(0,10);
const ncdate = currentTime.toISOString().slice(0,10).replace(/-/g,"");
const proxyUrl = process.env.PROXY_URL;

const waveUrl = proxyUrl + "/thredds/wms/tmes/TMES_waves_" + ncdate + ".nc";
// const waveUrl = 'http://localhost:3000/thredds/wms/tmes/TMES_waves_20190620.nc';
const wmpMeanUrl = proxyUrl + "/thredds/wms/tmes/TMES_sea_level_" + ncdate + ".nc";

const BASE_URL = process.env.API_URL;

export const initialState = {
  bbox: [[49.2,24.29], [36.02,5.48]],
  mean: true,
  options: {
    minPitch: 0,
    maxPitch: 0,
    dragRotate: false,
    touchRotate: false,
  },
  viewport: {
    longitude: 12.33265,
    latitude: 45.43713, 
    zoom: 5,
    minZoom: 5,
    maxZoom: 16,
    // bearing: 3,
    // pitch: 0
  },
  style: {
    version: 8,
    sources: {
      backgroundLayer: {
        type: "raster",
        tiles: ["https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"],
        // tiles: ["http://ows.emodnet-bathymetry.eu/wms?layers=emodnet:mean_atlas_land,coastlines&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&SRS=EPSG%3A3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256"],
        tileSize: 256,
        attribution: 'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
      },

    cover: {
      type: 'raster',
        tiles: [
          // 'https://www.informare-er.it/istorms/base/{z}/{x}/{y}.png'
          // proxyUrl + '/istorms/base/{z}/{x}/{y}.png'
          proxyUrl + '/istorms/istorms/base/{z}/{x}/{y}.png'
          // "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
        ],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: "backgroundLayer",
        type: "raster",
        source: "backgroundLayer",
        minzoom: 0,
        maxzoom: 22
      },
      {
        id: "cover",
        type: "raster",
        source: "cover",
        minzoom: 0,
        maxzoom: 22
      }
    ]
  },
  WindGLLayer: {
    name: "Wave",
    id: "wmpMean",
    isVisible: false,
    isTimeseries: true,
  },
  BackgroundWindLayer: {
    name: "Wave background",
    id: "wmpMeanBg",
    isVisible: false,
    isTimeseries: true,
  },
  seaLevel: {
    name: "Sea Level",
    id: "seaLevel",
    isVisible: true,
    isTimeseries: true,
    type: 'raster',
    source: {
    type: 'raster',
      tiles: [
        waveUrl + '?LAYERS=wmp-mean&ELEVATION=0&TIME=' + currentTimeDimention + 'T00%3A00%3A00.000Z&TRANSPARENT=true&STYLES=boxfill%2Frainbow&COLORSCALERANGE=2.44%2C7.303&NUMCOLORBANDS=20&LOGSCALE=false&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&SRS=EPSG%3A3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
      ],
      width: 256,
      height: 256
    },
    paint: {
        // "raster-opacity": 0.5,
        "raster-opacity": 0.8,
        // 'raster-hue-rotate': 0,
        'raster-hue-rotate': 0.2,
        // "raster-resampling": "nearest"
    }
  },
  layers: {
    favorites: {
      name: "Favourites",
      id: "favorites",
      isVisible: false,
      isTimeseries: false,
      type: 'circle',
      source: {
        type: 'geojson',
        data: []
        // data: 'http://iws.inkode.it:4443/openistorm/favorites/geojson',
      },
      paint: {
        'circle-color': theme.palette.custom.favoriteIcon,
        // 'circle-radius': 4,
        "circle-radius": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          8,
          5
        ]
      },
      loading: false,
      error: null
    },
    stationsSeaLevel: {
      name: "Station Seal Level",
      id: "stations-sea-level",
      isVisible: true,
      isTimeseries: false,
      type: 'circle',
      source: {
        type: 'geojson',
        // data: 'https://iws.ismar.cnr.it/geoserver/wfs?srsName=EPSG%3A4326&typename=geonode%3AI_STORMS_monitoring_station_details_station_l&outputFormat=json&version=1.0.0&service=WFS&request=GetFeature',
        data: `${BASE_URL}/openistorm/stations/?type=sea_level`,
      },
      paint: {
        'circle-color': '#fa0',
        // 'circle-radius': 4,
        "circle-radius": [
          "case",
          ["boolean", ["feature-state", "hover"], true],
          6,
          6
        ]
      }
    },
    stationsWave: {
      name: "Station Wave",
      id: "stations-wave",
      isVisible: true,
      isTimeseries: false,
      type: 'circle',
      source: {
        type: 'geojson',
        // data: 'https://iws.ismar.cnr.it/geoserver/wfs?srsName=EPSG%3A4326&typename=geonode%3AI_STORMS_monitoring_station_details_station_l&outputFormat=json&version=1.0.0&service=WFS&request=GetFeature',
        data: `${BASE_URL}/openistorm/stations/?type=waves`,
      },
      paint: {
        'circle-color': '#d10000',
        // 'circle-radius': 4,
        "circle-radius": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          6,
          6
        ]
      }
    }
  },
  popups: {
    loading: false,
    error: null,
    results: [],
    postfavourites: {
      loading: false,
      error: null,
      results: []
    },
    open: false
  },
  favourites:{
    loading: false,
    error: null,
    results: [],
    selected: {}
  },
  LatLon: {
    longitude: 12.33265,
    latitude: 45.43713
  },
  requestError: {
    message: null
  },
  
  
};


/* eslint-disable default-case, no-param-reassign */
const mapPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_PAPER:
        draft.popups.open = action.open;
        break;
      case TOGGLE_LAYER_VISIBILITY:
          if(action.layer === "wmpMean") {
            draft.WindGLLayer.isVisible = true;
            draft.seaLevel.isVisible = false;
          } else if(action.layer === "seaLevel") {
            draft.seaLevel.isVisible = true;
            draft.WindGLLayer.isVisible = false;
          } else {
            draft.layers[action.layer].isVisible = !draft.layers[action.layer].isVisible;
          }
        break;
      case TOGGLE_LAYER_MEAN:
        draft.mean = !draft.mean;
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
      case REQUEST_INFO_LAYER:
        draft.popups.loading = true;
        draft.popups.error = initialState.popups.error;
        draft.popups.results = []
      break;
      case REQUEST_INFO_LAYER_SUCCESS:
        draft.popups.loading = false;
        draft.popups.error = initialState.popups.error;
        // console.log(action.result)
        // const results = Object.keys(action.result.results)
        //   .sort()
        //   .reduce((acc, key) => ({
        //       ...acc, [key]: action.result.results[key]
        //   }), {})
        const results = {...action.result, parameters: action.result.parameters.sort()}
        // console.log('CONV RESULTS')
        // console.log('CONV RESULTS')
        // console.log('CONV RESULTS')
        // console.log(results)
        draft.popups.results = [{...results, show: true}];
      break;
      case REQUEST_FAVOURITES_LAYER:
          draft.layers.favorites.loading = true;
          draft.layers.favorites.error = initialState.layers.favorites.error;
          draft.layers.favorites.source.data = []
      break;
      case REQUEST_FAVOURITES_LAYER_SUCCESS:
          draft.layers.favorites.loading = false;
          draft.layers.favorites.error = initialState.layers.favorites.error;
          draft.layers.favorites.source.data = action.result;
          draft.layers.favorites.isVisible = true
        break; 

      case REQUEST_FAVOURITES:
        draft.favourites.loading = true;
        draft.favourites.error = initialState.favourites.error;
        draft.favourites.results = []
      break;
      case REQUEST_FAVOURITES_SUCCESS:
          draft.favourites.loading = false;
          draft.favourites.error = initialState.favourites.error;
          draft.favourites.results = action.result;
        break;
      case DELETE_FAVOURITE:
          draft.favourites.loading = true;
          draft.favourites.error = initialState.favourites.error;
        break;
        case FILL_IF_IS_FAVOURITE:
          draft.favourites.selected = action.item
          /*  draft.results = [] */
        break;
        case POST_FAVOURITE:
          draft.favourites.loading = true;
          draft.favourites.error = initialState.favourites.error;
          /* draft.popups.postfavourites.results = [] */
        break;
      case POST_FAVOURITE_SUCCESS:
            draft.favourites.loading = false;
            draft.favourites.error = initialState.favourites.error;
            draft.favourites.selected = action.results;
            draft.favourites.results = [...initialState.favourites.results, action.results]
        break;
      case POST_FAVOURITE_EMPTY:
          draft.favourites.selected = {};
      break;
      case DELETE_POST_FAVOURITE_SUCCESS:
          draft.loading = false;
          draft.popups.postfavourites.results = []
        break; 
        
      case REQUEST_ERROR:
        /* draft.popups.loading = false; */
        draft.requestError.message = action.error;
      break;
      case CLOSE_INFO_LAYER:
        draft.popups.results = [];
        draft.favourites.selected = {};
      break;
    }
  });



const latLngReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LAT_LON:
        draft.LatLon.latitude = action.latitude;
        draft.LatLon.longitude = action.longitude;
      break;
  }
})


export default mapPageReducer;
export { latLngReducer }

