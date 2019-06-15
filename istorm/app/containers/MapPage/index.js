/**
 *
 * MapPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMapPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Map from '../../components/Map';
import Layer from '../../components/Map/Layer';
import Tiles from '../../components/Map/Tiles';
// import "leaflet/dist/leaflet.css";

export function MapPage(props) {
  useInjectReducer({ key: 'mapPage', reducer });
  useInjectSaga({ key: 'mapPage', saga });

  return (
    <Map>
      <Tiles type="wiki" />
    </Map>
  );
}


MapPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mapPage: makeSelectMapPage(),
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

export default compose(withConnect)(MapPage);
