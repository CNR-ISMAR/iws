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

import { InfoIcon } from '../../utils/icons';
import SidebarSubNav from 'components/SidebarSubNav';

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

function InfoPage(props) {
  return (
    <>
      <SidebarSubNav
        location={props.location}
        title="Info" 
        icon={InfoIcon} 
        />
    </>
  );
}

export default withStyles(styles, {withTheme: true})(InfoPage);