/**
 *
 * LoginForm
 *
 */
import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { withRouter } from "react-router-dom";

import {connect, useSelector} from 'react-redux';

import 'maplibre-gl/dist/maplibre-gl.css';
import WebMercatorViewport from 'viewport-mercator-project';
import { easeCubic } from 'd3-ease';

import Layer from "./Layer";
import { setViewport,  getLatLon } from "../../containers/App/actions";

import ReactMapGL, { FlyToInterpolator, Popup, MapRef } from 'react-map-gl';
import maplibregl, { LngLat } from 'maplibre-gl';
// import WindGLLayer from "./WindGLLayer";
// import LayerSeaLevel from "./LayerSeaLevel";
// import LayerFavorites from "./LayerFavorites";
import mapCss from './mapCss.css';
import mapStyle from './mapStyle';
import "maplibre-gl/dist/maplibre-gl.css";


import { requestInfoLayer,
  emptyInfoLayer, toggleInfoLayer,
  fillIfIsFavourite, setPointPopup } from "containers/App/actions";

// import InfoLayer from 'components/InfoLayer';

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

function Map (props) {
  // console.log(props)
  const {layerInfo, dispatch, bbox, viewport, mapStyle} = props;
  const refMap = useRef(null);
  const layers = useSelector(state => state.mapPage.layers);

  // const mapRefrefMap = useRef<MapRef>();

  const [state, setState] = React.useState({
      mapboxIsLoading: true,
      station: '',
      viewport: {
        width: window.document.body.offsetWidth,
        height: window.document.body.offsetHeight,
        transitionDuration: 1000,
        // transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic,
      },
    });

  const openingTime = props.theme.transitions.duration.enteringScreen;

  // constructor(props) {
  //   super(props);
  //   state = {
  //     mapboxIsLoading: true,
  //     station: '',
  //     viewport: {
  //       width: window.document.body.offsetWidth,
  //       height: window.document.body.offsetHeight,
  //       transitionDuration: 1000,
  //       // transitionInterpolator: new FlyToInterpolator(),
  //       transitionEasing: easeCubic,
  //     },
  //   };
  //
  //   flyTo = flyTo.bind(this);
  //   flyToBbox = flyToBbox.bind(this);
  //   updateViewport = updateViewport.bind(this);
  //   onMapLoad = onMapLoad.bind(this);
  //   onClick = onClick.bind(this);
  //   dispatchRequestInfoLayer = dispatchRequestInfoLayer.bind(this);
  //   openingTime = props.theme.transitions.duration.enteringScreen;
  //   closePopup = closePopup.bind(this);
  //   showPopup = showPopup.bind(this);
  // }

  const flyTo = (latitude, longitude, zoom) => {
    const viewport = {
      longitude: latitude,
      latitude: longitude,
      zoom: zoom,
    };
    return viewport;
  }

  const flyToBbox = (bbox) => {
    console.log('flyToBbox',bbox);
    const {longitude, latitude, zoom} = new WebMercatorViewport(state.viewport)
      .fitBounds(bbox || bbox, {
        padding: {top: 0, right: 0, bottom: 0, left: 0},
        offset: [0, 50]
      });
    // TODO giorgio, verify [latitude, longitude] or [longitude, latitude]
    return refMap.current?.flyTo([latitude, longitude], zoom);
  }

  const updateViewport = (viewport) => {
    console.log('viewport',viewport);
    dispatch(setViewport(viewport));
  }

  const onMapLoad = (event) => {
    console.log('onMapLoad',event, props);
    const viewport = flyToBbox(bbox);
    const vp = {...state, mapboxIsLoading: false};
    setState(vp);
    dispatch(setViewport(vp));
    // console.log('MAP LOAD ', event)
    // event.target.setMaxBounds(props.options.maxBounds);
  }

  useEffect(() => {
    console.log('useEffect',props);
    setState({...state, mapboxIsLoading: true});
  }, [props, layers]);

  // const componentWillUnmount = () =>{
  //   setState({...state, mapboxIsLoading: true});
  // }

  // const shouldComponentUpdate = (newProps) =>  {
  //   return true;
  //   return JSON.stringify(newProps) !== JSON.stringify(props);
  // }

  const dispatchRequestInfoLayer = (bb200, selectedFav) => {
    dispatch(requestInfoLayer({
      time: layerInfo.date,
      bounds: bb200,
      station: state.station ? state.station.id : ''
    }));
    selectedFav[0] ? dispatch(fillIfIsFavourite(selectedFav[0])) : null
  }



  const showPopup = (event) => {
    // console.log(props)
    // console.log(event.features);
    const stationFeatures = event.features?.filter((f) => f.source.includes("station"))
    if (stationFeatures?.length > 0) {
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
      // setState({...state, popup: popup});
      dispatch(setPointPopup(popup));
      // console.log(popup);
    } else {
      if(props.pointPopup.show)
        dispatch(setPointPopup({show: false}));
    }
  }

  const closePopup = () => {
    // setState({...state, popup: {...popup, show: false}});
      dispatch(setPointPopup({show: false}));
  }

  const onClick = (event) => {
    console.log(event)
    // console.log(refs.current.getMap())
    if(!props.history.location.pathname.includes('station') && refMap.current){
      // console.log('REACT MAP GL onClick(event)')
      const pos = refMap.current.getMap().unproject(event.point)
      const latlon = new LngLat(pos.lng,pos.lat)
      const bb200 = latlon.toBounds(200)
      // console.log(event)

      const favouritesContainer = props.favourites.results;
      let selectedFav = [];
      if(event.features?.length > 0) {
        if(event.features[0].source === 'favorites'){
          selectedFav = favouritesContainer.filter(fav => fav.title.includes(event.features[0].properties.title));
          // console.log(selectedFav[0])
        }else {
          const Index = event.features.findIndex(station =>  station.source.includes('station'));
          if(Index !== -1) {
            setState({...state, station: event.features[Index].properties})
            // setState({...state, station: event.features[Index].properties.id})
          }
        }
      } else {
            setState({...state, station: null})
      }
      // ANIMATION OPEN/CLOSE + REQUEST/CLOSE InfoLayer
      if(props.popups.open){
        dispatch(toggleInfoLayer(false))
        setTimeout(() => {
          dispatch(emptyInfoLayer());
          dispatchRequestInfoLayer(bb200, selectedFav)
        }, openingTime)
      }else{
        dispatchRequestInfoLayer(bb200, selectedFav)
      }
    }
  }

  const onMouseMove = (event) => {
    // console.log('onMouseMove', event)
    if(refMap.current) {
      const pos = refMap.current.getMap().unproject(event.point)
      const latlon = new LngLat(pos.lng,pos.lat)
      // dispatch(getLatLon(latlon.lat, latlon.lng))
    }
  }

    return (
      <>
      <ReactMapGL
        mapLib={maplibregl}
        disableTokenWarning={true}
        width={state.viewport.width}
        height={state.viewport.height}
        minPitch={props.options.minPitch}
        maxPitch={props.options.maxPitch}
        dragRotate={props.options.dragRotate}
        touchRotate={props.options.touchRotate}
        // maxBounds={props.options.maxBounds}
        id="gis-map"
        ref={refMap}
        style={{ position: "fixed", top: 0, left: 0, height: '100vh', width: '100vw', minHeight: '100%', minWidth: '100vw' }}
        initialViewState={viewport} // TODO: check for new viewState control
        // viewState={viewport} // TODO: check for new viewState control
        onMove={evt => dispatch(setViewport(evt.viewState))}
        mapboxApiAccessToken={mapboxToken}
        onViewportChange={updateViewport}
        onLoad={onMapLoad}
        onClick={onClick}
        // onHover={showPopup}
        onTap={onClick}
        onMouseMove={(event) => onMouseMove(event) }
        mapStyle={mapStyle}
        // mapStyle={'https://nose-cnr-backend.arpa.sicilia.it/styles/dark-nose/style.json'}
        >

          <>
            {/*{props.seaLevel.isVisible &&*/}
            {/*  (<LayerSeaLevel*/}
            {/*    layerInfo={layerInfo}*/}
            {/*    key={'LayerSeaLevel'}*/}
            {/*    layer={props.seaLevel}*/}
            {/*    mean={props.mean}/>)}*/}

            {/*{props.WindGLLayer.isVisible &&*/}
            {/*  (<WindGLLayer*/}
            {/*    captureClick={false}*/}
            {/*    captureDoubleClick={false}*/}
            {/*    captureDrag={false}*/}
            {/*    captureScroll={false}*/}
            {/*    layerInfo={layerInfo}*/}
            {/*    key={'LayerWave'}*/}
            {/*    layer={props.WindGLLayer}*/}
            {/*    wsh={props.wsh}*/}
            {/*    mean={props.mean}*/}
            {/*  />)}*/}

            {console.log('rendering map LAYERS', layers)}
            {refMap?.current?.getMap() && Object.keys(layers)
              // .filter(l => {
              //   return layers[l]?.isVisible;
              // })
              .map((layer) => (
                 <Layer layerInfo={layerInfo}
                        key={"map-layer-" + layers[layer].id}
                        layer={layers[layer]}
                        map={refMap?.current?.getMap()}
                        loading={state.mapboxIsLoading}
                 />))}

            {/*{ props.isLogged &&*/}
            {/*  props.favoritesLayer &&*/}
            {/*  Object.keys(props.favoritesLayer.source.data).length > 0  &&*/}
            {/*  props.favoritesLayer.isVisible &&*/}
            {/*  <LayerFavorites layerInfo={props.favoritesLayer}/> }*/}
          </>
        </ReactMapGL>
        {/*<InfoLayer*/}
        {/*  timeline={props.timeline}*/}
        {/*  layer={props.seaLevel.isVisible ? 'sea_level' : 'waves'}*/}
        {/*  infos={props.popups}*/}
        {/*  station={state.station}*/}
        {/*  history={props.history}*/}
        {/*  isLogged={props.isLogged}*/}
        {/*  favourites={props.favourites}*/}
        {/*  openingTime={openingTime}*/}
        {/*  />*/}
        {/*{props.pointPopup.show && (*/}
        {/*  <Popup {...props.pointPopup}*/}
        {/*    onClose={() => closePopup()}*/}
        {/*  >*/}
        {/*  <div>*/}
        {/*    {props.pointPopup.title}*/}
        {/*    {props.pointPopup.text}*/}
        {/*  </div>*/}
        {/*  </Popup>*/}

        {/*)}*/}
      </>
    )

}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }

}




export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Map)));
