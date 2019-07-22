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
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import { easeCubic } from 'd3-ease';

import Layer from "./Layer";
import { setViewport } from "../../containers/App/actions";

import ReactMapGL, { FlyToInterpolator, SVGOverlay } from 'react-map-gl';
// import ReactMapGL, {BaseControl,  LinearInterpolator, FlyToInterpolator, SVGOverlay, CanvasOverlay } from 'react-map-gl';
// import GLLayer from "./GLLayer";
// import SVGOverlayTest from "./SVGOverlayTest";
import GLLayerTest from "./GLLayerTest";
import GLCanvasOverlay from './GLCanvasOverlay';

const mapboxToken = process.env.MAPBOX_TOKEN;

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
        latitude: 41.343825,
        longitude: 17.775879,
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
        offset: [-300, 0, 0 , 0]
      });
    return this.flyTo(latitude, longitude, zoom);
  }

  updateViewport(viewport) {
    this.props.dispatch(setViewport(viewport));
  }

  onMapLoad(data) {
    console.log(data)
    // this.props.dispatch(setViewport(viewport));
  }
  // redraw({project}) {
  //   console.log('project')
  //   console.log(project)
  //   // const [cx, cy] = project([17,29, 91]);
  //   const [cx, cy] = project([12.21, 45.85]);
  // // "lo1": 12.21,
  // // "la1": 45.85,
  // // "lo2": 22.37,
  // // "la2": 36.67
  //   return <circle cx={cx} cy={cy} r={40} fill="blue" />;
  // }


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
        {true && (
          <>
            {
              this.props.layers && this.props.layers.length
              && this.props.layers.map((layer) => <Layer key={"map-layer-" + layer.id} layer={layer}/>)
              // && [0].map( () => <Layer key={"map-layer-" + this.props.layers[0].id+"a"} layer={this.props.layers[0]}/>)
              // && <GLLayer></GLLayer>
              // && [0].map( () => <SVGOverlay key={'ol'} redraw={this.redraw}/>)
              // && [0].map( () => <GLLayer key={"aaa-"} />)
            }
            {/*<SVGOverlayTest key={'SVGOverlayTest'} layer={{id:'SVGOverlayTest',ref:'SVGOverlayTest'}}/>*/}
            {/*<GLCanvasOverlay key={'GLLayerTest'} layer={{id:'GLLayerTest',ref:'GLLayerTest'}}/>*/}
            <GLLayerTest key={'GLLayerTest'} layer={{id:'GLLayerTest',ref:'GLLayerTest'}}/>
          </>
        )}
      </ReactMapGL>
    )
  }
}

export default withStyles(styles, {withTheme: true})(React.memo(Map));
