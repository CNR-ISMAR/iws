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

import Chart from '../../components/Chart';

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

  return (
    <div className={props.classes.subNav}>
      <div className={props.classes.headerTop}>
        <Button size={"small"} className={props.classes.headerTopClose} onClick={() => close()} >&times;</Button>
      </div>
      <div className={props.classes.wrapper}>
        <h1>Chart</h1>
        <Chart data={data} />
      </div>
    </div>
  );
}

export default withStyles(styles, {withTheme: true})(StationChart);