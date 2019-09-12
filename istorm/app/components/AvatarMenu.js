/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';

import { withStyles } from '@material-ui/styles';
import { Typography, Avatar } from '@material-ui/core';

const styles = (theme) => {
  return {
    avatar: {
      width: 30,
      height: 30
    },
    avatarText: {
      flexGrow: 1,
      paddingLeft: theme.spacing(1.6),
      lineHeight: 2.4,
      fontSize: 14,
      display: "inline-block",
      color: theme.palette.custom.contrastText
    }
  }
};

function AvatarMenu(props) {
  console.info("avatarMenu")
  console.info(props);
  const username = props.auth.user.username
  return (
    <>
        <Avatar className={props.classes.avatar}>{username.charAt(0).toUpperCase()}</Avatar> 
        <Typography variant="subtitle1" className={props.classes.avatarText}>{props.auth.user.username}</Typography>
    </>
  );
}

export default withStyles(styles, {withTheme: true})(AvatarMenu);
