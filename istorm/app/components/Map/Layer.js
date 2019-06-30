
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
        map.removeLayer(layer.id);
        map.removeSource(layer.id);
    }

    _render() { return null; }
};

export default React.memo(Layer);