
import React from 'react';
import PropTypes from 'prop-types';
import { BaseControl } from 'react-map-gl';

class LayerSeaLevel extends BaseControl {

    constructor(props) {
        super(props);
    }

  componentDidMount() {
    const map = this._context.map;
    const {layer, layerInfo, mean} = this.props;
    let override = {
      source: {
        height: 256,
        tiles: [mean ? layerInfo.sea_level_mean : layerInfo.sea_level_std],
        type: "raster"
      }
    }
    const newLayer = {...layer, ...override};
    map.addLayer(newLayer);
  }

  componentWillReceiveProps(newProps) {
      console.log('componentWillReceiveProps')
      console.log('componentWillReceiveProps')
      console.log('componentWillReceiveProps')
    const map = this._context.map;
    const {layer, layerInfo, mean} = newProps;
    const source = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
    if (source && JSON.stringify(newProps.layerInfo) !== JSON.stringify(this.props.layerInfo) && mean == this.props.mean) {
      let override = {
        source: {
          height: 256,
          tiles: [mean ? layerInfo.sea_level_mean : layerInfo.sea_level_std],
          type: "raster"
        }
      }
      const newLayer = {...layer, ...override};
      map.removeLayer(layer.id);
      map.removeSource(layer.id);
      map.addLayer(newLayer);
    }
  }

    componentWillUnmount() {
        const map = this._context.map;
        const { layer } = this.props;
        // const source = typeof getLayer !== "undefined" ? map.map.getLayer(layer.id) : null;
        const source = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
        if(source) {
            map.removeLayer(layer.id);
            map.removeSource(layer.id);
        }
    }

    _render() { return null; }
};

export default LayerSeaLevel;
