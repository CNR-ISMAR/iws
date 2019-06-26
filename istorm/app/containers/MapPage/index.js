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
import { zoomIn, zoomOut } from '../App/actions';
import messages from './messages';
import Map from '../../components/Map';
import TileLayers from '../../components/Map/TileLayer';
import WmsLayers from '../../components/Map/WmsLayers';

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
      width: "100%",
      height: "100%",
      padding: theme.spacing(2),
      margin: 0,
      //marginLeft: -240
    },
    overlayMap: {
      backgroundColor: "rgba(255,255,255,.8)"
    },
    overlayZoomList: {
      padding: 0
    },
    overlayZoomItem: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    overlayZoom: {
      maxWidth: 45,
    },
    overlayLayersMap: {
      padding: theme.spacing(1),
      maxWidth: 140,
    },
    overlayToolsWrapper: {
      
    }
  }
};

function MapPage(props) {
  console.info("mapPage");
  console.info(props);

  return (
    <>
      <Map options={props.mapPage.options}>
        <TileLayers layers={props.mapPage.baseLayers} />
        {/*props.mapPage.wmsLayers && props.mapPage.wmsLayers.map((layers, layersIndex) => <WmsLayers key={"project-layer-" + layersIndex} layers={layers} />)*/}
        {props.wmsVisible.length && <WmsLayers key={"wms-layer-group-"} layers={props.wmsVisible} />}
      </Map>
      <div className={props.classes.mapControl}>
      <Grid container className={props.classes.overlayToolsWrapper} spacing={2}>
        <Grid container item direction="row" justify="flex-end" alignItems="flex-start" xs={12}>
          <Grid item xs={2} className={[props.classes.overlayMap, props.classes.overlayZoom]}>
            <List className={props.classes.overlayZoomList}>
              <ListItem button onClick={(e) => props.dispatch(zoomIn())} key={"zoom-in"} className={props.classes.overlayZoomItem}>
                <Add />
              </ListItem>
              <ListItem button onClick={(e) => props.dispatch(zoomOut())} key={"zoom-out"} className={props.classes.overlayZoomItem}>
                <Remove />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid container item direction="row" justify="flex-end" alignItems="flex-start" xs={12}>
          <Grid item xs={2} className={[props.classes.overlayMap, props.classes.overlayLayersMap]}>
            <List>
                <ListItem button onClick={(e) => props.dispatch()} key={"dfsdfasfgdsfdsf"}>
                  <ListItemText primary={"Wave Level"} />
                  <WaveIcon />
                </ListItem>
                <ListItem button onClick={(e) => props.dispatch()} key={"sdsdsa"}>
                  <ListItemText primary={"Sea Level"} />
                  <SeaLevelIcon />
                </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
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
