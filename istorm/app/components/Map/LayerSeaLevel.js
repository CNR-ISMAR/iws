
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
        const newLayer = Object.assign(layer, {
            //tiles: [layerInfo.sea_level_mean],
        });
        map.addLayer(newLayer);
    }

    componentWillReceiveProps(newProps) {
        const map = this._context.map;
        const { layer, layerInfo } = newProps;
        const source = typeof getLayer !== "undefined" ? map.map.getLayer(layer.id) : null;
        if(source && JSON.stringify(newProps.layerInfo) !== JSON.stringify(this.props.layerInfo)) {
            const newLayer = Object.assign(layer, {
                //tiles: [layerInfo.sea_level_mean],
            });
            map.removeLayer(layer.id);
            map.removeSource(layer.id);
            map.addLayer(newLayer);
        }
      }

    componentWillUnmount() {
        const map = this._context.map;
        const { layer } = this.props;
        const source = typeof getLayer !== "undefined" ? map.map.getLayer(layer.id) : null;
        if(source) {
            map.removeLayer(layer.id);
            map.removeSource(layer.id);
        }
    }

    _render() { return null; }
};

export default LayerSeaLevel;