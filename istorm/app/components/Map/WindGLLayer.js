
import React from 'react';
import PropTypes from 'prop-types'
import ReactMapGL, {BaseControl,  CanvasOverlay, CanvasRedrawOptions } from 'react-map-gl';
import WindGL from '../../utils/wind-gl';
import GLCanvasOverlay from './GLCanvasOverlay';
import windImageSrc from './tmp/2019071600.png'
import windJson from './tmp/2019071600.json'

class WindGLLayer extends BaseControl {

  constructor(props) {
    super(props);
    this.redraw = this.redraw.bind(this);
    this.calcNumParticles = this.calcNumParticles.bind(this);
    this.updateWindScale = this.updateWindScale.bind(this);
    this.drawWind = this.drawWind.bind(this);
    this.refreshWind = this.refreshWind.bind(this);
      this.state = {
        wind: null
      };
  }

  componentDidMount() {
    const map = this._context.map;
    const { layer } = this.props;
    // console.info("loaded");
    // console.info(map.loaded());

    // if(map.loaded()) {
    //   map.addLayer(layer);
    // } else {
    //   map.on('load', () => {
    //     map.addLayer(layer);
    //     map.off('load');
    //   });
    // }

  }
  redraw({width, height, ctx, project}) {
    this.state.mapInfo = {
      width:width,
      height:height,
      ctx:ctx,
      project:project,
    }
    console.log('redraw')
    console.log('width, height, ctx, project')
    console.log(width, height, ctx, project)
    console.log('this.props')
    // console.log(this.props)
    // console.log('ctx.canvas')
    // console.log(ctx.canvas)
    const gl = ctx;

    // if (gl) {
    //   console.log('GL IS HERE')
    //   let wind = new WindGL(gl);
    //   wind.numParticles = this.calcNumParticles(width, height);
    // }
    // else {
    //   console.log("NO GL!!!!!");
    //   console.log("NO GL!!!!!");
    //   console.log("NO GL!!!!!");
    // }

    const wind = new WindGL(gl);
    wind.numParticles = this.calcNumParticles(width, height);


    let windData = windJson;
    const windImage = new Image();
    windData.image = windImage;
    windImage.src = windImageSrc;
    const updateWindScale = this.updateWindScale
    const mapInfo = this.state.mapInfo
      windImage.onload = function () {
      wind.setWind(windData);
      updateWindScale(wind, mapInfo);
    };

    windImage.crossOrigin = "Anonymous"
    windData.windData = windImage;
    wind.setWind(windData)


    console.log(width, height, ctx, project)
    // console.log(this.props)
    // console.log(ctx.canvas)

    // if (wind) {
      console.log('drawWind call')

      this.state.wind = wind
      this.drawWind();
      // this.refreshWind(wind);
    // }
    // ctx.clearRect(0, 0, width, height);
    // ctx.globalCompositeOperation = "lighter";
    //
    // if (this.props.points) {
    //   ctx.lineWidth = '5';
    //   ctx.strokeStyle = '#ffffff';
    //   ctx.beginPath();
    //   this.props.pointspoints.forEach(point => {
    //     const pixel = project([point[0], point[1]]);
    //     ctx.lineTo(pixel[0], pixel[1]);
    //   });
    //   ctx.stroke();
    // }
  }

  componentWillUnmount() {
    // const map = this._context.map;
    // const { layer } = this.props;
    // if(map) {
    //   map.removeLayer(layer.id);
    //   map.removeSource(layer.id);
    // }
  }

  _render() {
    console.log('_render')
    return <GLCanvasOverlay key={'ol'} redraw={this.redraw}/>
  }



  calcNumParticles(width, height) {
    console.log('calcNumParticles')
    return Math.min(Math.floor(width / 10 * height / 10),
      3000
    );
  }


