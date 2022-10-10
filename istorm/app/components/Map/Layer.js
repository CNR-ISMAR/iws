
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
// import { BaseControl } from 'react-map-gl';
import Map, {Source, Layer as BaseLayer} from 'react-map-gl';

const Layer = ({layer, map}) => {
  const [source, setSource] = useState(layer?.source);
  // console.log("layer.isVisible", layer.isVisible);
  // console.log(layer.isVisible);
  console.log(source.data);

  useEffect(() => {
    setSource(layer.source);
  }, [layer]);

  // useEffect(() => {
  //   console.log('BAUBAU', layer.isVisible);
  //   const exists = map.getLayer(layer.id);
  //     if (exists) {
  //       if(!layer.isVisible) {
  //         console.log('removeSource');
  //           map.removeLayer(layer.id);
  //           // map.removeSource(layer.id);
  //       }
  //     }
  //
  //     if (layer.isVisible) {
  //       console.log('addSource');
  //       try {
  //         if(!exists) {
  //           map.addSource(layer.id, source);
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //       map.addLayer(layer);
  //     }
  //
  //       // return () => {
  //       //   const source = map && typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
  //       //   console.log('DESTROYING... ', layer.id)
  //       //   if (source) {
  //       //     map.removeLayer(layer.id);
  //       //     map.removeSource(layer.id);
  //       //   }
  //       // }
  //
  // }, [layer]);


  // return null;
  return source && (<Source id={layer.id} type={source.type} data={source.data}>
    {layer.isVisible && (<BaseLayer {...layer}/>)}
    </Source>)
};

export default Layer;
