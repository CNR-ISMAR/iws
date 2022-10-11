import React, {useEffect, useState} from 'react';

const LayerSeaLevel = ({layer, layerInfo, mean, map}) => {


  const getLayerBefore = () => {
    // return 'background';
    // return 'cover';
    if(map.getLayer('favorites'))
      return 'favorites';
    if(map.getLayer('stations-sea-level'))
      return 'stations-sea-level';
    if(map.getLayer('stations-wave'))
      return 'stations-wave';
    return null
  }

  useEffect(()=>{
    const exists = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;

    if (exists) {
      map.removeLayer(layer.id);
      map.removeSource(layer.id);
    }
      const override = {
        source: {
          height: 256,
        tiles: [mean ? layerInfo.sea_level_mean.url : layerInfo.sea_level_std.url],
          type: "raster"
        }
      }
      const newLayer = {...layer, ...override};
      const afterLayer = getLayerBefore(map);
      map.addLayer(newLayer, afterLayer);


    return () => {
        const exist = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : false;
        if(exist) {
            map.removeLayer(layer.id);
            map.removeSource(layer.id);
        }
    }
  },[layerInfo, mean]);
};

export default LayerSeaLevel;
