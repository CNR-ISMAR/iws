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

import moment from "moment";

import 'react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, Crosshair } from 'react-vis';
import DiscreteColorLegend from 'react-vis/dist/legends/discrete-color-legend';
import {timeFormatDefaultLocale} from 'd3-time-format';
import CircularProgress from '@material-ui/core/CircularProgress';
import labels from '../../utils/labels.js';
import theme from '../../theme'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { flexbox } from '@material-ui/system';
import { Paper } from '@material-ui/core';



const styles = (theme) => {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    myGridContainer: {
      margin: 0,
      width: "100%",
      padding: "0 10px"
    }
  }
};


const legendsColors = {
  sea_level: theme.palette.custom.seaIcon,
  wmd: theme.palette.custom.waveIcon,
  wmp: theme.palette.custom.waveDirection,
  wsh: theme.palette.custom.wavePeriod
}
let legendsItems = Object.keys(labels.lines).sort().map((item) => {return {
  'id': item,
  'title': labels.lines[item],
  'color': legendsColors[item.split('-')[0]],
  'strokeStyle': item.includes('mean') ? 'solid' : 'dashed',
  'disabled': false,
}})

let recordclick = {}
function Chart(props) {
  const [chart, setChartState] = useState({ width: 0, height: 0, itemClickID: '', crosshairValues: [] });
  const wrapper = useRef(null);
  // console.log('Chart')
  /* console.log(props.data) */
  const updateWidthHeight = () => {
    setChartState({...chart, width: wrapper.current.offsetWidth, height:  (wrapper.current.offsetWidth/100) * 25   })
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

  
  useEffect(updateWidthHeight, [props.data]);
  
  return (
    <div ref={wrapper} className={props.classes.subNav}>
        {/* console.log(chart.itemClickID) */}  
        { typeof props.data == 'object' && Object.keys(props.data).length > 0 && 
          <>
              <Grid container spacing={2} className={props.classes.myGridContainer} direction="row" justify="flex-start" alignItems="baseline">
                <Grid item >
                  <Typography align="center" variant="body2">Latitude: <span>{props.latitude.toFixed(4)}</span></Typography>
                </Grid>
                <Grid item >
                  <Typography align="center" variant="body2">Longitude: <span>{props.longitude.toFixed(4)}</span></Typography>
                </Grid>
                <Grid item >
                  <Typography align="center" variant="body2">Time: <span>{props.timeFrom} to: {props.timeTo}</span></Typography>
                </Grid>
              </Grid>
              
              <XYPlot  
                height={chart.height}
                width={chart.width}
                xType="time" 
                yType="linear" 
                onMouseLeave={() => setChartState({...chart, crosshairValues: []})}>
                <VerticalGridLines />
                <HorizontalGridLines />  
                
                <XAxis title='time' style={{
                    line: { stroke: '#698397', strokeWidth: 1 }, 
                    text: { stroke: 'none', fill: '#ffffff', fontSize: "0.5625rem" },
                    title: {fill: '#698397'}
                }}/>

                <YAxis title='value' style={{
                    line: { stroke: '#698397', strokeWidth: 1 }, 
                    text: { stroke: 'none', fill: '#ffffff', fontSize: "0.5625rem" },
                    title: {fill: '#698397'}
                }}/>
                { Object.keys(props.data)
                          .filter(name => {
                            if(recordclick[name] === undefined || recordclick[name]){
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
                                    name.includes('sea_level') && legendsColors.sea_level ||
                                    name.includes('wmd') && legendsColors.wmd ||
                                    name.includes('wmp') && legendsColors.wmp ||
                                    name.includes('wsh') && legendsColors.wsh
                                  }
                                  opacity={ 1 /*recordclick[name] === undefined || recordclick[name] ? 1 : 0*/  }
                                  data={fixFormat(props.data[name])}
                                  curve={'curveMonotoneX'} 
                                  strokeStyle={name.includes('mean') ? 'solid' : 'dashed'}
                                  onNearestX={(value, {index}) => setChartState({...chart, crosshairValues: data.map(d => d[index])})} /> 
                              )
                          })
                }
                <Crosshair
                  values={chart.crosshairValues} /* 
                  itemsFormat={x => x.map((value, index) => { 
                    console.log(value.y)
                      return  {title: labels[index], value: value.y}
                    }) 
                  }*/>
                    {chart.crosshairValues !== undefined && chart.crosshairValues.length > 0 &&
                      <Grid container>
                        <Grid item xs={12}>
                          <Paper style={{ color:"white", background:"rgba(105, 131, 151, 0.80)", padding:"10px", width:"200px"}}>
                            <Typography variant="body2">Data: { moment(chart.crosshairValues[0].x).utc().format('DD/MM/YYYY HH:mm') }</Typography>
                              <Box p={0} my={1} width="100%">
                                { chart.crosshairValues.map((value, index) => { 
                                    return <Typography key={labels[index]} variant="body2" style={{fontSize:"0.625rem", padding:"0", margin:"0 0 2px"}}>{labels[index]}: <span style={{fontSize:"0.825rem"}}>{value.y.toFixed(4)}</span></Typography>
                                  }) 
                                }
                                
                              </Box>
                          </Paper>
                        </Grid>
                      </Grid>
                  }
                </Crosshair>
              </XYPlot>
              <DiscreteColorLegend 
                  items={legendsItems} 
                  orientation='horizontal'
                  onItemClick={item => { 
                    setChartState({ ...chart, itemClickID: item.id }); 
                    if(recordclick[item.id] === undefined){
                      recordclick[item.id] = false
                    }
                    else{
                      recordclick[item.id] = !recordclick[item.id]
                    }
                    legendsItems.map(legenditem => { 
                      if(item.id === legenditem.id){
                        if(legenditem.disabled){
                          legenditem.disabled = false
                        }
                        else{
                          legenditem.disabled = true
                        }
                      }
                    })

                  }}   
                  >
                </DiscreteColorLegend>
          </> ||  <CircularProgress />
        }
    </div>
  )
}

Map.childContextTypes = {
  map: PropTypes.object
};

export default withStyles(styles, {withTheme: true})(Chart);
