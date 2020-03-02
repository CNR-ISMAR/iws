/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useRef, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import moment from "moment";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import makeSelectHistoryPage from '../History/selectors';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import makeSelectChart from './selectors';
import reducer from './reducer';
import saga from './saga';
import { requestChart } from "./actions";

import Fade from '@material-ui/core/Fade';

import Chart from '../../components/Chart';

import queryString from 'query-string'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const styles = (theme, style) => {
  // console.info("themeeeeeeeeeeeeeeeee");
  // console.info(theme, style);
  return {
    subNav: {
      position: "absolute",
      // paddingBottom: 150,
      width: '100%',
      zIndex: 1600,
      flexGrow: 1,
      backgroundColor: theme.palette.custom.backgroundOverlay,
      color: theme.palette.common.white,
      border: "1px solid",
      borderColor:theme.palette.custom.contrastText
    },
    headerTop: {
      width: "100%",
      textAlign: "right"
    },
    headerTopClose: {
      color: theme.palette.common.white,
      fontSize: 20,
      lineHeight: 1.2,
      // padding: 0,
      minWidth: 30,
      // height: 20
      color:theme.palette.custom.contrastText,
      "&:hover": {
        background: "transparent",
        color:theme.palette.custom.contrastTextSelected,
      }
    },
    wrapper: {
      padding: theme.spacing(2)
    },
  }
};

function StationChart(props) {
  useInjectReducer({ key: 'chart', reducer });
  useInjectSaga({ key: 'chart', saga });
  const [fadeIn, setFadeIn] = useState(false);
  // console.info("Station Chart");
  // console.info(props);

  const log = (wrapper) => {
    // console.info(wrapper);
    return true;
  };

  const fadeTime = 500
  const close = () => {
   setFadeIn(false)
   setTimeout(() => {
    if(typeof props.goTo !== "undefined") {
        props.history.push(props.goTo)
      } else {
        props.history.push("/")
      }
    }, fadeTime)

  };

  const chartParams = queryString.parse(props.history.location.search)

  useEffect(() => {
    /* console.log('chartParams')
    console.log(chartParams)
    console.log(props) */
    !fadeIn ? setFadeIn(true) : null
    if(!props.chart.loading){
      props.dispatch(requestChart({
        bbox: chartParams.bbox,
        from: chartParams.from,
        to: chartParams.to,
        station: chartParams.station,
      }))
    }
  }, [])

  return (
    <Fade in={fadeIn} out={!fadeIn} timeout={fadeTime}>
    <div className={props.classes.subNav}>
      <div className={props.classes.headerTop}>
        <Button size={"small"} className={props.classes.headerTopClose} onClick={() => close()} ><HighlightOffIcon/></Button>
      </div>
      <div className={props.classes.wrapper}>
        <Chart
          data={props.chart.results.results}
          station_name={props.chart.results.station_name}
          latitude={props.chart.results.latitude}
          longitude={props.chart.results.longitude}
          timeFrom={moment(props.timeline.from).format( 'DD/MM/YYYY')}
          timeTo={moment(props.timeline.max).format( 'DD/MM/YYYY')}
        />
      </div>
    </div>
    </Fade>
  );
}

const mapStateToProps = createStructuredSelector({
  chart: makeSelectChart(),
  timeline: makeSelectHistoryPage(),
})

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(StationChart));
