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
import ReactMapGL, { LinearInterpolator, FlyToInterpolator } from 'react-map-gl';
import { StaticMap } from 'react-map-gl';
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
    if(this.props.bbox) {
      const viewport = this.flyToBbox(this.props.bbox);
      this.props.dispatch(setViewport({ ...this.state.viewport, ...this.props.viewport, ...viewport }));
    }
  }

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

  render () {
    return (
      <DeckGL 
        disableTokenWarning={true}
        //width={this.state.viewport.width} 
        //height={this.state.viewport.height} 
        id="gis-map" 
        ref="map" 
        style={{ position: "fixed", top: 0, left: 0, height: '100vh', width: '100vw', minHeight: '100%', minWidth: '100vw' }}  
        viewState={this.props.viewport} 
        //mapboxApiAccessToken={mapboxToken} 
        onViewStateChange={this.updateViewport}
        mapStyle={this.props.mapStyle}
        controller={true}
        >
        <ReactMapGL disableTokenWarning={true} mapboxApiAccessToken={mapboxToken} />
        {false && (
          <>
            {this.props.layers && this.props.layers.length && this.props.layers.map((layer) => <Layer key={"map-layer-" + layer.id} layer={layer}/>)}
          </>
        )}
      </DeckGL>
    )
  }
}

export default withStyles(styles, {withTheme: true})(React.memo(Map));
