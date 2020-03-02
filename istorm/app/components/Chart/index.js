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
import {XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, Crosshair, AreaSeries, CustomSVGSeries } from 'react-vis';
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

function Chart(props) {
  const [chart, setChartState] = useState(
    {
      width: 0,
      height: 0,
      crosshairValues: [],
      recordclick: {
        sea_level: {
          'id': 'sea_level',
          'title': labels.sea_level,
          'color': legendsColors.sea_level,
          'disabled': false,
        },
        wmd: {
          'id': 'wmd',
          'title': labels.wmd,
          'color': legendsColors.wmd,
          'disabled': true,
        },
        wmp: {
          'id': 'wmp',
          'title': labels.wmp,
          'color': legendsColors.wmp,
          'disabled': true,
        },
        wsh: {
          'id': 'wsh',
          'title': labels.wsh,
          'color': legendsColors.wsh,
          'disabled': true,
        },
      }
    }
  );
  const wrapper = useRef(null);

  const updateWidthHeight = () => {
    setChartState({...chart, width: wrapper.current.offsetWidth, height:  (wrapper.current.offsetWidth/100) * 25   })
  };

  const setRecordClick = (itemId, clicked) => {
    let tmp = chart.recordclick;
    // console.log(itemId)
    if(!clicked) {
      Object.keys(chart.recordclick).map(z=>{
        tmp[z].disabled = z !== itemId
        // if(itemId === 'wmp' && z === 'wmd') {
        //   tmp[z].disabled = false
        // }
      })
    } else {
      tmp[itemId].disabled = true
    }
    // console.log(tmp)
    setChartState({...chart, recordclick:tmp})
  };

  const fixFormat = (ts) => {
    // console.log(ts)
    return ts.map(function (x) {
      return {
        x: new Date(x.x),
        y: x.y,
        y0: x.y0,
      }
    })
  }

  const fixDirection = (ts) => {
    return ts.map(function (x) {
      return {
        x: new Date(x.x),
        y: 0,
        customComponent: (row, positionInPixels, globalStyle) => {
          return (
              <g className="inner-inner-component">
                <text style={{fontSize: "40", transform: `rotateZ(${x.y+180}deg)`}}>↑</text>
                <text style={{}}>{parseInt(x.y)}°</text>
              </g>
          );
        }
      }
    })
  }
  const cslabels = typeof props.data == 'object' ? Object.keys(props.data) : []
  const data = typeof props.data == 'object' ? Object.keys(props.data).map(name => fixFormat(props.data[name])) : []


  useEffect(updateWidthHeight, [props.data]);

  return (
    <div ref={wrapper} className={props.classes.subNav}>
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

                <XAxis title='time' style={{
                    line: { stroke: '#698397', strokeWidth: 1 },
                    text: { stroke: 'none', fill: '#ffffff', fontSize: "0.5625rem" },
                    title: {fill: '#698397'}
                }}/>
                <VerticalGridLines />

                { chart.recordclick['wmd'].disabled && [
                  <HorizontalGridLines />,
                  <YAxis title='value' style={{
                        line: { stroke: '#698397', strokeWidth: 1 },
                        text: { stroke: 'none', fill: '#ffffff', fontSize: "0.5625rem" },
                        title: {fill: '#698397'}
                    }}/>
                  ]
                }

                { Object.keys(props.data)
                          .filter(name => !chart.recordclick[name.replace(/mean|area|max|min|station|-/gi, '')].disabled)
                          .map(name => {
                            return (name.includes('mean') || name.includes('station')) && !name.includes('wmd') ? (
                              <LineSeries
                                  key={name}
                                  className={name}
                                  color={
                                    name.includes('sea_level') && legendsColors.sea_level ||
                                    name.includes('wmd') && legendsColors.wmd ||
                                    name.includes('wmp') && legendsColors.wmp ||
                                    name.includes('wsh') && legendsColors.wsh
                                  }
                                  opacity={ 1 }
                                  data={fixFormat(props.data[name])}
                                  curve={'curveMonotoneX'}
                                  strokeStyle={name.includes('mean') || name.includes('station') ? 'solid' : 'dashed'}
                                  onNearestX={(value, {index}) => setChartState({...chart, crosshairValues: data.map(d => d[index])})}
                              />
                              ) : name.includes('area') ? (
                              <AreaSeries
                                  className='area-elevated-series'
                                  key={name}
                                  color={
                                    name.includes('sea_level') && legendsColors.sea_level ||
                                    name.includes('wmd') && legendsColors.wmd ||
                                    name.includes('wmp') && legendsColors.wmp ||
                                    name.includes('wsh') && legendsColors.wsh
                                  }
                                  opacity={ 0.3 }
                                  data={fixFormat(props.data[name])}
                                  curve={'curveMonotoneX'}
                                  onNearestX={(value, {index}) => setChartState({...chart, crosshairValues: data.map(d => d[index])})}
                             />
                              ) : (
                              <CustomSVGSeries
                                marginTop={200}
                                marginLeft={30}
                                key={name}
                                data={fixDirection(props.data[name])}
                              />
                            )
                          })
                }
                <Crosshair values={chart.crosshairValues}>
                    {chart.crosshairValues !== undefined && chart.crosshairValues.length > 0 &&
                      <Grid container>
                        <Grid item xs={12}>
                          <Paper style={{ color:"white", background:"rgba(105, 131, 151, 0.80)", padding:"10px", width:"200px"}}>
                            <Typography variant="body2">Time: { moment(chart.crosshairValues[0].x).utc().format('DD/MM/YYYY HH:mm') }</Typography>
                              <Box p={0} my={1} width="100%">
                                {
                                  chart.crosshairValues.map((value, index) => {
                                    const fixed = cslabels[index].includes('wsh') ? 1 : 0
                                    return value && !chart.recordclick[cslabels[index].replace(/mean|area|max|min|station|-/gi, '')].disabled &&
                                      <Typography key={cslabels[index]} variant="body2" style={{fontSize:"0.9rem", padding:"0", margin:"0 0 2px"}}>
                                      {labels.lines[cslabels[index]]}: <span style={{fontSize:"1.1rem"}}>
                                      { cslabels[index].includes("area") ? `±${(value.y - value.y0).toFixed(fixed)}` : value.y.toFixed(fixed) }
                                        {labels.um[cslabels[index].replace(/mean|area|max|min|station|-/gi, '')]}</span>
                                    </Typography>
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
                  items={Object.values(chart.recordclick)}
                  orientation='horizontal'
                  onItemClick={item => {
                    setRecordClick(item.id, !chart.recordclick[item.id].disabled)
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
