const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const webpack = require('webpack');

const {
    packageName,
    homepage
} = require('./package.json');

const getBuildPath = () => path.resolve(__dirname, 'build');
const getEslintFile = () => path.resolve(__dirname, '.eslintrc.json');

module.exports = (env, argv) => ({
    target: 'web',
    output: {
        path: getBuildPath(),
        filename: `${packageName}.js`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                options: {
                    configFile: getEslintFile(),
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.json$/i,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    'image-webpack-loader',
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin([
            getBuildPath()
        ], {
            root: process.cwd()
        }),
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            inject: true,
        }),
        new CopyWebpackPlugin([{
            from: 'public/images',
            to: getBuildPath() + '/images',
        }, {
            from: 'public/manifest.json',
            to: getBuildPath(),
        }, {
            from: 'public/favicon.ico',
            to: getBuildPath(),
        }]),
        new webpack.EnvironmentPlugin({
            PUBLIC_URL: homepage,
        }),
        new SWPrecacheWebpackPlugin({
            // By default, a cache-busting query parameter is appended to requests
            // used to populate the caches, to ensure the responses are fresh.
            // If a URL is already hashed by Webpack, then there is no concern
            // about it being stale, and the cache-busting can be skipped.
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            logger(message) {
                if (message.indexOf('Total precache size is') === 0) {
                    // This message occurs for every build and is a bit too noisy.
                    return;
                }
                if (message.indexOf('Skipping static resource') === 0) {
                    // This message obscures real errors so we ignore it.
                    // https://github.com/facebook/create-react-app/issues/2612
                    return;
                }
                console.log(message);
            },
            minify: true,
            // Don't precache sourcemaps (they're large) and build asset manifest:
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
            // `navigateFallback` and `navigateFallbackWhitelist` are disabled by default; see
            // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#service-worker-considerations
            // navigateFallback: publicUrl + '/index.html',
            // navigateFallbackWhitelist: [/^(?!\/__).*/],
        }),
    ],
});
