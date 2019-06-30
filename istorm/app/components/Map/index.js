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
import ReactMapGL, { LinearInterpolator, FlyToInterpolator } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import { easeCubic } from 'd3-ease';

import Layer from "./Layer";
import { setViewport } from "../../containers/App/actions";

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
  }

  componentDidMount() {
    console.info("did mount");
    this.props.bbox && this.flyToBbox(this.props.bbox);
  }
  /*
  

  componentWillReceiveProps(nextProps) {
    console.info("receive props");
    let viewport = null;

    if(nextProps.viewport.zoom !== this.props.viewport.zoom || nextProps.viewport.longitude !== this.props.viewport.longitude || nextProps.viewport.latitude !== this.props.viewport.latitude) {
      viewport = this.flyTo(nextProps.viewport.latitude, nextProps.viewport.longitude, nextProps.viewport.zoom);
    } else {
      if(JSON.stringify(nextProps.bbox) !== JSON.stringify(this.props.bbox)) {
        viewport = this.flyToBbox(nextProps.bbox);
      }
      
    }
    
    if(viewport) {
      this.setState({viewport, mapboxIsLoading: false});
    }
  } 
  */
  flyTo(latitude, longitude, zoom) {
    const viewport = {
      ...this.props.viewport,
      longitude: latitude,
      latitude: longitude,
      zoom: zoom,
    };
    this.props.dispatch(setViewport({ ...this.props.viewport, ...viewport }))
    return viewport;
  }

  flyToBbox(bbox) {
    const {longitude, latitude, zoom} = new WebMercatorViewport(this.state.viewport)
      .fitBounds(bbox || this.props.bbox, {
        offset: [-280, -70, -100, 0]
      });
    return this.flyTo(latitude, longitude, zoom);
  }

  updateViewport(viewport, transitionInfo) {
    return transitionInfo && Object.keys(transitionInfo).length && this.props.dispatch(setViewport({ ...this.props.viewport, ...viewport }));
  }

  render () {
    return (
      <ReactMapGL 
        width={this.state.viewport.width} 
        height={this.state.viewport.height} 
        mapStyle={this.props.mapStyle} 
        id="gis-map" 
        ref="map" 
        style={{ position: "fixed", top: 0, left: 0, height: '100vh', width: '100vw', minHeight: '100%', minWidth: '100vw' }}  
        {...this.props.viewport} 
        mapboxApiAccessToken={mapboxToken} 
        onViewportChange={this.updateViewport}
        //onViewStateChange={(e) => this.mapboxLoadingEnd(e)}
        >
        {true && (
          <>
            {this.props.layers && this.props.layers.length && this.props.layers.map((layer, layerInxed) => <Layer key={"map-layer-" + layerInxed} layer={layer}/>)}
          </>
        )}
      </ReactMapGL>
    )
  }
}

export default withStyles(styles, {withTheme: true})(React.memo(Map));
