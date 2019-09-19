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
import {XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, Crosshair } from 'react-vis';
import {DiscreteColorLegend} from 'react-vis/dist/legends/discrete-color-legend';
import {timeFormatDefaultLocale} from 'd3-time-format';

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
  const [chart, setChartState] = useState({width: 0, height: 0, crosshairValues: []});
  const wrapper = useRef(null);
  console.log('Chart')
  console.log(props.data)
  const updateWidthHeight = () => {
    setChartState({width: wrapper.current.offsetWidth, height: (wrapper.current.offsetWidth/100) * 18})
  };

  const fixFormat = (ts) => {
    return ts.map(function (x) {
      return {
        x: new Date(x.x),
        y: x.y
      }
    })
  }

  const labels = typeof props.data == 'object' ? Object.keys(props.data) : []
  const data = typeof props.data == 'object' ? Object.keys(props.data).map(name => fixFormat(props.data[name])) : []

  useEffect(updateWidthHeight, [wrapper]);
  return (
    <div ref={wrapper} className={props.classes.subNav}>
          <XYPlot height={400} width={chart.width} xType="time" yType="linear"
          onMouseLeave={() => setChartState({...chart, crosshairValues: []})}>
            <XAxis title='time' />
            <YAxis title='value'/>
            {typeof props.data == 'object' && Object.keys(props.data).map(name =>
                <LineSeries key={name} data={fixFormat(props.data[name])} curve={'curveMonotoneX'} strokeStyle={name.includes('std') ? 'dashed' : 'solid'}
                  onNearestX={(value, {index}) => setChartState({...chart, crosshairValues: data.map(d => d[index])})}/>
            )}
          <Crosshair values={chart.crosshairValues} itemsFormat={x => x.map(function (value, index) { console.log(x, "CIAOCIAO"); return {title: labels[index], value: value.y}})}/>
          </XYPlot>
      {/*{JSON.stringify(chart.crosshairValues)}*/}
          {/*{typeof props.data == 'object' && <DiscreteColorLegend height={200} width={300} items={Object.keys(props.data)} />}*/}

      {/*<XYPlot height={chart.height} width={chart.width}>*/}
        {/*<XAxis title='XAxis'/>*/}
        {/*<YAxis title='YAxis'/>*/}
        {/*<LineSeries data={props.data} color={'red'} curve={'curveMonotoneX'} strokeStyle={'dashed'}/>*/}
      {/*</XYPlot>*/}
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
