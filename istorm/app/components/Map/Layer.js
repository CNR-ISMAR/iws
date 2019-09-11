
import React from 'react';
import PropTypes from 'prop-types';
import { BaseControl } from 'react-map-gl';

class Layer extends BaseControl {

    constructor(props) {
        super(props);
    }
  
    componentDidMount() {
        const map = this._context.map;
        const { layer } = this.props;
        map.addLayer(layer);
    }

    componentWillReceiveProps(newProps) {
        const map = this._context.map;
        const { layer } = newProps;
        const source = typeof getLayer !== "undefined" ? map.map.getLayer(layer.id) : null;
        if(source && JSON.stringify(newProps.layerInfo) !== JSON.stringify(this.props.layerInfo)) {
            map.removeLayer(layer.id);
            map.removeSource(layer.id);
            map.addLayer(layer);
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

export default Layer;