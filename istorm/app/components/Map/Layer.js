
import React from 'react';
import PropTypes from 'prop-types';
import { BaseControl } from 'react-map-gl';

class Layer extends BaseControl {

    constructor(props) {
        super(props);
        // console.log('Layer', props)
    }

  componentDidMount() {
    const map = this._context.map;
    const { layer } = this.props;
      // const source = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
      // if (source) {
      //   map.removeLayer(layer.id);
      //   map.removeSource(layer.id);
      // }
    if(layer.isVisible) {
      map.addLayer(layer);
    }
  }


    shouldComponentUpdate(newProps) {
      return JSON.stringify(newProps.layer) !== JSON.stringify(this.props.layer);
    }

    componentDidUpdate() {
      const map = this._context.map;
      const layer = this.props.layer;
      const source = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
      if (source) {
        map.removeLayer(layer.id);
        map.removeSource(layer.id);
      }
      if (layer.isVisible) {
        map.addLayer(layer);
      }
    }

    componentWillUnmount() {
        const map = this._context.map;
        const { layer } = this.props;
        const source = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
        if(source) {
            map.removeLayer(layer.id);
            map.removeSource(layer.id);
        }
    }

    _render() { return null; }
};

export default Layer;
