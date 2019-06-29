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
import { FavoriteIcon } from '../../utils/icons';

const styles = (theme, style) => {
  console.info("themeeeeeeeeeeeeeeeee");
  console.info(theme, style);
  return {
    subNav: {
      position: "relative", 
      //top: 0, 
      //left: 0, 
      zIndex: 10, 
      width: 250,
      padding:0,
      marginRight: 4,
      display: "inline-block",
      backgroundColor: theme.palette.custom.mapOverlayBackground,
      
    },
  }
};

function FavouritesPage(props) {
  return (
    <div className={props.classes.subNav}>
      <HeaderBar title={"Favourites"} icon={FavoriteIcon} primaryColor={props.theme.palette.custom.favoriteIcon} />
    </div>
  );
}

export default withStyles(styles, {withTheme: true})(FavouritesPage);