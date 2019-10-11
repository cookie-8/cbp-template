const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const { getIP } = require('../config/utils')

const pathConfig = require('../config/paths')

const processNodeEnv = process.env.NODE_ENV
const processArgv = process.argv

const startDev = processArgv.indexOf('--dev') > -1

const buildProd = processArgv.toString().indexOf('prod') > -1
const buildDev = processArgv.toString().indexOf('dev') > -1

const isEnvDevelopment = processNodeEnv === 'development'
const isEnvProduction = processNodeEnv === 'production'

module.exports = function(publicPath) {
    return {
        entry: pathConfig.appIndex,

        mode: processNodeEnv,

        optimization: {
            minimize: isEnvProduction,
            splitChunks: {
                chunks: 'all',
                name: 'utils',
            },
        },

        output: {
            path: pathConfig.appDist,
            filename: 'js/[name].js',
            chunkFilename: `js/[name].js?v=${+new Date()}`,
            publicPath: isEnvProduction ? publicPath  : `//${getIP()}:${pathConfig.appDevPort}/`
        },

        devtool: isEnvDevelopment || buildDev ? 'source-map' : 'none',

        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    enforce: 'pre',
                    include: [pathConfig.appSrc],
                    options: {
                        formatter: require('eslint-friendly-formatter'),
                    },
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                {
                    test: /\.(ts|tsx)?$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !buildProd,
                                modules: false,
                                localIdentName: buildProd ? '[hash:base64:5]' : '[local]',
                            },
                        },
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                name: 'assets/[name].[hash:6].[ext]',
                            },
                        },
                    ],
                },
            ],
        },

        resolve: {
            extensions: ['.js', '.jsx', '.tsx', '.ts'],
            modules: [pathConfig.appSrc, pathConfig.appNodeModules],
            alias: {
                '@': pathConfig.appSrc,
            },
        },

        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),

            new HtmlWebpackPlugin({
                template: pathConfig.appHtml,
                inject: true,
            }),

            new MiniCssExtractPlugin({
                filename: `css/[name].css?v=${+new Date()}`,
            }),

            isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),

            new CleanWebpackPlugin(),

            isEnvProduction &&
                new copyWebpackPlugin([
                    {
                        from: 'static/*',
                        to: './',
                    },
                ]),
        ].filter(Boolean),
    }
}
