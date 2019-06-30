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
        zoom: 6
      }
    };
    

    this.flyTo = this.flyTo.bind(this);
    this.flyToBbox = this.flyToBbox.bind(this);
    /*
    this.setView = this.setView.bind(this);
    this.porcatPErPulire = this.porcatPErPulire.bind(this);
    this.fitBounds = this.fitBounds.bind(this);*/
  }

  componentDidMount() {
    console.info("did mount");
    const viewport = this.flyToBbox(this.props.bbox, 6000);
    this.props.dispatch(setViewport({ ...this.state.viewport, ...viewport }));
  }

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

  flyTo(latitude, longitude, zoom, speed) {
    const viewport = {
      ...this.props.viewport,
      longitude: latitude || this.props.viewport.latitude,
      latitude: longitude || this.props.viewport.longitude,
      zoom: zoom || this.props.viewport.zoom,
      transitionDuration: speed || 800,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    };
    return viewport;
  }

  componentWillUnmount() { 
    console.info("map unmount")
  }

  flyToBbox(bbox, speed) {
    const {longitude, latitude, zoom} = new WebMercatorViewport(this.state.viewport)
      .fitBounds(bbox || this.props.bbox, {
        offset: [-280, -70]
      });
    return this.flyTo(latitude, longitude, zoom, speed);
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
        {...this.state.viewport} 
        mapboxApiAccessToken={mapboxToken} 
        onViewportChange={(viewport) => this.setState({viewport})}
        //onViewStateChange={(e) => this.mapboxLoadingEnd(e)}
        >
        {!this.state.mapboxIsLoading && (
          <>
            {this.props.layers && this.props.layers.length && this.props.layers.map((layer, layerInxed) => <Layer key={"map-layer-" + layerInxed} layer={layer}/>)}
          </>
        )}
      </ReactMapGL>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Map);
