/**
 *
 * MapPage
 *
 */

import React, { useEffect } from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import makeSelectMapPage, { makeSelectVisibleWmsLayer, makeSelectVisibleWindGLLayer } from '../App/selectors';
import makeSelectHistoryPage from '../History/selectors';
import { setCurrentDate, togglePlay } from '../History/actions';
import { zoomIn, zoomOut, toggleLayerVisibility, toggleLayerMean, requestFavouritesLayer, requestFavourites } from '../App/actions';
import { requestTimeline } from '../History/actions';
import messages from './messages';
import Map from '../../components/Map';
import Timeline from '../../components/Timeline';
import Legend from 'components/Legend';
//import TileLayers from '../../components/Map/TileLayer';
//import WmsLayers from '../../components/Map/WmsLayers';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import Mail from '@material-ui/icons/Mail';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { WaveIcon, SeaLevelIcon } from '../../utils/icons';
import { Hidden, Divider } from '@material-ui/core';

import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';


const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    //display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const styles = (theme) => {
  return {
    mapControl: {
      position: "absolute",
      zIndex: 10,
      flexGrow: 1,
      right: 0,
      width: 157,
      padding: 0,
      margin: 0,
      //marginLeft: -240
    },
    overlayMap: {
      backgroundColor: theme.palette.custom.mapOverlayBackground
    },
    overlayZoomList: {
      padding: 0,
    },
    overlayZoomItem: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    overlayZoom: {
      backgroundColor: theme.palette.custom.mapOverlayBackground,
      position: "absolute",
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
    overlayLayersMap: {
      position: "absolute",
      top: 110,
      right: theme.spacing(2),
      padding: 0,
      maxWidth: 140,
      backgroundColor: theme.palette.custom.mapOverlayBackground
    },
    overlayLayersLatLon:{
      position: "absolute",
      top: "70vh",
      width: 220,
      right: theme.spacing(2),
      maxWidth: 'none',
      padding: 12,
      height: 40,
      backgroundColor: theme.palette.custom.mapOverlayBackground,
      "& .MuiGrid-item":{
        fontSize: "0.75rem"
      },
      "& .MuiGrid-container": {
        justifyContent: "flex-end"
      }
    },
    overlayLayerMapHeader: {
      width: "100%",
      backgroundColor: theme.palette.custom.darkBackground,
      textAlign: "right"
    },
    overlayMapTimeline: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      padding: 0,
      //height: 150,
      width: "100%",
      maxWidth: "100%",
      //overflowX: "scroll",
      //marginBottom: -15,
      //overflow: "hidden",
      backgroundColor: theme.palette.custom.mapOverlayBackground
    },
    overlayMapTimelineScroll: {
      width: "100%",
      overflowX: "scroll",
      //overflowY: "hidden",
      //transform: "rotate(-90deg) translateY(-80px)",
      //transformOrigin: "right top",
      //paddingBottom: 28,
      //position: "absolute",
      //height: 150,
      //bottom: 0,
      //right: 0,
      //left: 0,
      //padding: 0,
      //backgroundColor: theme.palette.custom.mapOverlayBackground
    },
    overlayLayerMapList: {
      padding: 0
    },
    overlayLayerMapListText: {
      padding: 0,
      "& .MuiTypography-root": {
        fontSize: 13,
      }
    },
    overlayLayerMapListIcon: {
      width: "0.9em",
      height: "0.9em",
      marginLeft: 7
    },
  }
};

