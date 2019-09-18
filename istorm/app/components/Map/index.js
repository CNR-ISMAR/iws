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

import { createStructuredSelector } from 'reselect';
import makeSelectPopup from './selectors';


import { connect } from 'react-redux';

import 'mapbox-gl/dist/mapbox-gl.css';
import WebMercatorViewport from 'viewport-mercator-project';
import { easeCubic } from 'd3-ease';

import Layer from "./Layer";
import { setViewport, requestPopUp } from "../../containers/App/actions";

import ReactMapGL, { FlyToInterpolator, Popup } from 'react-map-gl';
  import { LngLat, Point, MercatorCoordinate } from 'mapbox-gl';
import WindGLLayer from "./WindGLLayer";
import LayerSeaLevel from "./LayerSeaLevel";
import mapCss from './mapCss.css'
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
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic,
      },
      showPopup: true,
      popups: [],
    };
    
    this.flyTo = this.flyTo.bind(this);
    this.flyToBbox = this.flyToBbox.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
    this.onMapLoad = this.onMapLoad.bind(this);
    this.onClick = this.onClick.bind(this);
    
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
        padding: {top: 0, right: 0, bottom: 0, left: 0},
        offset: [0, 50]
      });
    return this.flyTo(latitude, longitude, zoom);
  }

  updateViewport(viewport) {
    this.props.dispatch(setViewport(viewport));
  }

  onMapLoad(data) {
    const viewport = this.flyToBbox(this.props.bbox);
    this.setState({...this.state, mapboxIsLoading: false}, () => {
      this.props.dispatch(setViewport({...this.state.viewport, ...this.props.viewport, ...viewport}));
    });
  }

  componentWillUnmount() {
    this.setState({...this.state, mapboxIsLoading: true});
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')   
    if(!this.props.popup.loading && this.props.popup.results.length > 0)
      console.log(this.props.popup.results)
  }

  onClick(event) {
    /* console.log(event)
    console.log(event.offsetCenter) */
    const pos = this.refs.map.getMap().unproject(event.offsetCenter)
    /* console.log(pos) */
    const lol = new LngLat(pos.lng,pos.lat)
    console.log('Map Page PopUp Click Evt')
    const popups = [
      {
        latitude: pos.lat,
        longitude: pos.lng,
        closeButton: true,
        closeOnClick: true,
        onClose: () => this.setState({...this.state, showPopup: false}),
        anchor: 'top'
      }
    ]
      //this.props.dispatch(requestPopUp());
      //console.log(this.props)
    this.setState({...this.state, popups: popups}, () => {
       this.props.dispatch(requestPopUp());
    });
  }


  render () {
    return (
      <ReactMapGL
        disableTokenWarning={true}
        width={this.state.viewport.width}
        height={this.state.viewport.height}
        id="gis-map"
        ref="map"
        style={{ position: "fixed", top: 0, left: 0, height: '100vh', width: '100vw', minHeight: '100%', minWidth: '100vw' }}
        viewState={this.props.viewport} 
        mapboxApiAccessToken={mapboxToken} 
        onViewportChange={this.updateViewport}
        onLoad={this.onMapLoad}
        onClick={this.onClick}
        onTap={this.onClick}
        mapStyle={this.props.mapStyle}
        >
        {!this.state.mapboxIsLoading && (
          <>
            {this.props.seaLevel.isVisible && (<LayerSeaLevel layerInfo={this.props.layerInfo} key={'LayerSeaLevel'} layer={this.props.seaLevel}/>)}
            {this.props.WindGLLayer.isVisible && (<WindGLLayer layerInfo={this.props.layerInfo} key={'LayerWave'} layer={this.props.WindGLLayer}/>)}
            {Object.keys(this.props.layers).map((layer) => this.props.layers[layer].isVisible && (<Layer layerInfo={this.props.layerInfo} key={"map-layer-" + this.props.layers[layer].id} layer={this.props.layers[layer]}/>))}
          </>
        )}
        {this.state.showPopup && (this.state.popups.map((popup) =>
            <Popup
                key={popup.latitude+popup.longitude}
                latitude={popup.latitude}
                longitude={popup.longitude}
                closeButton={popup.closeButton}
                closeOnClick={popup.closeOnClick}
                onClose={popup.onClose}
            >
            {JSON.stringify(this.props.popup.results)} 
            </Popup>
            
        ))}
      </ReactMapGL>
    )
  }
}


const mapStateToProps = createStructuredSelector({
  popup: makeSelectPopup(),
})



export default connect(mapStateToProps, null)(withStyles(styles, {withTheme: true})(Map));
