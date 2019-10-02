
import React from 'react';
import PropTypes from 'prop-types';
import { BaseControl } from 'react-map-gl';

import { connect } from 'react-redux';

class LayerFavorites extends BaseControl {

    constructor(props) {
        super(props);
    }

  componentDidMount() {
    const map = this._context.map;
    const { layerInfo} = this.props;
    const source = typeof map.getLayer !== "undefined" ? map.getLayer(layerInfo.id) : null;
    if( JSON.stringify(layerInfo.id) === "" ) {
      let override = {
        source: {
          type: 'geojson',
          data: layerInfo.source.data
          // data: 'http://iws.inkode.it:4443/openistorm/favorites/geojson',
        } 
      }
      const newLayer = {...layerInfo, ...override};
      map.addLayer(newLayer)
    }
  }

   componentWillReceiveProps(newProps) {
     const map = this._context.map;
     const {layerInfo} = newProps;
     const source = typeof map.getLayer !== "undefined" ? map.getLayer(layerInfo.id) : null;
     console.log(newProps.mean == this.props.mean)
     if (source && JSON.stringify(newProps.layerInfo) !== JSON.stringify(this.props.layerInfo)) {
      let override = {
        source: {
          type: 'geojson',
          data: layerInfo.source.data
          // data: 'http://iws.inkode.it:4443/openistorm/favorites/geojson',
        } 
      }
       const newLayer = {...layerInfo, ...override};
       map.removeLayer(layerInfo.id);
       map.removeSource(layerInfo.id);
       map.addLayer(newLayer);
     }
   }

    componentWillUnmount() {
        const map = this._context.map;
        const { layerInfo } = this.props;
        // const source = typeof getLayer !== "undefined" ? map.map.getLayer(layer.id) : null;
        const source = typeof map.getLayer !== "undefined" ? map.getLayer(layerInfo.id) : null;
        if(source) {
            map.removeLayer(layerInfo.id);
            map.removeSource(layerInfo.id);
        }
    }

    _render() { return null; }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }
  
}


export default connect(null, mapDispatchToProps)(LayerFavorites);
