import React from 'react';
import PropTypes from 'prop-types'
import ReactMapGL, {BaseControl, CanvasOverlay, CanvasRedrawOptions} from 'react-map-gl';
import WindGL from '../../utils/wind-gl';
import GLCanvasOverlay from './GLCanvasOverlay';
import windImageSrc from './tmp/2019071600.png'
import windJson from './tmp/2019071600.json'

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
  constructor() {
    this.id = 'null-island';
    this.type = 'custom';
    this.renderingMode = '2d';
    this.state = {wind: null, map: null};
    this.render = this.render.bind(this)
    this.drawWind = this.drawWind.bind(this)
  }

  onAdd(map, gl) {
    console.log(map, gl)

    this.state.map = map
    const wind = new WindGL(gl);
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
  }

  drawWind() {
    if (this.state.wind && this.state.wind.windData) {
      this.state.wind.draw();
    }
    requestAnimationFrame(this.drawWind);
  }

  prerender(gl, matrix) {
    console.log('prerender')
    const map = this.state.map
    const wind = this.state.wind
    this.updateWindScale(wind, map)

  }

  render(gl, matrix) {
    console.log('render')
    const map = this.state.map
    const wind = this.state.wind
    // this.updateWindScale(wind, map)
    this.drawWind();
  }

  calcNumParticles(width, height) {
    console.log('calcNumParticles')
    return Math.min(Math.floor(width / 10 * height / 10),
      3000
    );
  }


  updateWindScale(wind, map) {
    console.log('updateWindScale')
    if (!wind || !wind.windData) {
      console.log('error !wind || !wind.windData')
      return;
    }
    let data = wind.windData;
    console.log(map)
    // let resolution = 1024.0;
    // Spx = C * cos(latitude) / 2 ^ (zoomlevel + 8)
    // 40075016.686
    // let resolution = 40075016.686 * Math.cos(map.transform._center.lat) / 2 ^ (map.transform._zoom + 8)
    let resolution = 40075016.686 * Math.cos(0) / Math.pow(2, (map.getZoom()) + 8) / 6
    // let resolution = 40075016.686 * Math.cos(0) / Math.pow(2, (5 + 8))
    console.log('resolution')
    console.log(resolution)
    console.log(Math.pow(2, map.transform._zoom + 8))
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

    console.log('offset')
    console.log(offset)

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
    // const { layer } = this.props;
    // console.info("loaded");
    // console.info(map.loaded());

    if (map.loaded()) {
      map.addLayer(new WindLayer());
    } else {
      map.on('load', () => {
        map.addLayer(new WindLayer());
        map.off('load');
      });
    }

  }

  _render() {
    return null
  }

};

export default NewWindGLLayer;
