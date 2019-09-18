/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useRef, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import makeSelectChart from './selectors';
import reducer from './reducer';
import saga from './saga';
import { requestChart } from "./actions";

import Chart from '../../components/Chart';

import queryString from 'query-string'

const styles = (theme, style) => {
  console.info("themeeeeeeeeeeeeeeeee");
  console.info(theme, style);

  return {
    subNav: {
      position: "relative", 
      zIndex: 10,
      flexGrow: 1,
      backgroundColor: theme.palette.custom.darkBackground,
      color: theme.palette.common.white,
    },
    headerTop: {
      width: "100%",
      backgroundColor: theme.palette.custom.darkBackground,
      textAlign: "right"
    },
    headerTopClose: {
      color: theme.palette.common.white,
      fontSize: 20,
      lineHeight: 1.2,
      padding: 0,
      minWidth: 30,
      height: 20
    },
    wrapper: {
      padding: theme.spacing(2)
    },
  }
};

function StationChart(props) {
  useInjectReducer({ key: 'chart', reducer });
  useInjectSaga({ key: 'chart', saga });
  console.info("Station Chart");
  console.info(props);

  const log = (wrapper) => { 
    console.info(wrapper); 
    return true; 
  };

  const data = [
    {x: 0, y: 8},
    {x: 1, y: 5},
    {x: 2, y: 4},
    {x: 3, y: 9},
    {x: 4, y: 1},
    {x: 5, y: 7},
    {x: 6, y: 6},
    {x: 7, y: 3},
    {x: 8, y: 2},
    {x: 9, y: 0}
  ];

  const close = () => {
    if(typeof props.goTo !== "undefined") {
      props.history.push(props.goTo) 
    } else {
      props.history.push("/") 
    }
  };

  const chartParams = queryString.parse(props.history.location.search)

  useEffect(() => {
    console.log(chartParams)
      if(props.chart.results.length == 0 && !props.chart.loading){
        props.dispatch(requestChart({
          bbox: chartParams.bbox,
          time: chartParams.from
        }))
      }
  }, [])

  return (
    <div className={props.classes.subNav}>
      <div className={props.classes.headerTop}>
        <Button size={"small"} className={props.classes.headerTopClose} onClick={() => close()} >&times;</Button>
      </div>
      <div className={props.classes.wrapper}>
        <h1>Chart</h1>
        <Chart data={data} />
      </div>
      { console.log(props.chart)
        /* <Button onClick={ () => props.dispatch(requestChart()) }>REQ CHART</Button> */}
      
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  chart: makeSelectChart(),
})

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(StationChart));