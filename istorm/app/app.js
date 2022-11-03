/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import "outdated-browser-rework/dist/style.css";
import outdatedBrowserRework from "outdated-browser-rework";

outdatedBrowserRework({
	browserSupport: {
		'Chrome': 57, // Includes Chrome for mobile devices
		'Edge': 39,
		'Safari': 10,
		'Mobile Safari': 10,
		'Firefox': 50,
		'Opera': 50,
		'Vivaldi': 1,
		// You could specify minor version too for those browsers that need it.
		'Yandex': 10,
		// You could specify a version here if you still support IE in 2017.
		// You could also instead seriously consider what you're doing with your time and budget
		'IE': false
	},
	requireChromeOnAndroid: false,
	isUnknownBrowserOK: true, 
	messages: {
    it: {
			outOfDate: "Spiacenti ma il tuo browser è troppo vecchio",
			unsupported: "Spiacenti ma il tuo browser non è supportato!",
			update: {
				web: "Per utilizzare il servizio hai bisogno di un browser aggiornato",
				googlePlay: "aggiorna Chrome da Google Play",
				appStore: "aggiorna ios dalle impostazioni"
			},
			// You can set the URL to null if you do not want a clickable link or provide
			// your own markup in the `update.web` message.
			url: "https://bestvpn.org/outdatedbrowser/it",
			callToAction: "Vai alla pagina dei download",
			close: "Chiudi"
		},
		en: {
			outOfDate: "Spiacenti ma il tuo browser è troppo vecchio",
			unsupported: "Spiacenti ma il tuo browser non è supportato!",
			update: {
				web: "Per utilizzare il servizio hai bisogno di un browser aggiornato",
				googlePlay: "aggiorna Chrome da Google Play",
				appStore: "aggiorna ios dalle impostazioni"
			},
			// You can set the URL to null if you do not want a clickable link or provide
			// your own markup in the `update.web` message.
			url: "https://bestvpn.org/outdatedbrowser/en",
			callToAction: "Vai alla pagina dei download",
			close: "Chiudi"
		}
	}
})

import history from 'utils/history';
import 'sanitize.css/sanitize.css';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';
import AuthProvider from 'containers/AuthProvider';

import { SnackbarProvider } from 'notistack';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import { initializeReactGA } from './ga';
import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';
// import { ThemeProvider } from '@material-ui/styles';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');
// import theme from './theme';

const render = messages => {
  initializeReactGA(history);
  ReactDOM.render(
    <Provider store={store.store}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
	  	<LanguageProvider messages={messages}>
		<ConnectedRouter history={history}>
		{/*<ThemeProvider theme={theme}>*/}
			<AuthProvider>
			<App />
			</AuthProvider>
		{/*</ThemeProvider>*/}
		</ConnectedRouter>
		</LanguageProvider>
	</MuiPickersUtilsProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
