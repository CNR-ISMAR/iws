/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
        <iframe src="https://play.grafana.org/d-solo/000000012/grafana-play-home?orgId=1&from=1561762631610&to=1561769831611&theme=dark&panelId=4" width="100%" height="40%" frameborder="0"></iframe>
        <h6></h6>
        <iframe src="https://play.grafana.org/d-solo/000000012/grafana-play-home?orgId=1&from=1561762631610&to=1561769831611&theme=dark&panelId=4" width="100%" height="40%" frameborder="0"></iframe>
      </div>
    </div>
  );
}

export default withStyles(styles, {withTheme: true})(StationChart);