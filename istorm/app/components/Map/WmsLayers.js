import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import Layer from './Layer';

let WmsLayers = ({ layers }) => layers.map(layer => <Layer layer={ L.tileLayer.wms(layer.url, layer.options) } />)

WmsLayers.displayName = 'Tiles';

WmsLayers.propTypes = {
  layers: PropTypes.array
};

export default WmsLayers;