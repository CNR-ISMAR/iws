/**
 *
 * LoginForm
 *
 */

import 'leaflet/dist/leaflet.css';
import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
L.Icon.Default.imagePath = 'https://npmcdn.com/leaflet@1.0.1/dist/images/';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
      mapOptions: {
        center: [39.833333, -98.583333], // center of US
        zoom: 5,
        minZoom: 2,
        maxBounds: [
          [-85, -180],
          [85, 180],
        ],
      },
      layers: [{

      }]
    };
  }

  static childContextTypes = {
    map: PropTypes.object,
  }

  getChildContext() {
    return { map: this.state.map };
  }

  componentDidMount() {
    const options = this.state.mapOptions;
    const map = L.map(this.refs.map, options);

    //map.on('moveend', this.handleChange);

    this.setState({ map });
  }

  componentWillUnmount() { 
    this.state.map.remove(); 
  }

  render () {
    return (
      <div ref="map" style={{ height: 'calc(100vh - 64px)', width: '100%', minHeight: '100%' }}>
        { this.state.map ? React.cloneElement(React.Children.only(this.props.children), { options: this.state.mapOptions, map: this.state.map}) : undefined }
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Map);
