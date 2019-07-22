
import React from 'react';
import PropTypes from 'prop-types'
import ReactMapGL, {BaseControl,  LinearInterpolator, FlyToInterpolator, SVGOverlay, CanvasOverlay } from 'react-map-gl';

class SVGOverlayTest extends BaseControl {

  constructor(props) {
    super(props);
    this.redraw = this.redraw.bind(this);
  }

  componentDidMount() {
    const map = this._context.map;
    const { layer } = this.props;
    console.info("loaded");
    console.info(map.loaded());

    if(map.loaded()) {
      map.addLayer(layer);
    } else {
      map.on('load', () => {
        map.addLayer(layer);
        map.off('load');
      });
    }

  }
  redraw({project}) {
    console.log('project')
    console.log(project)
    const [cx, cy] = project([12.21, 45.85]);
    return <circle cx={cx} cy={cy} r={5} fill="blue" />;
  }

  componentWillUnmount() {
    const map = this._context.map;
    const { layer } = this.props;
    if(map) {
      map.removeLayer(layer.id);
      map.removeSource(layer.id);
    }
  }

  _render() {
    return <SVGOverlay key={'ol'} redraw={this.redraw}/>
  }
};

export default SVGOverlayTest;
