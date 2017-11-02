// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');
const isDebug = !process.argv.includes('--release');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  PUBLIC: path.resolve(__dirname, 'public'),
};

// Webpack configuration
module.exports = {
  //entry: path.join(paths.SRC, 'index.js'),
  entry: {
    client: ['babel-polyfill', path.join(paths.SRC, 'index.js')],
  },
  output: {
    path: paths.DIST,
    //filename: 'index.bundle.js',
    filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDebug
    ? '[name].chunk.js'
    : '[name].[chunkhash:8].chunk.js',
  // Point sourcemap entries to original disk location (format as URL on Windows)
  devtoolModuleFilenameTemplate: info =>
    path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },

  // Tell webpack to use html plugin
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(paths.PUBLIC, 'index.html'),
      favicon: 'public/favicon.ico',
      manifest: 'public/manifist.json',
      minify: {
        minifyCSS: true,
      },
    }),
    new ExtractTextPlugin('style.bundle.css'), // CSS will be extracted to this bundle file,
    new InterpolateHtmlPlugin({
      PUBLIC_URL: '/'
      // You can pass any key-value pairs, this was just an example.
      // WHATEVER: 42 will replace %WHATEVER% with 42 in index.html.
    }),
  ],
  // Loaders configuration
  // We are telling webpack to use "babel-loader" for .js and .jsx files
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      // CSS loader for CSS files
      // Files will get handled by css loader and then passed to the extract text plugin
      // which will write it to the file we defined above
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      },
      // File loader for image assets -> ADDED IN THIS STEP
      // We'll add only image extensions, but you can things like svgs, fonts and videos
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      // Compile Less to CSS
          // https://github.com/webpack-contrib/less-loader
          // Install dependencies before uncommenting: yarn add --dev less-loader less
          {
            test: /\.less$/,
            loader: 'less-loader',
          },

          // Compile Sass to CSS
          // https://github.com/webpack-contrib/sass-loader
          // Install dependencies before uncommenting: yarn add --dev sass-loader node-sass
          {
            test: /\.(scss|sass)$/,
            loader: 'sass-loader',
          },
          {
            test: /\.svg$/,
            loader: 'svg-url-loader',
            options: {
              name: '[hash:8].[ext]',
              limit: 4096, // 4kb
            },
          },
          {
            test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, 
            loader: "url-loader" 
          },
          {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
            loader: 'url-loader',
          },
          {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
            loader: "file-loader" 
          },
    ],
  },
  // Enable importing JS files without specifying their's extenstion
  //
  // So we can write:
  // import MyComponent from './my-component';
  //
  // Instead of:
  // import MyComponent from './my-component.jsx';
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', 'src'],
  },
  devtool: isDebug ? 'cheap-module-inline-source-map' : 'source-map',
};