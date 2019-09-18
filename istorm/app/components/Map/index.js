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
import moment from "moment";

import { connect } from 'react-redux';

import 'mapbox-gl/dist/mapbox-gl.css';
import WebMercatorViewport from 'viewport-mercator-project';
import { easeCubic } from 'd3-ease';

import Layer from "./Layer";
import { setViewport, requestInfoLayer } from "../../containers/App/actions";

import ReactMapGL, { FlyToInterpolator, Popup, MapController } from 'react-map-gl';
  import { LngLat, Point, LngLatBounds, MercatorCoordinate } from 'mapbox-gl';
import WindGLLayer from "./WindGLLayer";
import LayerSeaLevel from "./LayerSeaLevel";
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
      }
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


  onClick(event) {
    const pos = this.refs.map.getMap().unproject(event.offsetCenter)
    const latlon = new LngLat(pos.lng,pos.lat)
    const bb200 = latlon.toBounds(200)
    console.log(this.refs.map.getMap())
    console.log(bb200)
    this.props.dispatch(requestInfoLayer({
      time: this.props.layerInfo.date,
      bounds: bb200,
    }));
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
            {this.props.seaLevel.isVisible && (<LayerSeaLevel layerInfo={this.props.layerInfo} key={'LayerSeaLevel'} layer={this.props.seaLevel} mean={this.props.mean}/>)}
            {this.props.WindGLLayer.isVisible && (<WindGLLayer layerInfo={this.props.layerInfo} key={'LayerWave'} layer={this.props.WindGLLayer}/>)}
            {Object.keys(this.props.layers).map((layer) => this.props.layers[layer].isVisible && (<Layer layerInfo={this.props.layerInfo} key={"map-layer-" + this.props.layers[layer].id} layer={this.props.layers[layer]}/>))}
          </>
        )}
        {this.props.popups.results.length > 0 &&  (this.props.popups.results.filter(x=>x.show).map((popup, index) =>
            <Popup
                key={'popup'+index}
                latitude={popup.latitude}
                longitude={popup.longitude}
                closeButton={true}
                closeOnClick={true}
                // onClose={() => this.setState({...this.state, showPopups: false})}
            >
              
              <Paper>
                <Typography id="tableTitle">
                  <Box fontWeight="fontWeightLight" p={1}>
                      Longitude: {popup.longitude}, Latitude: {popup.latitude}, Time: {moment(popup.time).format( 'DD/MM/YYYY')} 
                  </Box>
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="left">mean</TableCell>
                      <TableCell align="left">std</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(popup.results).map((name) => 
                      <TableRow>
                        <TableCell>{name}</TableCell>
                        <TableCell>{popup.results[name].mean}</TableCell>
                        <TableCell>{popup.results[name].std}</TableCell>
                      </TableRow>
                    ) }
                  </TableBody>
                </Table>
                <Box textAlign="center" p={1}>
                  <Button className="buttonChart" color="primary" onClick={ () => console.log('click load HCart')/* this.props.dispatch() */ }>
                    Open Chart
                    <BarChartIcon></BarChartIcon>
                  </Button>
                </Box>
              </Paper>

            </Popup>

        ))}
      </ReactMapGL>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }
  
}




export default connect(null, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Map));
