window.TMES = {
  BASE_URL: 'https://iws.ismar.cnr.it/thredds/',
  PROXY: '/proxy',
  MARKER_SPAN: 'topPane',
  WMS_VERSION: '1.3.0',
  TIME_DIMENSION_NEW_MARKERS: true,
  TIME_DIMENSION_UPDATE: true,
  LEAFLET_LAYERS: {},
  TIME_DIMENSIONS: {},
  LEGENDS: {},
  INITIAL_LAYER: null,
  FIT_BOUNDS: [
    [35.6569, 10.2019],
    [46.0763, 26.4142],
  ],
  MAP_OPTIONS: {
    zoom: 6,
    fullscreenControl: true,
    center: [42.10, 17.90],
    timeDimensionControl: true,
    timeDimensionControlOptions: {
      position: 'bottomleft',
      playerOptions: {
        transitionTime: 1000,
      }
    },
    timeDimension: true,
  }
}

window.TMES.SEA_LEVEL_URL = `${window.TMES.BASE_URL}wms/tmes_sea_level_frmc/TMES_sea_level_collection_best.ncd`;
window.TMES.WAVE_LENGTH_URL = `${window.TMES.BASE_URL}wms/tmes_wv_frmc/TMES_waves_collection_best.ncd`;

const SEA_LEVEL_LAYERS_OPTIONS = [
  {
    mapName: 'TMES - Sea level mean',
    layers: 'sea_level-mean',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-0.8,0.8',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    numcolorbands: 100,
    styles: 'boxfill/alg2',
    // styles: 'areafill/scb_greens',
    defaultEnable: true,
    scaleMid: false,
    time: {
      markerspane: TMES.MARKER_SPAN,
      units: "m",
    }
  },
  {
    mapName: 'TMES - Sea level standard deviation',
    layers: 'sea_level-std',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-0.4,0.4',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    //    markerscale: 15,
    //    markerspacing: 12,
    //    markerclipping: true,
    styles: 'boxfill/redblue',
    scaleMid: true,
    time: {
      units: "m",
    },
  }
]

const WAVE_LENGTH_LAYERS_OPTIONS = [
  {
    mapName: 'TMES - WSH Waves Significant Height',
    layers: 'wsh-mean',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,8',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,
    markerclipping: true,
    styles: 'boxfill/occam',
    scaleMid: false,
    time: {
      units: "m",
    },
  },
  {
    mapName: 'TMES - WSH standard deviation',
    layers: 'wsh-std',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-2,2',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,
    markerclipping: true,
    styles: 'boxfill/occam',
    scaleMid: true,
    time: {
      units: "m",
    },
  },
  {
    mapName: 'TMES - WMP Waves Mean Period',
    layers: 'wmp-mean',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,10',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,
    markerclipping: true,
    styles: 'boxfill/alg',
    scaleMid: false,
    time: {
      units: "m",
    },
  },
  {
    mapName: 'TMES - WMP standard deviation',
    scaleMid: true,
    layers: 'wmp-std',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-5,5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,
    markerclipping: true,
    styles: 'boxfill/alg',
    scaleMid: true,
    time: {
      units: "m",
    },
  },
  {
    mapName: 'TMES - WMD Waves Mean Direction',
    layers: 'wmd-std',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-10,10',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,
    markerclipping: true,
    //styles: 'boxfill/rainbow',
    scaleMid: false,
    time: {
      units: "m",
    },
  },
  {
    mapName: 'TMES - WMD standard deviation',
    layers: 'wmd-mean',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,360',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,
    markerclipping: true,
    scaleMid: true,
    //styles: 'boxfill/rainbow'
    // styles: 'areafill/scb_greens'
    styles: 'prettyvec/greyscale',
    time: {
      units: "m",
    }
  }
]

window.TMES.LAYERS = {}
window.TMES.LAYER_NAMES = {}
window.TMES.LAYERS_ORDER = []

SEA_LEVEL_LAYERS_OPTIONS.forEach(l => {
  const { time, defaultEnable = false, mapName, scaleMid, ...options } = l;
  window.TMES.LAYER_NAMES[mapName] = l.layers;
  window.TMES.LAYERS[l.layers] = {
    url: window.TMES.SEA_LEVEL_URL,
    options,
    defaultEnable,
    mapName,
    id: l.layers,
    scaleMid,
    time: {
      name: l.mapName,
      proxy: window.TMES.PROXY,
      enableNewMarkers: window.TMES.TIME_DIMENSION_NEW_MARKERS,
      updateTimeDimension: window.TMES.TIME_DIMENSION_UPDATE,
      updateTimeDimensionMode: 'replace',
      ...time,
    },
  }
  window.TMES.LAYERS_ORDER.push(l.layers)
})


WAVE_LENGTH_LAYERS_OPTIONS.forEach(l => {
  const { time, defaultEnable, scaleMid, mapName, ...options } = l;
  window.TMES.LAYER_NAMES[mapName] = l.layers;
  window.TMES.LAYERS[l.layers] = {
    url: window.TMES.WAVE_LENGTH_URL,
    options,
    defaultEnable,
    mapName,
    id: l.layers,
    scaleMid,
    time: {
      name: l.mapName,
      proxy: window.TMES.PROXY,
      enableNewMarkers: window.TMES.TIME_DIMENSION_NEW_MARKERS,
      updateTimeDimension: window.TMES.TIME_DIMENSION_UPDATE,
      updateTimeDimensionMode: 'replace',
      ...time,
    },
  }
  window.TMES.LAYERS_ORDER.push(l.layers)
})