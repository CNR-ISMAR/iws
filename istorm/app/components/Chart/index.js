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
// import {DiscreteColorLegend} from 'react-vis/dist/legends/discrete-color-legend';

const styles = (theme) => {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    }
  }
};

/* const ITEMS = [
  {title: 'Dashed', color: "#45aeb1", strokeStyle: "dashed"},
  {title: 'Dasharray', color: '#f93', strokeDasharray: "1 2 3 4 5 6 7"},
  {title: 'Dots', color: 'url(#circles)', strokeWidth: 9},
  {title: 'Stripes', color: 'url(#stripes)'},
  {title: 'Wide stripes', color: 'url(#stripes)', strokeWidth: 13},
  {title: 'Normal', color: 'purple'},
  {title: 'Wide', color: 'powderblue', strokeWidth: 6},
]; */

function Chart(props) {
  const [chart, setChartState] = useState({width: 0, height: 0});
  const wrapper = useRef(null);
  console.log('Chart')
  console.log(props.data)
  const updateWidthHeight = () => {
    setChartState({width: wrapper.current.offsetWidth, height: (wrapper.current.offsetWidth/100) * 18})
  };

  useEffect(updateWidthHeight, [wrapper]);
  return (
    <div ref={wrapper} className={props.classes.subNav}>
      {/*<iframe src="https://iws.ismar.cnr.it/grafana/d-solo/_7Z2Rhlmk/sea-level?from=1542853716846&to=1549428315726&orgId=1&theme=dark&panelId=6" width="450" height="200" frameborder="0"></iframe>*/}
      <XYPlot height={chart.height} width={chart.width}>
        <XAxis title='XAxis'/>
        <YAxis title='YAxis'/>
        <LineSeries data={props.data} color={'red'} curve={'curveMonotoneX'} strokeStyle={'dashed'}/>
      </XYPlot>
      <h6></h6>
      {/* <XYPlot height={chart.height} width={chart.width}>
        <LineSeries data={props.data} />
      </XYPlot> */}
    </div>
  )
}

Map.childContextTypes = {
  map: PropTypes.object
};

export default withStyles(styles, {withTheme: true})(Chart);
