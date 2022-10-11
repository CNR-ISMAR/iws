import React, {useEffect, useState} from 'react';
import Map, {Source, Layer as BaseLayer} from 'react-map-gl';

const Layer = ({layer, map}) => {
  const [source, setSource] = useState(layer?.source);
  console.log(source.data);

  useEffect(() => {
    setSource(layer.source);
  }, [layer]);

  useEffect(() => {
    const exists = map.getLayer(layer.id);
    if (exists) {
      map.removeLayer(layer.id);
    }

    if (layer.isVisible) {
      map.addLayer(layer);
    }

    return () => {
      const source = map && typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
      if (source) {
        map.removeLayer(layer.id);
        map.removeSource(layer.id);
      }
    }
  }, [layer]);


  return null;
  // return source && (<Source id={layer.id} type={source.type} data={source.data}>
  //   {layer.isVisible && (<BaseLayer {...layer}/>)}
  //   </Source>)
};

export default Layer;
