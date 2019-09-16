
import React from 'react';
import PropTypes from 'prop-types';
import { BaseControl } from 'react-map-gl';

class LayerSeaLevel extends BaseControl {

    constructor(props) {
        super(props);
    }
  
    componentDidMount() {
        const map = this._context.map;
        const { layer, layerInfo } = this.props;
      let override = {
          source: {
            height: 256,
            tiles: [layerInfo.sea_level_mean],
            type: "raster"
        }
        }
        // const newLayer = Object.assign(layer, override);
        const newLayer = Object.assign(layer, {});
        map.addLayer(newLayer);
    }

    componentWillReceiveProps(newProps) {
        const map = this._context.map;
        const { layer, layerInfo } = newProps;
        // const source = typeof getLayer !== "undefined" ? map.map.getLayer(layer.id) : null;
        const source = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
        if(source && JSON.stringify(newProps.layerInfo) !== JSON.stringify(this.props.layerInfo)) {
          let override = {
            source: {
              height: 256,
              tiles: [layerInfo.sea_level_mean],
              type: "raster"
            }
          }
          const newLayer = Object.assign(layer, override);
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
