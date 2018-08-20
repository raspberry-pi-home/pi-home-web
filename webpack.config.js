const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const {
    homepage,
    name: packageName
} = require('./package.json');

const getBuildPath = () => path.resolve(__dirname, 'build');
const getEslintFile = () => path.resolve(__dirname, '.eslintrc.json');
const getPublicPath = (mode) => {
    if (mode === 'production') {
        return homepage;
    }
    return '/';
}

module.exports = (env, argv) => ({
    target: 'web',
    output: {
        path: getBuildPath(),
        filename: `${packageName}.js`,
        publicPath: getPublicPath(argv.mode),
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
        new SWPrecacheWebpackPlugin({
            cacheId: packageName,
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
            navigateFallback: getPublicPath(argv.mode) + 'index.html',
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
    ],
});
