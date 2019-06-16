import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import Layer from './Layer';
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

let TileLayers = ({ layers }) => layers.map((type, typeIndex) => <Layer key={"tail-layers-" + typeIndex} layer={ L.tileLayer.apply(L, tileOptions[type]) } />);

//TileLayers.displayName = 'tileOptions';

TileLayers.propTypes = {
  layers: PropTypes.array
};

export default TileLayers;