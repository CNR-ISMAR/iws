/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
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

function NotFound(props) {
  return (
    <main className={props.classes.content}>
      <FormattedMessage {...messages.header} />
    </main>
  );
}

export default withStyles(styles, {withTheme: true})(NotFound);