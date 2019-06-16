/**
 *
 * MapPage
 *
 */

import React from 'react';
import { Route, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMapPage, { makeSelectVisibleWmsLayer } from './selectors';
import { makeSelectDrawerOpen } from '../Sidebar/selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Map from '../../components/Map';
import SubNav from '../../components/SubNav';
import Layer from '../../components/Map/Layer';
import TileLayers from '../../components/Map/TileLayer';
import WmsLayers from '../../components/Map/WmsLayers';

import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
  return {
    content: {
      position: "relative",
      flexGrow: 1,
      width: "100%",
      padding: 0,
      marginTop: 64
    },
  }
};

function MapPage(props) {
  useInjectReducer({ key: 'mapPage', reducer });
  useInjectSaga({ key: 'mapPage', saga });
  console.info("mapPage");
  console.info(props);

  return (
    <main className={props.classes.content}>
      {/* <Route path={`${props.match.url}/:subNavNames`} component={({ match }) => <SubNav match={match} />} /> */}
      <Map options={props.mapPage.options}>
        <TileLayers layers={props.mapPage.baseLayers} />
        {/*props.mapPage.wmsLayers && props.mapPage.wmsLayers.map((layers, layersIndex) => <WmsLayers key={"project-layer-" + layersIndex} layers={layers} />)*/}
        {props.wmsVisible && <WmsLayers key={"wms-layers"} layers={props.wmsVisible} />}
      </Map>
    </main>
  );
}


MapPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mapPage: makeSelectMapPage(),
  wmsVisible: makeSelectVisibleWmsLayer(),
  drawerOpen: makeSelectDrawerOpen()
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

export default compose(withConnect)(withStyles(styles, {withTheme: true})(withRouter(MapPage)));
