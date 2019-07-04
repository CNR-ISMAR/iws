/**
 *
 * MapPage
 *
 */

import React from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import makeSelectMapPage, { makeSelectVisibleWmsLayer } from '../App/selectors';
import { zoomIn, zoomOut, toggleLayerVisibility } from '../App/actions';
import messages from './messages';
import Map from '../../components/Map';
//import TileLayers from '../../components/Map/TileLayer';
//import WmsLayers from '../../components/Map/WmsLayers';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Mail from '@material-ui/icons/Mail';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { WaveIcon, SeaLevelIcon } from '../../utils/icons';

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
    overlayLayerMapHeader: {
      width: "100%",
      backgroundColor: theme.palette.custom.darkBackground,
      textAlign: "right"
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

  return (
    <>
      <Map viewport={props.mapPage.viewport} bbox={props.mapPage.bbox} dispatch={props.dispatch} mapStyle={props.mapPage.style} layers={props.wmsVisible} />
        {/*<>
        <TileLayers layers={props.mapPage.baseLayers} />
        {props.wmsVisible.length && props.wmsVisible.map(layer => <WmsLayers key={"wms-layer-" + layer.id} layer={layer} />)}
        </>*/}
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
              <ListItem button selected={props.mapPage.layers["wmpMean"].isVisible} onClick={(e) => props.dispatch(toggleLayerVisibility("wmpMean"))} key={"nav-layer-wave-level"}>
                <ListItemText primary={props.mapPage.layers["wmpMean"].name} className={props.classes.overlayLayerMapListText} />
                <WaveIcon iconcolor={props.theme.palette.custom.waveIcon} className={props.classes.overlayLayerMapListIcon} />
              </ListItem>
              <ListItem button onClick={(e) => props.dispatch(toggleLayerVisibility())} key={"nav-layer-sea-level"}>
                <ListItemText primary={"Sea Level"}  className={props.classes.overlayLayerMapListText} />
                <SeaLevelIcon iconcolor={props.theme.palette.custom.seaIcon} className={props.classes.overlayLayerMapListIcon} />
              </ListItem>
          </List>
        </div>
      </div>
    </>
  );
}


MapPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mapPage: makeSelectMapPage(),
  wmsVisible: makeSelectVisibleWmsLayer()
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

export default compose(withConnect)(withStyles(styles, {withTheme: true})(MapPage));