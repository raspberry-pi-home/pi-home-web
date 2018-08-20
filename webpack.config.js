const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin');

const getWorkspaceName = () => {
    const {name} = require('./package.json');

    return name;
};
const workspaceName = getWorkspaceName();
const getBuildPath = () => path.resolve(__dirname, 'build');
const getEslintFile = () => path.resolve(__dirname, '.eslintrc.json');

module.exports = (env, argv) => ({
    target: 'web',
    output: {
        path: getBuildPath(),
        filename: `${workspaceName}.js`,
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
    ],
});
