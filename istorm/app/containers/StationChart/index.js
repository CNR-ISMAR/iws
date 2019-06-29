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

const styles = (theme, style) => {
  console.info("themeeeeeeeeeeeeeeeee");
  console.info(theme, style);
  return {
    subNav: {
      position: "relative", 
      //top: 0, 
      //left: 250, 
      zIndex: 10, 
      //width: 250,
      //float: "left",
      display: "inline-block",
      padding: 0,
      margin: 0,
      backgroundColor: theme.palette.custom.darkBackground,
      color: theme.palette.common.white,
    },
    listItem: {
      color: theme.palette.custom.contrastText,
      "&.Mui-selected": {
        color: theme.palette.custom.contrastTextSelected
      }
    },
    divider: {
      backgroundColor: theme.palette.custom.contrastText,
      fontSize: 22
    }
  }
};

function StationChart(props) {
  return (
    <div className={props.classes.subNav}>
      <h1>Chart</h1>
    </div>
  );
}

export default withStyles(styles, {withTheme: true})(StationChart);