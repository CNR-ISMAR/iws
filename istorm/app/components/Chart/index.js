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
import DiscreteColorLegend from 'react-vis/dist/legends/discrete-color-legend';
import {timeFormatDefaultLocale} from 'd3-time-format';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    }
  }
};

const LegendsColors = {
  sea_level: 'rgb(121, 199, 227)',
  wmd: 'rgb(50, 20, 227)',
  wmp: 'rgb(10, 200, 30)',
  wsh: 'rgb(200, 200, 30)'
}

const LegendsItems = [
  {title: 'Sea Level Std', color: LegendsColors.sea_level, strokeStyle: "dashed" },
  {title: 'Sea Level Mean', color: LegendsColors.sea_level, strokeStyle: "solid"},
  {title: 'Wmd Std', color: LegendsColors.wmd, strokeStyle: "dashed"},
  {title: 'Wmd Mean', color: LegendsColors.wmd, strokeStyle: "solid"},
  {title: 'Wmp Std', color: LegendsColors.wmp, strokeStyle: "dashed"},
  {title: 'Wmp Mean', color: LegendsColors.wmp, strokeStyle: "solid"},
  {title: 'Wsh Std', color: LegendsColors.wsh, strokeStyle: "dashed"},
  {title: 'Wsh Mean', color: LegendsColors.wsh, strokeStyle: "solid"},
]; 

const colors = []

function Chart(props) {
  const [chart, setChartState] = useState({width: 0, height: 0, crosshairValues: []});
  const wrapper = useRef(null);
  console.log('Chart')
  /* console.log(props.data) */
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
          
          { typeof props.data == 'object' && Object.keys(props.data).length > 0 && 
          <>
          <div className='chart_subtitle'>
            <div><h2>Latitude:</h2><h3>{props.latitude}</h3></div>
            <div><h2>Longitude:</h2><h3>{props.longitude}</h3></div>
            <div><h2>Time: </h2><h3>from: {props.timeFrom}<br></br> to: {props.timeTo}</h3></div>
          </div>
          <XYPlot 
            height={400} 
            width={chart.width} 
            xType="time" 
            yType="linear"
            onMouseLeave={() => setChartState({...chart, crosshairValues: []})}>
            <XAxis title='time' />
            <YAxis title='value'/>
            {typeof props.data == 'object' && Object.keys(props.data).map(name => {
              return (   
                <LineSeries 
                    key={name}
                    className={name}
                    color={
                      name.includes('sea_level') && LegendsColors.sea_level ||
                      name.includes('wmd') && LegendsColors.wmd ||
                      name.includes('wmp') && LegendsColors.wmp ||
                      name.includes('wsh') && LegendsColors.wsh
                    } 
                    data={fixFormat(props.data[name])} 
                    curve={'curveMonotoneX'} 
                    strokeStyle={name.includes('std') ? 'dashed' : 'solid'}
                    onNearestX={(value, {index}) => setChartState({...chart, crosshairValues: data.map(d => d[index])})} /> 
                )
            })}
            <Crosshair 
              values={chart.crosshairValues} 
              itemsFormat={x => x.map(function (value, index) { 
              /*  console.log(x, "CIAOCIAO"); */ return {title: labels[index], value: value.y}
                })
              }/>
              <DiscreteColorLegend items={LegendsItems} orientation='horizontal'></DiscreteColorLegend>
          </XYPlot>
        </> ||  <CircularProgress />
          }
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
