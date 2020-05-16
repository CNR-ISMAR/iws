/**
 *
 * LoginForm
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';

import 'mapbox-gl/dist/mapbox-gl.css';
import WebMercatorViewport from 'viewport-mercator-project';
import { easeCubic } from 'd3-ease';

import Layer from "./Layer";
import { setViewport,  getLatLon } from "../../containers/App/actions";

import ReactMapGL, { FlyToInterpolator, Popup } from 'react-map-gl';
import { LngLat } from 'mapbox-gl';
import WindGLLayer from "./WindGLLayer";
import LayerSeaLevel from "./LayerSeaLevel";
import LayerFavorites from "./LayerFavorites";
import mapCss from './mapCss.css';
import mapStyle from './mapStyle';

import { requestInfoLayer,
  emptyInfoLayer, toggleInfoLayer,
  fillIfIsFavourite, setPointPopup } from "containers/App/actions";

import InfoLayer from 'components/InfoLayer';

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
    };

    this.flyTo = this.flyTo.bind(this);
    this.flyToBbox = this.flyToBbox.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
    this.onMapLoad = this.onMapLoad.bind(this);
    this.onClick = this.onClick.bind(this);
    this.dispatchRequestInfoLayer = this.dispatchRequestInfoLayer.bind(this);
    this.openingTime = this.props.theme.transitions.duration.enteringScreen;
    this.closePopup = this.closePopup.bind(this);
    this.showPopup = this.showPopup.bind(this);
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
    // console.log('viewport',viewport)
    this.props.dispatch(setViewport(viewport));
  }

  onMapLoad(event) {
    const viewport = this.flyToBbox(this.props.bbox);
    this.setState({...this.state, mapboxIsLoading: false}, () => {
      this.props.dispatch(setViewport({...this.state.viewport, ...this.props.viewport, ...viewport}));
    });
    // console.log('MAP LOAD ', event)
    // event.target.setMaxBounds(this.props.options.maxBounds);
  }

  componentWillUnmount() {
    this.setState({...this.state, mapboxIsLoading: true});
  }

  shouldComponentUpdate(newProps) {
    return JSON.stringify(newProps) !== JSON.stringify(this.props);
  }

  dispatchRequestInfoLayer(bb200, selectedFav){
    this.props.dispatch(requestInfoLayer({
      time: this.props.layerInfo.date,
      bounds: bb200,
      station: this.state.station ? this.state.station.id : ''
    }));
    selectedFav[0] ? this.props.dispatch(fillIfIsFavourite(selectedFav[0])) : null
  }



  showPopup(event) {
    // console.log(this.props)
    // console.log(event.features);
    const stationFeatures = event.features.filter((f) => f.source.includes("station"))
    if (stationFeatures.length > 0) {
      const station = stationFeatures[0]
      const popup = {
        latitude: station.geometry.coordinates[0],
        longitude: station.geometry.coordinates[1],
        title: `Station ${station.properties.station_label}`,
        text: `(${stationFeatures.filter((s) => s.properties.station_label === station.properties.station_label).map((s) => s.properties.code).join(', ')})`,
        show: true,
        closeButton: true,
        closeOnClick: true,
        anchor: "top",
        dynamicPosition: false,
      }
      // this.setState({...this.state, popup: popup});
      this.props.dispatch(setPointPopup(popup));
      // console.log(popup);
    } else {
      if(this.props.pointPopup.show)
        this.props.dispatch(setPointPopup({show: false}));
    }
  }

  closePopup() {
    // this.setState({...this.state, popup: {...popup, show: false}});
      this.props.dispatch(setPointPopup({show: false}));
  }

  onClick(event) {
    // console.log(event.features)
    // console.log(this.refs.map.getMap())
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
            this.setState({...this.state, station: event.features[Index].properties})
            // this.setState({...this.state, station: event.features[Index].properties.id})
          }
        }
      } else {
            this.setState({...this.state, station: null})
      }
      // ANIMATION OPEN/CLOSE + REQUEST/CLOSE InfoLayer
      if(this.props.popups.open){
        this.props.dispatch(toggleInfoLayer(false))
        setTimeout(() => {
          this.props.dispatch(emptyInfoLayer());
          this.dispatchRequestInfoLayer(bb200, selectedFav)
        }, this.openingTime)
      }else{
        this.dispatchRequestInfoLayer(bb200, selectedFav)
      }
    }
  }

  onMouseMove(event, refs) {
    const pos = refs.map.getMap().unproject(event.offsetCenter)
    const latlon = new LngLat(pos.lng,pos.lat)
    this.props.dispatch(getLatLon(latlon.lat, latlon.lng))
  }

  render () {
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
        maxBounds={this.props.options.maxBounds}
        id="gis-map"
        ref="map"
        style={{ position: "fixed", top: 0, left: 0, height: '100vh', width: '100vw', minHeight: '100%', minWidth: '100vw' }}
        viewState={this.props.viewport}
        mapboxApiAccessToken={mapboxToken}
        onViewportChange={this.updateViewport}
        onLoad={this.onMapLoad}
        onClick={this.onClick}
        // onHover={this.showPopup}
        onTap={this.onClick}
        onMouseMove={(event) => this.onMouseMove(event, this.refs) }
        mapStyle={this.props.mapStyle}
        // mapStyle={'https://nose-cnr-backend.arpa.sicilia.it/styles/dark-nose/style.json'}
        // mapStyle={mapStyle}
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
                captureClick={false}
                captureDoubleClick={false}
                captureDrag={false}
                captureScroll={false}
                layerInfo={this.props.layerInfo}
                key={'LayerWave'}
                layer={this.props.WindGLLayer}
                wsh={this.props.wsh}
                mean={this.props.mean}
              />)}

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
        <InfoLayer
          timeline={this.props.timeline}
          layer={this.props.seaLevel.isVisible ? 'sea_level' : 'waves'}
          infos={this.props.popups}
          station={this.state.station}
          history={this.props.history}
          isLogged={this.props.isLogged}
          favourites={this.props.favourites}
          openingTime={this.openingTime}
          />
        {this.props.pointPopup.show && (
          <Popup {...this.props.pointPopup}
            onClose={() => this.closePopup()}
          >
          <div>
            {this.props.pointPopup.title}
            {this.props.pointPopup.text}
          </div>
          </Popup>

        )}
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
