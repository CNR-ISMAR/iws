import React from 'react';
import PropTypes from 'prop-types';
import { BaseControl } from 'react-map-gl';
import { WindLayer, myTween } from '../../utils/customLayers';
import ecco from '../../images/ecco.png';

class GLLayerBAD extends BaseControl {
  constructor(props) {
    super(props);
    this.genWinTarget = this.genWinTarget.bind(this);
  }

  /**
   * calc targets depend on its angle, use 1 degree as dist.
   * @param {*array of wind particles} source
   */
  genWinTarget(source, dist = 6) {
    if (source instanceof Array) {
      const targets = [];
      for (let i = 0; i < source.length; i++) {
        const targ = {};
        if (
          source[i].lon == undefined ||
          source[i].angle == undefined ||
          source[i].color == undefined
        )
          continue;
        const xDelta = Math.cos(source[i].angle) * dist;
        const yDelta = Math.sin(source[i].angle) * dist;
        if (source[i].lat + yDelta > 84 || source[i].lat + yDelta < -84)
          targ.lat = source[i].lat;
        else targ.lat = source[i].lat + yDelta;
        targ.lon = source[i].lon + xDelta;
        targ.color = source[i].color;
        targets.push(targ);
      }
      return targets;
    }
  }

  componentDidMount() {
    const { map } = this._context;
    const { layer } = this.props;
    console.info('loaded');
    console.info(map.loaded());

    console.log(map)

    const windlayer = new WindLayer({
      map,
      shadow: true,
      blurWidth: 0,
      radius: 1,
    });
    const windImage = new Image();
    const geojson = false;
    // windImage.src = '/ecco.png';
    console.log(ecco)
    windImage.src = ecco;

    const genWinTarget = this.genWinTarget
    windImage.onload = function() {
      // updateWind should include myTween things below..
      windlayer.updateWind(windImage, geojson, 2);
      if (!geojson) {
        const objs = windlayer.particles;
        const targets = genWinTarget(objs);
        // hello, nice2meet you. calc targets depend on its angle, use 1 degree as dist.
        myTween.get(objs).to(targets, 8000, windlayer.redraw);
        map.on('moveend', function() {
          windlayer.redraw(objs);
        });
      } else {

        if (map.loaded()) {
          let layerProps = {
            id: 'wind',
            source: 'wind',
            type: 'circle',
            paint: {
              'circle-color': {
                property: 'color',
                type: 'identity',
              },
              'circle-radius': 2,
              // "fill-opacity": 0.4
            },
            // "filter": ["==", "$type", "Polygon"]
          }
          map.addSource('wind', {
            type: 'geojson',
            data: windlayer.particles,
          });
          map.addLayer(layerProps);
        } else {
          map.on('load', () => {
            map.addSource('wind', {
              type: 'geojson',
              data: windlayer.particles,
            });
            map.addLayer(layerProps);
            map.off('load');
          });
        }
      }
    };
  }

  // componentWillUnmount() {
  //   let layerProps = {
  //     id: 'wind',
  //     source: 'wind',
  //     type: 'circle',
  //     paint: {
  //       'circle-color': {
  //         property: 'color',
  //         type: 'identity',
  //       },
  //       'circle-radius': 2,
  //       // "fill-opacity": 0.4
  //     },
  //     // "filter": ["==", "$type", "Polygon"]
  //   }
  //   const { map } = this._context;
  //   // const { layer } = this.props;
  //   if (map) {
  //     map.removeLayer(layerProps.id);
  //     map.removeSource(layerProps.id);
  //   }
  // }

  _render() {
    return null;
  }
}

export default GLLayerBAD;
