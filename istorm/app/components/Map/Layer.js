
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
        console.info("loaded");
        console.info(map.loaded());
        
        if(map.loaded()) {
            map.addLayer(layer);
        } else {
            map.on('load', () => {
                map.addLayer(layer);
                map.off('load');
            });    
        }
        
    }

    componentWillUnmount() {
        const map = this._context.map;
        const { layer } = this.props;
        if(map.hasOwnProperty("removeLayer")) {
            map.removeLayer(layer.id);
            map.removeSource(layer.id);
        }
    }

    _render() { return null; }
};

export default Layer;