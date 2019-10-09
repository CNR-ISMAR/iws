/**
 *
 * LoginForm
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';
import moment from "moment";

import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';

import 'mapbox-gl/dist/mapbox-gl.css';
import WebMercatorViewport from 'viewport-mercator-project';
import { easeCubic } from 'd3-ease';

import Layer from "./Layer";
import { setViewport, requestInfoLayer, 
        closeInfoLayer, postFavourite,
        deleteFavourite, togglePaper,
        postFavouriteEmpty, fillIfIsFavourite, getLatLon } from "../../containers/App/actions";

import ReactMapGL, { FlyToInterpolator, Popup, MapController } from 'react-map-gl';
import { LngLat, Point, LngLatBounds, MercatorCoordinate } from 'mapbox-gl';
import WindGLLayer from "./WindGLLayer";
import LayerSeaLevel from "./LayerSeaLevel";
import LayerFavorites from "./LayerFavorites";
import mapCss from './mapCss.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import BarChartIcon from '@material-ui/icons/BarChart';
import GradeIcon from '@material-ui/icons/Grade';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import labels from '../../utils/labels.js'


import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { fontSize } from '@material-ui/system';

import InfoLayer from 'containers/InfoLayer';

const mapboxToken = process.env.MAPBOX_TOKEN;

const styles = (theme) => {
  const offset = theme.sizing.paperWrapperWidth/2
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }
};

// let addFavourite = false

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mapboxIsLoading: true,
      station: '',
      viewport: {
        width: window.document.body.offsetWidth,
        height: window.document.body.offsetHeight,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic,
      },
      addFavourite: false
    };
       
    this.flyTo = this.flyTo.bind(this);
    this.flyToBbox = this.flyToBbox.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
    this.onMapLoad = this.onMapLoad.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setAddFavourite = this.setAddFavourite.bind(this);
   // this.openingTime = this.props.theme.transitions.duration.enteringScreen;

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
  setAddFavourite(value) {
    if(this.state.addFavourite !== value) {
    this.setState({...this.state, addFavourite:value})
    }
  }

  componentDidUpdate(){
    console.log('React Map Update')
    Object.keys(this.props.favourites.selected).length > 0 ? this.setAddFavourite(true)  : this.setAddFavourite(false)
   
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


  onClick(event) {
    if(!this.props.history.location.pathname.includes('station')){
      // console.log('REACT MAP GL onClick(event)')
      const pos = this.refs.map.getMap().unproject(event.offsetCenter)
      const latlon = new LngLat(pos.lng,pos.lat)
      const bb200 = latlon.toBounds(200)
      // console.log(event)

      const favouritesContainer = this.props.favourites.results;
      let selectedFav = [];
      if(event.features.length > 0) {
        if(event.features[0].source === 'favorites'){
          selectedFav = favouritesContainer.filter(fav => fav.title.includes(event.features[0].properties.title));
          // console.log(selectedFav[0])
        }else {
          const Index = event.features.findIndex(station =>  station.source.includes('station'));
          if(Index !== -1) {
            this.setState({...this.state, station: event.features[Index].properties.field_1})
          }
        }
      }
      // ANIMATION OPEN/CLOSE + REQUEST/CLOSE InfoLayer
      if(this.props.popups.open){
        this.props.dispatch(togglePaper(false))
        setTimeout(() => {
          this.props.dispatch(closeInfoLayer());
          this.props.dispatch(requestInfoLayer({
            time: this.props.layerInfo.date,
            bounds: bb200,
            station: this.state.station
          }));
          selectedFav[0] ? this.props.dispatch(fillIfIsFavourite(selectedFav[0])) : null
        }, this.openingTime)
      }else{
        this.props.dispatch(requestInfoLayer({
          time: this.props.layerInfo.date,
          bounds: bb200,
          station: this.state.station
        }));
        selectedFav[0] ? this.props.dispatch(fillIfIsFavourite(selectedFav[0])) : null
      }

    }
  }

  onMouseMove(event, refs) {
   // console.log(refs)
    const pos = refs.map.getMap().unproject(event.offsetCenter)
    const latlon = new LngLat(pos.lng,pos.lat)
    //const bb200 = latlon.toBounds(200)
    this.props.dispatch(getLatLon(latlon.lat, latlon.lng))
  }

  render () {
    console.log('React Map')
    console.log(this.props)

    console.log( 'SELECTED POINT' )
    console.log( this.props.favourites.selected)
    
    /* console.log('addFavourite')
    console.log('addFavourite')
    console.log(addFavourite) */
    return (
      <>
      <ReactMapGL
        disableTokenWarning={true}
        width={this.state.viewport.width}
        height={this.state.viewport.height}
        minPitch={this.props.options.minPitch}
        maxPitch={this.props.options.maxPitch}
        dragRotate={this.props.options.dragRotate}
        touchRotate={this.props.options.touchRotate}
        id="gis-map"
        ref="map"
        style={{ position: "fixed", top: 0, left: 0, height: '100vh', width: '100vw', minHeight: '100%', minWidth: '100vw' }}
        viewState={this.props.viewport} 
        mapboxApiAccessToken={mapboxToken} 
        onViewportChange={this.updateViewport}
        onLoad={this.onMapLoad}
        onClick={this.onClick}
        onTap={this.onClick}
        onMouseMove={(event) => this.onMouseMove(event, this.refs) }
        // disable={true}
        mapStyle={this.props.mapStyle}
        >
        
        {!this.state.mapboxIsLoading && (
          <>
            {this.props.seaLevel.isVisible && 
              (<LayerSeaLevel 
                layerInfo={this.props.layerInfo}
                key={'LayerSeaLevel'} 
                layer={this.props.seaLevel} 
                mean={this.props.mean}/>)}

            {this.props.WindGLLayer.isVisible && 
              (<WindGLLayer 
                layerInfo={this.props.layerInfo} 
                key={'LayerWave'} 
                layer={this.props.WindGLLayer}/>)}

                {/*TODO: UPDATE ONLY IF change isVisible*/}
            {Object.keys(this.props.layers).map((layer) => (
                 <Layer layerInfo={this.props.layerInfo} 
                        key={"map-layer-" + this.props.layers[layer].id} 
                        layer={this.props.layers[layer]}/>))}

            { this.props.isLogged && 
              this.props.favoritesLayer && 
              Object.keys(this.props.favoritesLayer.source.data).length > 0  && 
              this.props.favoritesLayer.isVisible && 
              <LayerFavorites layerInfo={this.props.favoritesLayer}/> }
          </>
        )}

        </ReactMapGL>
        <div>
          <InfoLayer 
            timeline={this.props.timeline} 
            infos={this.props.popups} 
            station={this.state.station}
            history={this.props.history}
            isLogged={this.props.isLogged} 
            addFavourite={this.state.addFavourite}
            selected={this.props.favourites.selected} />
        </div>
        
       
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }
  
}




export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Map)));
