import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import Layer from './Layer';

const getWmsLayer = (layer) => {
  return layer.isTimeseries ? L.timeDimension.layer.wms(L.tileLayer.wms(layer.url, layer.options)) : L.tileLayer.wms(layer.url, layer.options);
}

let WmsLayers = ({ layer }) => <Layer key={"wms-layers-" + layer.id} layer={ getWmsLayer(layer) } />

WmsLayers.displayName = 'WmsLayers';

WmsLayers.propTypes = {
  layer: PropTypes.object
};

export default WmsLayers;
