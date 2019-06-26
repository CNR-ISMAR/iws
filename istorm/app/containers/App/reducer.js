/*
 *
 * MapPage reducer
 *
 */
import produce from 'immer';
import { TOGGLE_LAYER_VISIBILITY, ZOOM_IN, ZOOM_OUT } from './constants';

let currentTime = new Date();
currentTime.setUTCHours(0, 0, 0, 0);

const tomorrow = new Date();
tomorrow.setDate(currentTime.getDate() + 1);
const timeInterval = currentTime.toISOString().slice(0,10)+"/"+tomorrow.toISOString().slice(0,10);
const ncdate = currentTime.toISOString().slice(0,10).replace(/-/g,"");
const proxyUrl = process.env.PROXY_URL;

const waveUrl = proxyUrl+"/thredds/wms/tmes/TMES_waves_"+ncdate+".nc";
// const waveUrl = 'http://localhost:3000/thredds/wms/tmes/TMES_waves_20190620.nc';
const seaLevelUrl = proxyUrl+"/thredds/wms/tmes/TMES_sea_level_"+ncdate+".nc";

export const initialState = {
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
  wmsLayers: [
    /* [{
      url: "http://dev.plasive.org:8085/geoserver/wms",
      isTimeseries: true,
      options: {
        layers: 'remotesensing:ndvi',
        transparent: true,
        format: 'image/png',
        version: "1.3.0",
        tiled: true
      }
    }],
    */
    // [{
    //   //OTTIMA PAGINA DI ESEMPI SUL THREDDS
    //   //https://wambachers-osm.website/webcommon/js/leaflet/plugins/Leaflet.TimeDimension/examples/example7.html
    //   name: "test",
    //   id: "idDITEST",
    //   isVisible: true,
    //   url: "http://thredds.socib.es/thredds/wms/operational_models/oceanographical/hydrodynamics/model_run_aggregation/wmop/wmop_best.ncd",
    //   isTimeseries: true,
    //   options: {
    //     layers: 'salt',
    //     format: 'image/png',
    //     transparent: true,
    //     abovemaxcolor: "extend",
    //     belowmincolor: "extend",
    //     numcolorbands: 40,
    //     styles: 'boxfill/mpl_rdbu_r'
    //   }
    // }],
    [{
      name: "Wave mean period",
      id: "wmp-mean",
      isVisible: true,
      // url: "http://localhost:3000/thredds/wms/tmes/TMES_sea_level_20190618.nc",
      url: waveUrl,
      isTimeseries: true,
      options: {
        // layers: 'sea_level-std',
        layers: 'wmp-mean',
        elevation: 0,
        logscale: false,
        format: 'image/png',
        transparent: true,
        abovemaxcolor: "extend",
        belowmincolor: "extend",
        numcolorbands: 20,
        styles: 'boxfill/rainbow',
        colorscalerange: '2.44,7.303',
        version: '1.3.0',
        // version: '1.1.1',
      }
    }]
    /*,
    [{
      name: "Sea level mean",
      id: "sea-level-mean",
      isVisible: true,
      // url: "http://localhost:3000/thredds/wms/tmes/TMES_sea_level_20190618.nc",
      // url: "http://localhost:3000/thredds/wms/tmes/TMES_waves_20190619.nc",
      url: "http://localhost:3000/thredds/wms/tmes/TMES_waves_"+ncdate+".nc",
      isTimeseries: true,
      options: {
        // layers: 'sea_level-std',
        layers: 'wmp-mean',
        elevation: 0,
        logscale: false,
        format: 'image/png',
        transparent: true,
        abovemaxcolor: "extend",
        belowmincolor: "extend",
        numcolorbands: 20,
        styles: 'boxfill/rainbow',
        colorscalerange: '2.44,7.303',
        version: '1.3.0',
        // version: '1.1.1',
      }
    }]*/
]
};

/* eslint-disable default-case, no-param-reassign */
const mapPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_LAYER_VISIBILITY:
          let idx = null;
          let idx2 = null;
          state.wmsLayers.forEach((wmsLayer, wmsLayerIndex) => {
            wmsLayer.filter(layer => layer.id === action.layer.id).forEach((layers, layersIndex) => {
              idx = wmsLayerIndex;
              idx2 = layersIndex;
            })
          }); 
          draft.wmsLayers[idx][idx2].isVisible = !action.layer.isVisible;
        break;
      case ZOOM_IN:
        draft.options.zoom = draft.options.zoom + 1;
      break;
      case ZOOM_OUT:
        draft.options.zoom = draft.options.zoom - 1;
      break;
    }
  });

export default mapPageReducer;
