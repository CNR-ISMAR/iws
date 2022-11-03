import React from 'react';
import PropTypes from 'prop-types';
import {BaseControl} from 'react-map-gl';

let getAttribution = text => ({ attribution: `Map data © ${text} contributors` });

let tileOptions = {
  osm: [
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    getAttribution('<a href="https://openstreetmap.org">OpenStreetMap</a>')
  ],
  wiki: [
    'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
    getAttribution('<a href="https://maps.wikimedia.org">WikiMedia</a>')
  ]
};

class CustomMarker extends BaseControl {

  componentDidMount() {
    const map = this._context.map;
    map.on('load', function() {
      //console.log("map loaded");
      map.addLayer({
        'id': 'wms-test-layer',
        'type': 'raster',
        'source': {
        'type': 'raster',
        'tiles': [
          'http://localhost:3000/thredds/wms/tmes/TMES_waves_20190630.nc?LAYERS=wmd-std&ELEVATION=0&TIME=2019-06-30T00%3A00%3A00.000Z&TRANSPARENT=true&STYLES=boxfill%2Frainbow&COLORSCALERANGE=4.157%2C107.4&NUMCOLORBANDS=20&LOGSCALE=false&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&SRS=EPSG%3A3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
          //'http://localhost:3000/thredds/wms/tmes/TMES_waves_20190620.nc?service=GetMap&bbox={bbox-epsg-3857}&SRS=EPSG:3857&layers=wmp-mean&elevation=0&logscale=false&format=image/png&transparent=true&abovemaxcolor=extend&belowmincolor=extend&numcolorbands=20&styles=boxfill/rainbow&colorscalerange=2.44,7.303&version=1.3.0'
        ],
        'width': 256,
        'height': 256
        },
        "paint": {

        }
      });
    });
  }

  componentWillUnmount() {
    const map = this._context.map;
    if(map) {
      map.removeLayer("wms-test-layer");
    }

    //const { map } = this.context;
    //const { layer } = this.props;
    //layer.removeFrom(map);
    //map.removeLayer(layer)
  }

  _render() {
    const {longitude, latitude} = this.props;

    const [x, y] = this._context.viewport.project([longitude, latitude]);

    const markerStyle = {
      position: 'absolute',
      background: '#000',
      fontSize: 40,
      left: x,
      top: y
    };

    return (
      <div ref={this._containerRef} style={markerStyle}>
        ({longitude}, {latitude} LOL)
      </div>
    );
  }

}



//let TileLayers = ({ layers }) => layers.map((type, typeIndex) => <Layer key={"tail-layers-" + typeIndex} layer={ L.tileLayer.apply(L, tileOptions[type]) } />);

//TileLayers.displayName = 'tileOptions';
/*
TileLayers.propTypes = {
  layers: PropTypes.array
}; */

export default CustomMarker;
