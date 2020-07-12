const webpack = require('webpack')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')
const path = require('path')
const dotEnv = require('dotenv-webpack')
const env = require('./config/env')();
const TerserPlugin = require('terser-webpack-plugin');
const withSourceMaps = require('@zeit/next-source-maps')
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  [withSourceMaps],
  [withTypescript],
  [withSass, {
    cssLoaderOptions: {
      url: false
    }
  }],
  [withCSS, {
    cssLoaderOptions: {
      url: false
    }
  }]
], {
  // 빌드 디렉토리 설정
  //distDir: '.next',

  // 웹팩 설정
  webpack: (config, options) => {
    const originalEntry = config.entry
    config.plugins = config.plugins || [];

    // 개발모드인지 여부 true/false
    console.log('is development mod?:', options.dev);

    // 기본 플러그인 어떤것을 로드하는지 확인
    config.plugins.map(data => {
      console.log('config name:', data.constructor.name);
    })

    // 옵션정보 확인
    console.log('isServer:', options);

    // 코드 난독화/압축화
    if (!options.dev && !options.isServer) {
      config.optimization.minimizer = [new TerserPlugin({
        parallel: true,
        sourceMap: true
      })]
    }

    // entry 설정
    config.entry = async () => {
      const entries = await originalEntry()

      // polyfill 설정
      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./config/polyfills.js')
      ) {
        entries['main.js'].unshift('./config/polyfills.js');
      }

      return entries
    }

    // plugin 설정
    config.plugins = [
      ...config.plugins,

      // ENV 변수 설정
      new webpack.DefinePlugin({
        ...env.stringified
      })
    ];

    return config
  }
});
