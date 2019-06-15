import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import Layer from './Layer';
let getAttribution = text => ({ attribution: `Map data © ${text} contributors` });

let tileOptions = {
  osm: [
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    getAttribution('OpenStreetMap')
  ],
  wiki: [
    'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
    getAttribution('WikiMedia')
  ]
};

let BaseLayer = ({ types }) => types.map(type => <Layer layer={ L.tileLayer.apply(L, tileOptions[type]) } />);

BaseLayer.displayName = 'Tiles';

BaseLayer.propTypes = {
  type: PropTypes.oneOf(Object.keys(tileOptions))
};

export default BaseLayer;