/**
 *
 * LoginForm
 *
 */
import iso8601 from 'iso8601-js-period';
window.nezasa = {iso8601: iso8601}

import React from 'react';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import "leaflet-timedimension/dist/leaflet.timedimension.control.css";
import './fix.css';
import L from 'leaflet';
L.Icon.Default.imagePath = 'https://npmcdn.com/leaflet@1.0.1/dist/images/';
import "leaflet-timedimension/src/leaflet.timedimension";
import "leaflet-timedimension/src/leaflet.timedimension.util";
import "leaflet-timedimension/src/leaflet.timedimension.control";
import "leaflet-timedimension/src/leaflet.timedimension.layer";
import "leaflet-timedimension/src/leaflet.timedimension.layer.wms";
import "leaflet-timedimension/src/leaflet.timedimension.player";

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';

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
      map: null
    };

    this.flyTo = this.flyTo.bind(this);
    this.setView = this.setView.bind(this);
    this.porcatPErPulire = this.porcatPErPulire.bind(this);
    this.fitBounds = this.fitBounds.bind(this);
  }

  getChildContext() {
    return { map: this.state.map };
  }

  componentDidMount() {
    console.info("did mount");
    const { options } = this.props;
    const { fitBounds, flyTo } = this;

    const map = L.map(this.refs.map, options);

    this.setState({ map }, () => {
      fitBounds()
      //flyTo(options)
    });

  }

  componentWillUnmount() { 
    let { map } = this.state;
    map.off(); 
    map.remove();
  }

  timeout = null;

  porcatPErPulire() {
    let { timeout } = this;
    const { map } = this.state;
    if(timeout) {
      clearTimeout(timeout);
      timeout = null;  
    }
    timeout = setTimeout(() => {
      if(map) {
        map.invalidateSize();
      }
    }, 180);
  }

/*   componentWillReceiveProps(nextProps) {
    console.info("receive props");
    const { map } = this.state;
    const options = nextProps.options;
    //map.invalidateSize();
    //this.flyTo(options);
    //this.porcatPErPulire();
  } */

  componentDidUpdate(nextProps) {
    console.info("update component");
    const options = nextProps.options;
    //this.flyTo(options);
  }

  flyTo(options) {
    this.state.map.flyTo([options.center[0], options.center[1]], options.zoom, {
      animate: true,
      duration: .8
    });
  }

  fitBounds(bounds) {
    const bound = bounds ? bounds : this.state.map.getBounds();
    this.state.map.fitBounds(bound, {paddingTopLeft: [0, 240]});
  }

  setView(options) {
    this.state.map.setView([options.center[0], options.center[1]], options.zoom, {
      reset: false,
      animate: true,
      pan: {
        animate: true,
        duration: .8
      },
      zoom: {
        animate: true
      }
    });
  }

  render () {
    return (
      <div id="gis-map" ref="map" style={{ height: 'calc(100vh - 64px)', width: '100vw', minHeight: '100%', minWidth: '100vw' }}>
        { this.state.map ? this.props.children : undefined }
      </div>
    )
  }
}
Map.childContextTypes = {
  map: PropTypes.object
};
export default withStyles(styles, {withTheme: true})(Map);
