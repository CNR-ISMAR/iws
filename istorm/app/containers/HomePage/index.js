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

const styles = (theme) => {
  return {
    content: {
      position: "relative",
      flexGrow: 1,
      width: "100%",
      padding: 0,
      marginTop: 64
    },
  }
};

function HomePage({auth}) {
  return (
    <main className={props.classes.content}>
      <FormattedMessage {...messages.header} />
    </main>
  );
}

export default withStyles(styles, {withTheme: true})(HomePage);