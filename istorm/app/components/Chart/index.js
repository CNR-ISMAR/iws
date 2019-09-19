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
  {id: 'sea_level-std', title: 'Sea Level Std', color: LegendsColors.sea_level, strokeStyle: "dashed" },
  { id: 'sea_level-mean', title: 'Sea Level Mean', color: LegendsColors.sea_level, strokeStyle: "solid"},
  { id: 'wmd-std', title: 'Wmd Std', color: LegendsColors.wmd, strokeStyle: "dashed"},
  { id: 'wmd-mean', title: 'Wmd Mean', color: LegendsColors.wmd, strokeStyle: "solid"},
  { id: 'wmp-std', title: 'Wmp Std', color: LegendsColors.wmp, strokeStyle: "dashed"},
  { id: 'wmp-mean', title: 'Wmp Mean', color: LegendsColors.wmp, strokeStyle: "solid"},
  { id: 'wsh-std', title: 'Wsh Std', color: LegendsColors.wsh, strokeStyle: "dashed"},
  { id: 'wsh-mean', title: 'Wsh Mean', color: LegendsColors.wsh, strokeStyle: "solid"},
]; 
let obj = {}
function Chart(props) {
  const [chart, setChartState] = useState({ width: 0, height: 0, itemClickID: '', crosshairValues: [] });
  const wrapper = useRef(null);
  console.log('Chart')
  /* console.log(props.data) */
  const updateWidthHeight = () => {
    setChartState({...chart, width: wrapper.current.offsetWidth, height: (wrapper.current.offsetWidth/100) * 18})
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
        {/* console.log(chart.itemClickID) */}  
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
                
                { Object.keys(props.data)
                          .filter(name => {
                            if(obj[name] === undefined || obj[name]){
                              return true
                            }else{
                              return false
                            } 
                          })
                          .map(name => {
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
                                  opacity={ 1 /* obj[name] === undefined || obj[name] ? 1 : 0 */ }
                                  data={fixFormat(props.data[name])}
                                  curve={'curveMonotoneX'} 
                                  strokeStyle={name.includes('std') ? 'dashed' : 'solid'}
                                  onNearestX={(value, {index}) => setChartState({...chart, crosshairValues: data.map(d => d[index])})} /> 
                              )
                          })
                }
                <Crosshair 
                  values={chart.crosshairValues} 
                  itemsFormat={x => x.map((value, index) => { 
                      /*console.log(x, "CIAOCIAO"); */ return {title: labels[index], value: value.y}
                    })
                  }/>
                <DiscreteColorLegend 
                  items={LegendsItems} 
                  orientation='horizontal'
                  onItemClick={item => { 
                    setChartState({ ...chart, itemClickID: item.id }); 
                    if(obj[item.id] === undefined)
                    obj[item.id] = false
                    else
                    obj[item.id] = !obj[item.id]
                    
                  }}   
                  >
                </DiscreteColorLegend>
              </XYPlot>
          </> ||  <CircularProgress />
        }
    </div>
  )
}

Map.childContextTypes = {
  map: PropTypes.object
};

export default withStyles(styles, {withTheme: true})(Chart);
