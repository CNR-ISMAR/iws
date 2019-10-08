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

const mapboxToken = process.env.MAPBOX_TOKEN;

const styles = (theme) => {
  const offset = theme.sizing.paperWrapperWidth/2
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    paperWrapper:{
      "& *[class^='MuiTableCell']":{
        // fontFamily: "Roboto",
        color: theme.palette.common.white,
        padding: "4px 0px",
        fontSize: "0.75rem",
        "line-height": "1.5em",
        textAlign: "center",
        borderColor: theme.palette.custom.contrastText,
        width: 15,
        [theme.breakpoints.down('md')]: {
          padding: 4,
        },
      },
      "& *[class^='MuiTypography']":{
        // fontFamily: "Roboto",
        color: theme.palette.common.white,
        fontSize: "0.75rem"
      },
      borderColor: theme.palette.custom.contrastText,
      backgroundColor: theme.palette.custom.backgroundOverlay,
      width: theme.sizing.paperWrapperWidth,
      position: "absolute",
      left: `calc( ((100vw - ${theme.sizing.drawerWidth}px) / 2 ) -  ( ${theme.sizing.paperWrapperWidth}px / 2 ) )`, 
      top: -200,
      border: "1px solid",
      borderRadius: 0,
      width: 460,
      padding: 8,
      transition: theme.transitions.create('top', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.down('md')]: {
        width: 360
      },
    },
    paperOpen: {
      top: 5,
    },
    headerTopClose: {
      minWidth: "auto",
      position: "absolute",
      right: 0,
      top: 0,
      color:theme.palette.custom.contrastText,
      "&:hover": {
        background: "transparent",
        color:theme.palette.custom.contrastTextSelected,
      }
    },
    buttonChart:{
      width:"50%",
      color:theme.palette.custom.contrastText,
      "&:hover": {
        background: "transparent",
        color:theme.palette.custom.contrastTextSelected,
      }
    },
    buttonAddFav:{
      width:"50%",
      color:theme.palette.custom.contrastText,
      "&:hover": {
        background: "transparent",
        color:theme.palette.custom.contrastTextSelected,
      }
    }
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
    this.openingTime = this.props.theme.transitions.duration.enteringScreen;

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
        {this.props.popups.results.length > 0 && (this.props.popups.results.filter(x=>x.show).map((popup, index) =>
            /*
               <Popup
                key={'popup'+index}
                latitude={popup.latitude}
                longitude={popup.longitude}
                closeButton={true}
                closeOnClick={ false }
                onClose={() => this.props.dispatch(closeInfoLayer()) }
            >
            */
              
              <Paper key={'popup'+index} className={ clsx(this.props.classes.paperWrapper, {
                [this.props.classes.paperOpen]: this.props.popups.open,
                }) } display="flex">
                <Typography align="center" width="100%" >
                  {moment(popup.time).utc().format('DD/MM/YYYY HH:mm')} - lat {popup.latitude.toFixed(4)}  lon {popup.longitude.toFixed(4)}
                </Typography>
                <Box pt={2} display="flex" flexDirection="column" justifyContent="center" width="100%">
                  <Table>
                    <TableHead>
                      <TableRow >
                      <TableCell></TableCell>
                      { popup.parameters.map((name, index) =>
                        <TableCell key={name+'-'+index}>{labels[name]}</TableCell>
                      )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        typeof popup.results.mean === 'object' &&
                        <TableRow>
                          <TableCell>mean</TableCell>
                          {popup.parameters.map((name) =>
                            <TableCell key={name + '-mean'}>{parseInt(popup.results.mean[name])}</TableCell>
                          )}
                        </TableRow>
                      }
                      {
                        typeof popup.results.std === 'object' &&
                        <TableRow>
                          <TableCell>std</TableCell>
                          {popup.parameters.map((name) =>
                            <TableCell key={name + '-std'}>{parseInt(popup.results.std[name])}</TableCell>
                          )}
                        </TableRow>
                      }
                      {
                        typeof popup.results.station === 'object' &&
                        // popup.results.std && typeof popup.results.std === 'object' &&
                        <TableRow>
                          <TableCell>station</TableCell>
                          { popup.parameters.map((name) =>
                            <TableCell key={name+'-station'}>{ typeof popup.results.station[name] == 'number' ? parseInt(popup.results.station[name]) : '' }</TableCell>
                          )}
                        </TableRow>
                      }
                    </TableBody>
                  </Table>
                  <Box textAlign="center" className="buttons" p={1} display="flex" flexDirection="row">
                    <Button className={this.props.classes.buttonChart} onClick={ () => { 
                        const latlon = new LngLat(popup.longitude, popup.latitude)
                        const bb200 = latlon.toBounds(200)
                        // console.log(bb200)
                        this.props.dispatch(togglePaper(false))
                        this.props.dispatch(closeInfoLayer());  
                        this.props.history.push(`/station/?bbox=${bb200._sw.lng},${bb200._sw.lat},${bb200._ne.lng},${bb200._ne.lat}&x=1&y=1&from=${this.props.timeline.from}&width=2&height=2&to=${this.props.timeline.to}&station=${this.state.station}`)
                        
                      }
                    }>
                      <BarChartIcon></BarChartIcon>
                    </Button>
                  { this.props.isLogged &&
                    <Button className={this.props.classes.buttonAddFav}
 
                            onClick={ (e) => {
                                      e.preventDefault()
                                      if(!this.state.addFavourite){
                                        this.props.dispatch(postFavourite({ 
                                          title: "",
                                          address: "",
                                          latitude: popup.latitude,
                                          longitude: popup.longitude }
                                        ))
                                       }
                                       else{
                                        this.props.dispatch(deleteFavourite(this.props.favourites.selected.id))
                                      }
                                    }
                      }>
                      {  this.state.addFavourite &&
                        <GradeIcon></GradeIcon> || <GradeOutlinedIcon></GradeOutlinedIcon>
                      }
                      </Button> 
                    }
                  </Box>
                </Box>
                <Button size={"small"} className={this.props.classes.headerTopClose} onClick={() => {
                          this.props.dispatch(togglePaper(false))
                          setTimeout(() => {
                            this.props.dispatch(closeInfoLayer());
                          }, this.openingTime)

                        } }><HighlightOffIcon/></Button>
              </Paper>
        ))}
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
