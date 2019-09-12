import React, {createElement} from 'react';
import PropTypes from 'prop-types'
import { BaseControl } from 'react-map-gl';
import WindGL from '../../utils/wind-gl';
import request from '../../utils/request';
import blu from './tmp/blu.png'

class BackgroundWindLayer {

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
    this.state = {wind: null, map: null};
    //this.render = this.render.bind(this)
    this.drawWind = this.drawWind.bind(this);
    this.updateWindScale = this.updateWindScale.bind(this);
  }

  onAdd(map, gl) {
    this.loading = true;
    const updateWindScale = this.updateWindScale
    this.state.map = map
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
        wind.setWind(windData)
        this.state.wind = wind
        this.updateWindScale(wind, map)
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
    // console.log('calcNumParticles')
    return Math.min(Math.floor(width / 20 * height / 20),
      1500
    );
  }


  updateWindScale(wind, map) {
    // console.log('updateWindScale')
    if (!wind || !wind.windData || !this.loading) {
      return;
    }
    let data = wind.windData;
    let constRes = 5.01; // * window.devicePixelRatio
    let resolution = 40075016.686 * Math.cos(0) / Math.pow(2, (map.getZoom()) + 8) / constRes
    let scale = data.resolution / resolution;
    let position = map.project([data.lo1, data.la1]);
    position = [
      position.x,
      position.y
    ]
    if (!position) {
      return;
    }

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

  componentDidMount() {
    const map = this._context.map;
    const { layer, layerInfo } = this.props;
    const canvas = this._containerRef.current;
    if (canvas) {
      this._canvas = canvas;
      this._ctx = canvas.getContext('webgl', {antialiasing: false});
    }
    const bgLayer = {
        'id': 'bgwaves',
        'type': 'raster',
        'source': {
          type: 'image',
          url: blu,
          coordinates: [
            [
              12.21,
              45.85
            ],
            [
              22.37,
              45.85
            ],
            [
              22.37,
              36.67,
            ],
            [
              12.21,
              36.67,
            ]
          ]
        },
        "paint": {
            // "raster-opacity": 0.5,
            "raster-opacity": 0.8,
            // 'raster-hue-rotate': 0,
            'raster-hue-rotate': 0.2,
            // "raster-resampling": "nearest"
        }
      }
      map.addLayer(bgLayer);
      if (this._ctx && this._ctx instanceof WebGLRenderingContext) {
        map.addLayer(new WindLayer(layer.id, this._ctx, layerInfo.wave_image, layerInfo.wave_metadata));
      } else {
        console.log("WEBGL NON ATTIVO");
      }
  }

  componentWillReceiveProps(newProps) {
    const map = this._context.map;
    const { layer, layerInfo } = newProps;
    const source = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
    if(source && JSON.stringify(newProps.layerInfo) !== JSON.stringify(this.props.layerInfo)) {
      map.removeLayer(layer.id);
      map.addLayer(new WindLayer(layer.id, this._ctx, layerInfo.wave_image, layerInfo.wave_metadata));
    }
  }

  componentWillUnmount() {
    const map = this._context.map;
    const { layer } = this.props;
    const source = typeof map.getLayer !== "undefined" ? map.getLayer(layer.id) : null;
    if(source) {
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
