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
        closeInfoLayer, postFavourite, deleteFavourite, togglePaper, postFavouriteEmpty } from "../../containers/App/actions";

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
const mapboxToken = process.env.MAPBOX_TOKEN;

const styles = (theme) => {
  const offset = theme.sizing.paperWrapperWidth/2
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    paperWrapper:{
      backgroundColor: "rgba(255,255,255, 0.8)",
      width: theme.sizing.paperWrapperWidth,
      position: "absolute",
      left: `calc( ((100vw - ${theme.sizing.drawerWidth}px) / 2 ) -  ( ${theme.sizing.paperWrapperWidth}px / 2 ) )`, 
      top: -100,
      transition: theme.transitions.create('top', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    paperOpen: {
      top: 0,
    },
    headerTopClose: {
      fontSize: 20,
      lineHeight: 0.1,
      padding: 7,
      margin: '2px 2px 5px 5px',
      minWidth: "auto",
      borderRadius: 15,
      height: 15,
      width: 15,
      color: theme.palette.primary.dark,
      border: "1px solid "+theme.palette.primary.dark,
      position: "absolute",
      right: 0,
      top: 0
    },
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

  componentDidUpdate(){
    console.log('React Map Update')
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
    const pos = this.refs.map.getMap().unproject(event.offsetCenter)
    const latlon = new LngLat(pos.lng,pos.lat)
    const bb200 = latlon.toBounds(200)
    /* console.log(this.refs.map.getMap())
    console.log(bb200) */
    this.props.popups.open ? this.props.dispatch(togglePaper(false)) : this.props.dispatch(togglePaper(true))
    this.props.dispatch(requestInfoLayer({
      time: this.props.layerInfo.date,
      bounds: bb200,
    }));
  }



  render () {
    console.log('React Map')
    console.log(this.props)
    const postfavourites = this.props.popups.postfavourites;
    let addFavourite = false;
    !postfavourites.loading && Object.keys(postfavourites.results).length > 0 ? addFavourite = true : addFavourite = false
    return (
      <>
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
            {this.props.seaLevel.isVisible && (<LayerSeaLevel layerInfo={this.props.layerInfo} key={'LayerSeaLevel'} layer={this.props.seaLevel} mean={this.props.mean}/>)}
            {this.props.WindGLLayer.isVisible && (<WindGLLayer layerInfo={this.props.layerInfo} key={'LayerWave'} layer={this.props.WindGLLayer}/>)}
            {Object.keys(this.props.layers).map((layer) => this.props.layers[layer].isVisible && (<Layer layerInfo={this.props.layerInfo} key={"map-layer-" + this.props.layers[layer].id} layer={this.props.layers[layer]}/>))}
            {this.props.isLogged && this.props.favorites && Object.keys(this.props.favorites.source.data).length > 0  && this.props.favorites.isVisible && <LayerFavorites layerInfo={this.props.favorites}/> }
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
                <Box display="flex"  justifyContent="center" width="100%">
                  <Table>
                    <TableHead>
                      <TableRow >
                      <TableCell></TableCell>
                      {Object.keys(popup.results).map((name, index) => 
                        <TableCell key={name+'-'+index}>{name}</TableCell>
                      )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>mean</TableCell>
                        {Object.keys(popup.results).map((name, index) => 
                          <TableCell key={name+'-mean-'+index}>{ Math.ceil(popup.results[name].mean * 1000)/1000 }</TableCell>
                        )}
                      </TableRow>
                      <TableRow>
                        <TableCell>std</TableCell>
                        {Object.keys(popup.results).map((name, index) => 
                          <TableCell key={name+'-std-'+index}>{ Math.ceil(popup.results[name].std * 1000)/1000 }</TableCell>
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Box textAlign="center" className="buttons" p={1} display="flex">
                    <Button className="buttonChart" color="primary" onClick={ () => { 
                        const latlon = new LngLat(popup.longitude, popup.latitude)
                        const bb200 = latlon.toBounds(200)
                        console.log(bb200)
                        this.props.history.push(`/station/?bbox=${bb200._sw.lng},${bb200._sw.lat},${bb200._ne.lng},${bb200._ne.lat}&x=1&y=1&from=${this.props.timeline.from}&width=2&height=2&to=${this.props.timeline.to}`)
                      } 
                    }>
                      <BarChartIcon></BarChartIcon>
                    </Button>
                  { this.props.isLogged &&
                    <Button className="buttonAddFav" 
                            color="primary" 
                            onClick={ (e) => {
                                      e.preventDefault()
                                      if(!addFavourite){
                                        this.props.dispatch(postFavourite({ 
                                          title: "",
                                          address: "",
                                          latitude: popup.latitude,
                                          longitude: popup.longitude }
                                        ))
                                      }else{
                                        this.props.dispatch(deleteFavourite(postfavourites.results.id))
                                      }
                                    }
                      }>
                      { addFavourite &&
                        <GradeIcon></GradeIcon> || <GradeOutlinedIcon></GradeOutlinedIcon>
                      }
                      </Button> 
                    }
                  </Box>
                </Box>
                <Button size={"small"} className={this.props.classes.headerTopClose} onClick={() => { this.props.dispatch(togglePaper(false)); } } >&times;</Button>
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
