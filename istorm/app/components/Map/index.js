/**
 *
 * LoginForm
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';

import 'mapbox-gl/dist/mapbox-gl.css';
import WebMercatorViewport from 'viewport-mercator-project';
import { easeCubic } from 'd3-ease';

import Layer from "./Layer";
import { setViewport } from "../../containers/App/actions";

import ReactMapGL, { FlyToInterpolator } from 'react-map-gl';
import NewWindGLLayer from "./NewWindGLLayer";

const mapboxToken = process.env.MAPBOX_TOKEN;


// class NullIslandLayer {
//     constructor() {
//         this.id = 'null-island';
//         this.type = 'custom';
//         this.renderingMode = '2d';
//     }
//
//     onAdd(map, gl) {
//         const vertexSource = `
//         uniform mat4 u_matrix;
//         void main() {
//             gl_Position = u_matrix * vec4(0.5, 0.5, 0.0, 1.0);
//             gl_PointSize = 20.0;
//         }`;
//
//         const fragmentSource = `
//         void main() {
//             gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
//         }`;
//
//         const vertexShader = gl.createShader(gl.VERTEX_SHADER);
//         gl.shaderSource(vertexShader, vertexSource);
//         gl.compileShader(vertexShader);
//         const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
//         gl.shaderSource(fragmentShader, fragmentSource);
//         gl.compileShader(fragmentShader);
//
//         this.program = gl.createProgram();
//         gl.attachShader(this.program, vertexShader);
//         gl.attachShader(this.program, fragmentShader);
//         gl.linkProgram(this.program);
//     }
//
//     render(gl, matrix) {
//         gl.useProgram(this.program);
//         gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "u_matrix"), false, matrix);
//         gl.drawArrays(gl.POINTS, 0, 1);
//     }
// }


const styles = (theme) => {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    }
  }
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    // this.map = React.createRef();
    this.state = {
      mapboxIsLoading: true,
      viewport: {
        width: window.document.body.offsetWidth,
        height: window.document.body.offsetHeight,
        zoom: 6,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic
      }
    };
    

    this.flyTo = this.flyTo.bind(this);
    this.flyToBbox = this.flyToBbox.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
    this.onMapLoad = this.onMapLoad.bind(this);
    // this.redraw = this.redraw.bind(this);
    // this.setWind = this.setWind.bind(this);
  }

  componentDidMount() {
    if(this.props.bbox) {
      const viewport = this.flyToBbox(this.props.bbox);
      this.props.dispatch(setViewport({ ...this.state.viewport, ...this.props.viewport, ...viewport }));
    }
  }
  // componentDidUpdate() {
  //   console.log('this.map')
  //   console.log(this.map.current)
  //
  // }

  flyTo(latitude, longitude, zoom) {
    const viewport = {
      longitude: latitude,
      latitude: longitude,
      zoom: zoom,
    };
    return viewport;
  }

  flyToBbox(bbox) {
    const {longitude, latitude, zoom} = new WebMercatorViewport(this.state.viewport)
      .fitBounds(bbox || this.props.bbox, {
        padding: {top: 0, right: 0, bottom: 0, left: 0},
        offset: [0, 50]
      });
    return this.flyTo(latitude, longitude, zoom);
  }

  updateViewport(viewport) {
    this.props.dispatch(setViewport(viewport));
  }

  onMapLoad(data, boh) {
    console.log("Map Load")
    console.log(data, boh)
    this.setState({...this.state, mapboxIsLoading: false});
    // this.props.dispatch(setViewport(viewport));
  }


  render () {
    return (
      <ReactMapGL 
        disableTokenWarning={true}
        width={this.state.viewport.width} 
        height={this.state.viewport.height} 
        id="gis-map" 
        // ref={this.map}
        ref="map"
        style={{ position: "fixed", top: 0, left: 0, height: '100vh', width: '100vw', minHeight: '100%', minWidth: '100vw' }}
        viewState={this.props.viewport} 
        mapboxApiAccessToken={mapboxToken} 
        onViewportChange={this.updateViewport}
        onLoad={this.onMapLoad}
        mapStyle={this.props.mapStyle}
        >
        {!this.state.mapboxIsLoading && (
          <>
            {Object.keys(this.props.layers).map((layer) => this.props.layers[layer].isVisible && (<Layer key={"map-layer-" + this.props.layers[layer].id} layer={this.props.layers[layer]}/>))}
            {this.props.newWindGLLayer.isVisible && (<NewWindGLLayer key={'NewWindGLLayer'} layer={{id:'NewWindGLLayer', ref:'NewWindGLLayer'}}/>)}
          </>
        )}
      </ReactMapGL>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Map);
