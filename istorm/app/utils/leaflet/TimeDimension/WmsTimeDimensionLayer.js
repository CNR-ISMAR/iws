import React from 'react';
import PropTypes from 'prop-types';
// import {withLeaflet, WMSTileLayer, GridLayer} from 'react-leaflet';
import {withLeaflet, ExtendableWMSTileLayer} from 'react-leaflet-extendable';
import 'leaflet-timedimension/dist/leaflet.timedimension.src';

class WmsTimeDimensionLayer extends ExtendableWMSTileLayer {
  static propTypes = {
    layers: PropTypes.string.isRequired
  };

  createLeafletElement(props) {
    console.log(this.getOptions(props))
    return L.timeDimension.layer.wms(props.layers, this.getOptions(props));
    // return timeDimension(props.layers, this.getOptions(props));
  }
}

export default withLeaflet(WmsTimeDimensionLayer);
