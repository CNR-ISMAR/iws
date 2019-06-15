import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import Layer from './Layer';

const getWmsLayer = (layer) => {
  return layer.isTimeseries ? L.timeDimension.layer.wms(L.tileLayer.wms(layer.url, layer.options)) : L.tileLayer.wms(layer.url, layer.options);
}

let WmsLayers = ({ layers }) => layers.map((layer, layerIndex) => <Layer key={"wms-layers-" + layerIndex} layer={ getWmsLayer(layer) } />)

WmsLayers.displayName = 'WmsLayers';

WmsLayers.propTypes = {
  layers: PropTypes.array
};

export default WmsLayers;