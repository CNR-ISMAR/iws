const path = require('path');
const util = require('util');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const { createFsFromVolume, Volume } = require("memfs");

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    // logLevel: 'warn',
    publicPath,
    // silent: true,
    stats: 'errors-only',
  });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createWebpackMiddleware(
    compiler,
    webpackConfig.output.publicPath,
  );

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead

const fs = createFsFromVolume(new Volume());
fs.join = path.join.bind(path);
const readFile = util.promisify(fs.readFile);

app.get("*", async (req, res) => {
  try {
    const file = await readFile(path.join(compiler.outputPath, "index.html"));
    res.send(file.toString());
  } catch (error) {
    res.sendStatus(404);
  }
});
};
