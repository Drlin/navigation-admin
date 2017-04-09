module.exports = function (webpackConfig, env) {
  webpackConfig.babel.babelrc = false;
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: 'css'  // if true, use less
  }]);
  webpackConfig.devServer = {
    historyApiFallback: true,
    port:8000,
    hot: true,
    inline: true,
    host:'0.0.0.0',
    proxy: {
     '/api/*': {
         changeOrigin: true,
         target: 'http://www.drrlin.com',
         secure: false,
     }
   }
  }
  // Enable hmr for development.
  if (env === 'development') {
    webpackConfig.babel.plugins.push('dva-hmr');
  }

  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach(function (loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.test = /\.dont\.exist\.file/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.test = /\.less$/;
    }
  });

  return webpackConfig;
};
