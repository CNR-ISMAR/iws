import React, {createElement} from 'react';
import PropTypes from 'prop-types'
import { BaseControl } from 'react-map-gl';
import WindGL from '../../utils/wind-gl';
import request from '../../utils/request';
// import blu from './tmp/blu.png'
import blu from './tmp/blu_large.png'
// import blu from './tmp/blu_tutto.png'

class WSHLayer {
  constructor(id, ctx, wshLayer, uri) {
    this.id = id;
    this.loading = false;
    this.type = 'raster';
    this.source = {
      id: 'wsh',
      type: 'raster',
      tiles: [
        uri
      ],
      width: 256,
      height: 256
    }
    this.paint = {
      "raster-opacity": 0.8,
      'raster-hue-rotate': 0.2,
    }
  }
}

class WindLayer {
  constructor(id, ctx, windImageSrc, windImageMeta) {
    this.id = id;
    this.loading = false;
    this.type = 'custom';
    this.ctx = ctx;
    this.renderingMode = '2d';
    this.animationFrame = null;
    this.windImageSrc =  windImageSrc;
    this.windImageMeta =  windImageMeta;
    this.state = {wind: null, map: null, previous:null, position:null};
    //this.render = this.render.bind(this)
    this.drawWind = this.drawWind.bind(this);
    this.updateWindScale = this.updateWindScale.bind(this);
  }

  onAdd(map, gl) {
    this.loading = true;
    this.state.map = map
    const updateWindScale = this.updateWindScale
    const wind = new WindGL(this.ctx);
    wind.numParticles = this.calcNumParticles(map.transform.width, map.transform.height);

    request(this.windImageMeta)
     .then(windJson => {
        const windImage = new Image();
        let windData = windJson;
        windData.image = windImage;
        windImage.crossOrigin = "*";
        windImage.src = this.windImageSrc;
        windImage.onload = function () {
          wind.setWind(windData);
          updateWindScale(wind, map);
          this.loading = false;
        };
        windData.windData = windImage;
        // wind.setWind(windData)
        this.state.wind = wind
        // this.updateWindScale(wind, map)
        this.drawWind();
      })
  }

  onRemove() {
    cancelAnimationFrame(this.animationFrame);
  }

  drawWind() {
    if (this.state.wind && this.state.wind.windData) {
      this.state.wind.draw();
    }
    this.animationFrame = requestAnimationFrame(this.drawWind);
  }

  render(gl, matrix) {
    const map = this.state.map;
    const wind = this.state.wind;

    this.updateWindScale(wind, map)
  }

  calcNumParticles(width, height) {
    return Math.min(Math.floor(width / 20 * height / 20 / 5),
      1500
    );
  }


  updateWindScale(wind, map) {
    if (!wind || !wind.windData || !this.loading || map._moving  || map._zooming
      || ( JSON.stringify(map.transform) == this.state.previous )
    ) {
      return;
    }
    this.state.previous = JSON.stringify(map.transform)
    let data = wind.windData;
    let constRes = 5.01; // * window.devicePixelRatio
    let resolution = 40075016.686 * Math.cos(0) / Math.pow(2, (map.getZoom()) + 8) / constRes
    let scale = data.resolution / resolution;
    let position = map.project([data.lo1, data.la1]);
    position = [
      position.x,
      position.y
    ]
    if (!position || JSON.stringify(position) === this.state.position) {
      return;
    }

    this.state.position = JSON.stringify(position)

    let offset = [
      Math.max(-position[0] / scale, 0),
      Math.max(-position[1] / scale, 0)
    ];

    wind.move(position[0], position[1]);
    wind.offset(offset[0], offset[1]);
    wind.zoom(scale);
    wind.reset();
  }
}


class WindGLLayer extends BaseControl {

  constructor(props) {
    super(props);
  }

  getLayerBefore(map) {
    // return 'place';
    return 'cover';
    if(map.getLayer('favorites'))
      return 'favorites';
    if(map.getLayer('stations-sea-level'))
      return 'stations-sea-level';
    if(map.getLayer('stations-wave'))
      return 'stations-wave';
    return null
  }

  componentDidMount() {
    const map = this._context.map;
    const { layer, layerInfo, wsh, mean } = this.props;
    const canvas = this._containerRef.current;
    if (canvas) {
      this._canvas = canvas;
      this._ctx = canvas.getContext('webgl', {antialiasing: false});
    }
      const source = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
      if(source && wsh) {
        map.removeLayer("wsh");
        map.removeSource("wsh");
        map.removeLayer(layer.id);
      }
      if (this._ctx && this._ctx instanceof WebGLRenderingContext && wsh) {
        const wsh_uri = mean && layerInfo ? layerInfo.wsh_mean.url : layerInfo ? layerInfo.wsh_std.url : null
      const afterLayer = this.getLayerBefore(map);
        map.addLayer(new WSHLayer(wsh.id, this._ctx, wsh, wsh_uri), afterLayer);
        map.addLayer(new WindLayer(layer.id, this._ctx, layerInfo.wave_image, layerInfo.wave_metadata), afterLayer);
      } else {
        console.log("WEBGL NON ATTIVO");
        console.log("WEBGL NON ATTIVO");
        console.log("WEBGL NON ATTIVO");
        console.log("WEBGL NON ATTIVO");
        console.log("WEBGL NON ATTIVO");
      }
  }

  componentWillReceiveProps(newProps) {
    const map = this._context.map;
    const { layer, layerInfo, mean, wsh } = newProps;
    const source = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
    if(source && JSON.stringify(layerInfo) !== JSON.stringify(this.props.layerInfo) || mean != this.props.mean) {
      const wsh_uri = mean && layerInfo ? layerInfo.wsh_mean.url : layerInfo ? layerInfo.wsh_std.url : null
      // console.log("wsh_uri", wsh_uri)
      map.removeLayer("wsh");
      map.removeSource("wsh");
      map.removeLayer(layer.id);
      // const layers = map.getStyle().layers
      // let afterLayer = layers.map(x=>x.id).filter(x=>x.includes("station") || x.includes("seaLevel"))
      // afterLayer = (afterLayer.length > 0) ? afterLayer[0] : null
      const afterLayer = this.getLayerBefore(map);
        map.addLayer(new WSHLayer(wsh.id, this._ctx, wsh, wsh_uri), afterLayer);
      map.addLayer(new WindLayer(layer.id, this._ctx, layerInfo.wave_image, layerInfo.wave_metadata), afterLayer);
    }
  }

  componentWillUnmount() {
    const map = this._context.map;
    const { layer } = this.props;
    const source = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
    if(source) {
      map.removeLayer("wsh");
      map.removeSource("wsh");
      map.removeLayer(layer.id);
    }
  }

  _render() {
    // const pixelRatio = window.devicePixelRatio || 1;
    const pixelRatio = 1;
    const _this$_context$viewpo = this._context.viewport,
          width = _this$_context$viewpo.width,
          height = _this$_context$viewpo.height;

    // this._redraw();

    return createElement('canvas', {
      ref: this._containerRef,
      width: width * pixelRatio,
      height: height * pixelRatio,
      style: {
        width: "".concat(width, "px"),
        height: "".concat(height, "px"),
        position: 'absolute',
        left: 0,
        top: 0
      }
    });
  }


};

export default WindGLLayer;
