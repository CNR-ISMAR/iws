/* eslint consistent-return:0 import/order:0 */

const environment = {
  ...process.env,
  ...require('dotenv').config({path: __dirname + '/../.env'}).parsed
};

// console.log(process.env)

const express = require('express');
const logger = require('./logger');
const proxy = require('express-http-proxy');

const argv = require('./argv');
// const port = require('./port');
const port = parseInt(argv.port || environment.PORT || '3000', 10);
const setup = require('./middlewares/frontendMiddleware');
const isDev = environment.NODE_ENV !== 'production';
const ngrok =
  (isDev && environment.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();
// const proxyHost = 'https://iws.ismar.cnr.it';
// const proxyHost = environment.THREDDS_TO_PROXY;
const proxyHost = environment.THREDDS_TO_PROXY;
// const proxyHostApi = environment.API_URL_TO_PROXY;
const proxyHostApi = environment.API_URL;
// const proxyUrl = 'https://iws.ismar.cnr.it/thredds';
console.log('proxyHost');
console.log(proxyHost);
app.use('/thredds', proxy(proxyHost, {
  proxyReqOptDecorator(opts) {
    if ('origin' in opts.headers)
      delete opts.headers['origin'];
    if ('Referer' in opts.headers)
      delete opts.headers['Referer'];
    if ('referer' in opts.headers)
      delete opts.headers['referer'];
    if ('x-powered-by' in opts.headers)
      delete opts.headers['x-powered-by'];
    // console.log(opts)
    return opts;
  },
  proxyReqPathResolver: function (req) {
    return req.url.replace('/wms/', '/thredds/wms/');
  }
}));

/*
name: wawes / sea_level_avg sea_level_std
timestamp: timestamp hourly
format: json / png
 */
/*
http://localhost:3000/layer/sea_level_avg/154433232312/json
 */
app.get('/layer/:name/:timestamp/:format', (req, res) => {
  return res.send(req.params);
});

app.use('/api', proxy(proxyHostApi, {
  proxyReqOptDecorator(opts) {
    if ('origin' in opts.headers)
      delete opts.headers['origin'];
    if ('x-powered-by' in opts.headers)
      delete opts.headers['x-powered-by'];
    // console.log(opts)
    return opts;
  },
  proxyReqPathResolver: function (req) {
    return req.url;//.replace('/wms/', '/thredds/wms/');
  }
}));

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || environment.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
