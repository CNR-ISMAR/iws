import React, {createElement} from 'react';
import PropTypes from 'prop-types'
import ReactMapGL, {BaseControl, CanvasOverlay, CanvasRedrawOptions} from 'react-map-gl';
import WindGL from '../../utils/wind-gl';
// import windImageSrc from './tmp/uv270.png'
// import windJson from './tmp/uv270.json'
import windImageSrc from './tmp/waves_1567202400.png'
import windJson from './tmp/waves_1567202400.json'
import {window} from "react-map-gl/dist/es6/utils/globals";

class NullIslandLayer {
  constructor() {
    this.id = 'null-island';
    this.type = 'custom';
    this.renderingMode = '2d';
  }

  onAdd(map, gl) {
    const vertexSource = `
        uniform mat4 u_matrix;
        void main() {
            gl_Position = u_matrix * vec4(0.5, 0.5, 0.0, 1.0);
            gl_PointSize = 20.0;
        }`;

    const fragmentSource = `
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }`;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);

    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);
  }

  render(gl, matrix) {
    gl.useProgram(this.program);
    gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "u_matrix"), false, matrix);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}

class WindLayer {
  constructor(ctx) {
    this.id = 'anim-wave-layer';
    this.type = 'custom';
    this.ctx = ctx;
    this.renderingMode = '2d';
    this.animationFrame = null;
    this.state = {wind: null, map: null};
    //this.render = this.render.bind(this)
    this.drawWind = this.drawWind.bind(this)
  }

  onAdd(map, gl) {
    console.log('onAdd')
    this.state.map = map
    const wind = new WindGL(this.ctx);
    wind.numParticles = this.calcNumParticles(map.transform.width, map.transform.height);
    let windData = windJson;
    const windImage = new Image();
    windData.image = windImage;
    windImage.src = windImageSrc;
    const updateWindScale = this.updateWindScale
    windImage.onload = function () {
      wind.setWind(windData);
      updateWindScale(wind, map);
    };
    windImage.crossOrigin = "Anonymous"
    windData.windData = windImage;
    wind.setWind(windData)
    this.state.wind = wind
    this.updateWindScale(wind, map)
    this.drawWind();
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
    return Math.min(Math.floor(width / 10 * height / 10),
      2200
    );
  }


  updateWindScale(wind, map) {
    // console.log('updateWindScale')
    if (!wind || !wind.windData) {
      console.log('error !wind || !wind.windData')
      return;
    }
    let data = wind.windData;
    // console.log(map)
    // let resolution = 1024.0;
    // Spx = C * cos(latitude) / 2 ^ (zoomlevel + 8)
    // 40075016.686
    // let resolution = 40075016.686 * Math.cos(map.transform._center.lat) / 2 ^ (map.transform._zoom + 8)
    let resolution = 40075016.686 * Math.cos(0) / Math.pow(2, (map.getZoom()) + 8) / 5.01
    // let resolution = 40075016.686 * Math.cos(0) / Math.pow(2, (5 + 8))
    // console.log('resolution')
    // // console.log(resolution)
    // console.log(Math.pow(2, map.transform._zoom + 8))
    // let resolution = map.transform.width;
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

    // console.log('offset')
    // console.log(offset)

    wind.move(position[0], position[1]);
    wind.offset(offset[0], offset[1]);
    wind.zoom(scale);
    wind.reset();
  }
}


class NewWindGLLayer extends BaseControl {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const map = this._context.map;

    const canvas = this._containerRef.current;

    if (canvas) {
      this._canvas = canvas;
      this._ctx = canvas.getContext('webgl', {antialiasing: false});
    }

    if (map.loaded()) {
      map.addLayer(new WindLayer(this._ctx));
    } else {
      map.on('load', () => {
        map.addLayer(new WindLayer(this._ctx));
        map.off('load');
      });
    }

  }

  componentWillUnmount() {
    const map = this._context.map;
    if(map) {
      map.removeLayer("anim-wave-layer");
    }
  }

  _render() {
    const pixelRatio = window.devicePixelRatio || 1;
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

export default NewWindGLLayer;
