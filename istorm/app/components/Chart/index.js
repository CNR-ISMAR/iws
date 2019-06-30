/**
 *
 * LoginForm
 *
 */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';

import 'react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis } from 'react-vis';

const styles = (theme) => {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    }
  }
};

function Chart(props) {
  const [chart, setChartState] = useState({width: 0, height: 0});
  const wrapper = useRef(null);

  const updateWidthHeight = () => {
    setChartState({width: wrapper.current.offsetWidth, height: (wrapper.current.offsetWidth/100) * 18})
  };

  useEffect(updateWidthHeight, [wrapper]);
  return (
    <div ref={wrapper} className={props.classes.subNav}>
      <XYPlot height={chart.height} width={chart.width}>
        <XAxis />
        <YAxis />
        <LineSeries data={props.data} />
      </XYPlot>
      <h6></h6>
      <XYPlot height={chart.height} width={chart.width}>
        <LineSeries data={props.data} />
      </XYPlot>
    </div>
  )
}
Map.childContextTypes = {
  map: PropTypes.object
};
export default withStyles(styles, {withTheme: true})(Chart);