  updateWindScale(wind, mapInfo) {
    console.log('updateWindScale')
    console.log(mapInfo)
    if (!wind || !wind.windData) {
      console.log('error !wind || !wind.windData')
      return;
    }

    let data = wind.windData;

    console.log('wind.windData')
    console.log(data)

    // let resolution = map.getView().getResolution();
    let resolution = 1024.0;
    // let resolution = mapInfo.width*1.4;
    let scale = data.resolution / resolution;
    // scale=window.devicePixelRatio;
    // let scale = 1;
    const map = this._context.map;
    console.log(map)
    // let position = map.getPixelFromCoordinate([data.offset_x, data.offset_y]);
    // let position = map.unproject([data.offset_x, data.offset_y]);
    let position = map.project([data.lo1, data.la1]);
    console.log('position')
    console.log(position)
    position = [
      position.x,
      position.y
    ]
    if (!position) {
      return;
    }
    // position[1] -= data.height * scale;
    console.log('position post')
    console.log(position)

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

    // if (showWind) {
    //   windCanvas.hidden = false;
    // }
  }

  drawWind(wind) {
    // console.log('drawWind')
    if (this.state.wind.windData) {
      // console.log('vero')
      this.state.wind.draw();
    } else {
      // console.log('falso')
    }
    requestAnimationFrame(this.drawWind);
  }

  refreshWind(wind) {
    console.log('refreshWind')
    return new Promise(function(resolve, reject) {
      if (!wind) {
        resolve();
        return;
      }
      /*
          let data = tryParseJson('{"error":false,"height":828,"id":2662964,"max_x":12.73447307300849,"max_y":5.145534103158641,"min_x":-5.376652565185221,"min_y":-8.168596580170298,"offset_x":13955566.87619434,"offset_y":3885936.2337022102,"resolution":1024.0,"width":525}');

          if (!data || !data.width) {
              showSnackbar("바람 데이터를 가져올 수 없습니다.");
              reject();
              return;
          }

          let windData = data;

          if (windData.error) {
              showSnackbar("바람 데이터를 가져올 수 없습니다.");
          }
          else {
              const windImage = new Image();
              windData.image = windImage;
              windImage.src = HOST + "/wind-map?id=" + data.id;
              windImage.onload = function () {
                  wind.setWind(windData);
                  updateWindScale();
              };
          }

          resolve();
          */
      var req = new XMLHttpRequest();
      req.onload = function() {
        let data = tryParseJson(req.response);

        if (!data || !data.width) {
          showSnackbar("바람 데이터를 가져올 수 없습니다.");
          reject();
          return;
        }

        let windData = data;

        if (windData.error) {
          showSnackbar("바람 데이터를 가져올 수 없습니다.");
        }
        else {
          const windImage = new Image();
          windData.image = windImage;
//                    windImage.src = HOST + "/wind-map.png";
          windImage.src = HOST + "/2019071600.png";
          windImage.onload = function () {
            wind.setWind(windData);
            updatmeWindScale();
          };
        }

        resolve();
      }
      req.onerror = function() {
        reject();
        showSnackbar("바람 데이터를 가져올 수 없습니다.");
      }

      req.open("GET", HOST + "/wind-map-metadata.json", true);
      req.send();
    });
  }
  updateWindCanvasSize(wind, windCanvas) {
    console.log('updateWindCanvasSize')
    if (!wind) {
      return;
    }

    windCanvas.width = mapContainer.width();
    windCanvas.height = mapContainer.height();
    wind.resize();

    wind.numParticles = this.calcNumParticles();
  }


    //
    // function updateWindScale() {
    //     if (!wind || !wind.windData) {
    //         return;
    //     }
    //
    //     let data = wind.windData;
    //
    //     let resolution = map.getView().getResolution();
    //     let scale = data.resolution / resolution;
    //
    //     let position = map.getPixelFromCoordinate([data.offset_x, data.offset_y]);
    //     if (!position) {
    //         return;
    //     }
    //     position[1] -= data.height * scale;
    //
    //     let offset = [
    //         Math.max(-position[0] / scale, 0),
    //         Math.max(-position[1] / scale, 0)
    //     ];
    //
    //     wind.move(position[0], position[1]);
    //     wind.offset(offset[0], offset[1]);
    //     wind.zoom(scale);
    //     wind.reset();
    //
    //     if (showWind) {
    //         windCanvas.hidden = false;
    //     }
    // }


};

export default WindGLLayer;
