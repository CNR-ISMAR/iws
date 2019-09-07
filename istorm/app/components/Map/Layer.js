
import React from 'react';
import PropTypes from 'prop-types';
import { BaseControl } from 'react-map-gl';

class Layer extends BaseControl {

    constructor(props) {
        super(props);
    }
  
    componentDidMount() {
        const map = this._context.map;
        const { layer, layerInfo } = this.props;
        let newLayer = layer;
        console.info("NEW LAYERRRRRRRRRRRRRRRRRR", newLayer, layerInfo);
        if("seaLevel" === layer.id) {
            newLayer = Object.assign(newLayer, {
                //tiles: [layerInfo.sea_level_mean],
            });
        }
        map.addLayer(newLayer);
    }

    componentWillUnmount() {
        const map = this._context.map;
        const { layer } = this.props;
        console.info("GERONIMOOOOOOOOO", map.hasOwnProperty("removeLayer"), map);
        console.info("GERONIMOOOOOOOOO", typeof map.removeLayer, map.loaded());
        if(typeof map.removeLayer === "function") {
            map.removeLayer(layer.id);
            map.removeSource(layer.id);
        }
    }

    _render() { return null; }
};

export default Layer;