function MapPage(props) {
  console.info("mapPage");
  console.info(props);
  useInjectSaga({ key: 'popups', saga });
  
  let layerInfo = null;
  if(props.timeline.current && typeof props.timeline.results[props.timeline.current] !== "undefined") {
    layerInfo = props.timeline.results[props.timeline.current];
  }

  useEffect(() => {
    props.dispatch(requestTimeline())
    if(props.isLogged){
      props.dispatch(requestFavouritesLayer())
    }
  }, [])

  useEffect(() => {
    /* console.log('props.mapPage.favourites')
    console.log(props.mapPage.favourites) */
     if(props.isLogged && props.mapPage.favourites.results.length == 0){
      props.dispatch(requestFavourites());
    } 
  }, [props.isLogged]);

  return !props.timeline.loading && layerInfo != null ? (
      <>
        <Map 
          timeline={props.timeline} 
          layerInfo={layerInfo} 
          viewport={props.mapPage.viewport} 
          bbox={props.mapPage.bbox} 
          dispatch={props.dispatch} 
          mapStyle={props.mapPage.style} 
          layers={props.mapPage.layers} 
          mean={props.mapPage.mean}
          seaLevel={props.mapPage.seaLevel}
          WindGLLayer={props.mapPage.WindGLLayer}
          popups={props.mapPage.popups}
          isLogged={props.isLogged}
          favoritesLayer={props.mapPage.layers.favorites}
          favourites={props.mapPage.favourites}
          />
        <div className={props.classes.mapControl}>
          <div item className={props.classes.overlayZoom}>
            <List className={props.classes.overlayZoomList}>
              <ListItem button onClick={(e) => props.dispatch(zoomIn())} key={"zoom-in"} className={props.classes.overlayZoomItem}>
                <Add />
              </ListItem>
              <ListItem button onClick={(e) => props.dispatch(zoomOut())} key={"zoom-out"} className={props.classes.overlayZoomItem}>
                <Remove />
              </ListItem>
            </List>
          </div>
          <div item className={props.classes.overlayLayersMap}>
            <div className={props.classes.overlayLayerMapHeader}></div>
            <List className={props.classes.overlayLayerMapList}>
                <ListItem button selected={props.mapPage.WindGLLayer.isVisible} onClick={(e) => props.dispatch(toggleLayerVisibility("wmpMean"))} key={"nav-layer-sea-level"}>
                  <ListItemText primary={props.mapPage.WindGLLayer.name}  className={props.classes.overlayLayerMapListText} />
                    <WaveIcon iconcolor={props.theme.palette.custom.waveIcon} className={props.classes.overlayLayerMapListIcon} />
                </ListItem>
                <ListItem button selected={props.mapPage.seaLevel.isVisible} onClick={(e) => props.dispatch(toggleLayerVisibility("seaLevel"))} key={"nav-layer-wave-level"}>
                  <ListItemText primary={props.mapPage.seaLevel.name} className={props.classes.overlayLayerMapListText} />
                  <SeaLevelIcon iconcolor={props.theme.palette.custom.seaIcon} className={props.classes.overlayLayerMapListIcon} />
                </ListItem>
            </List>
            <Typography component="div" align="center" variant="caption">
              <Grid component="label" container spacing={1}>
                <Grid item>STD</Grid>
                <Grid item>
                  <Switch
                    size="small"
                    checked={props.mapPage.mean}
                    onChange={() => props.dispatch(toggleLayerMean())}
                    style={{display: "flex"}}
                    value="mean"
                  />
                </Grid>
                <Grid item>MEAN</Grid>
              </Grid>
            </Typography>
          </div>
          { props.mapPage.seaLevel.isVisible && <Legend type="Sea Level" /> /* || <Legend type="Wind GL Layer" /> */ }
          <div item className={props.classes.overlayLayersLatLon}>
            <Grid component="label" container spacing={1}>
              <Grid item>Lat</Grid>
              <Grid item m-r={2}>{props.mapPage.LatLon.latitude.toFixed(4)}</Grid>
              <Grid item>Lon</Grid>
              <Grid item>{props.mapPage.LatLon.longitude.toFixed(4)}</Grid>
            </Grid>
          </div>
        </div>
        {(props.mapPage.WindGLLayer.isVisible || props.mapPage.seaLevel.isVisible) && (<div className={props.classes.overlayMapTimeline}>
          <div className={props.classes.overlayMapTimelineScroll}>
            <Timeline timeline={props.timeline} setCurrentDate={(date) => props.dispatch(setCurrentDate(date))} togglePlay={() => props.dispatch(togglePlay())} />
          </div>
        </div>)}
      </>
      ) : null;
}


MapPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mapPage: makeSelectMapPage(),
  //wmsVisible: makeSelectVisibleWmsLayer(),
  timeline: makeSelectHistoryPage()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withStyles(styles, {withTheme: true})(React.memo(MapPage)));
