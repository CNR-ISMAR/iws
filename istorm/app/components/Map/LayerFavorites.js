
import React from 'react';
import PropTypes from 'prop-types';
import { BaseControl } from 'react-map-gl';

class LayerFavorites extends BaseControl {

    constructor(props) {
        super(props);
    }

  componentDidMount() {
    const map = this._context.map;
    const {favoritesLayer} = this.props;
    let override = {
      source: {
        type: 'geojson',
        data: []
        // data: 'http://iws.inkode.it:4443/openistorm/favorites/geojson',
      }
    }
    console.log(override)
    console.log(override)
    console.log(override)
    console.log(override)
    console.log(override)
    console.log(override)
    console.log(override)
    const newLayer = {...favoritesLayer, ...override};
    map.addLayer(newLayer);
  }

  // componentWillReceiveProps(newProps) {
  //   const map = this._context.map;
  //   const {layer, layerInfo, mean} = newProps;
  //   const source = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
  //   console.log(newProps.mean == this.props.mean)
  //   if (source && JSON.stringify(newProps.layerInfo) !== JSON.stringify(this.props.layerInfo) || newProps.mean !== this.props.mean) {
  //     let override = {
  //       source: {
  //         type: 'geojson',
  //         data: []
  //         // data: 'http://iws.inkode.it:4443/openistorm/favorites/geojson',
  //       }
  //     }
  //     const newLayer = {...layer, ...override};
  //     map.removeLayer(layer.id);
  //     map.removeSource(layer.id);
  //     map.addLayer(newLayer);
  //   }
  // }

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

export default LayerFavorites;
