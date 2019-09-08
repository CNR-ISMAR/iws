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
import HeaderBar from "../../components/HeaderBar";
import { StormEventsIcon } from '../../utils/icons';

const styles = (theme, style) => {
  console.info("themeeeeeeeeeeeeeeeee");
  console.info(theme, style);
  return {
    subNav: {
      position: "absolute", 
      top: 0, 
      left: 0, 
      zIndex: 10, 
      width: 250,
      backgroundColor: "rgba(255,255,255,.8)",
      
    },
  }
};

function StormEventsPage(props) {
  return (
    <div className={props.classes.subNav}>
      <HeaderBar title={"Sea storm events"} icon={StormEventsIcon} />
    </div>
  );
}

export default withStyles(styles, {withTheme: true})(StormEventsPage);