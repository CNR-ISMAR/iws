
import React from 'react';
import PropTypes from 'prop-types';
// import { BaseControl } from 'react-map-gl';
import Map, {Source, Layer as BaseLayer} from 'react-map-gl';

const Layer = ({layer, type, data}) => {


  // componentDidMount() {
  //   const map = this._context.map;
  //   const { layer } = this.props;
  //   if(layer.isVisible) {
  //     map.addLayer(layer);
  //     const layerOnMap = map.getLayer(layer.id);
  //   }
  // }
  //
  //   shouldComponentUpdate(newProps) {
  //     return JSON.stringify(newProps.layer) !== JSON.stringify(this.props.layer);
  //   }
  //
  //   componentDidUpdate() {
  //     const map = this._context.map;
  //     const layer = this.props.layer;
  //     const source = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
  //     if (source) {
  //       map.removeLayer(layer.id);
  //       map.removeSource(layer.id);
  //     }
  //     if (layer.isVisible) {
  //       map.addLayer(layer);
  //     }
  //   }
  //
  //   componentWillUnmount() {
  //       const map = this._context.map;
  //       const { layer } = this.props;
  //       const source = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
  //       if(source) {
  //           map.removeLayer(layer.id);
  //           map.removeSource(layer.id);
  //       }
  //   }

  return (<Source type={type} data={data}>
    <BaseLayer/>
  </Source>)
};

export default Layer;
