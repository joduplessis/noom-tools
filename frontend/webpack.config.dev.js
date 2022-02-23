const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env) => {
    return {
        mode: 'development',
        entry: {
            index: path.resolve(__dirname, './src/index.ts'),
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.sass'],
            alias: {
                react: path.resolve('./node_modules/react'),
            },
        },
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'bundle.[name].[contenthash].js',
            publicPath: '/',
            chunkFilename: 'bundle.[name].[contenthash].js',
        },
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.html'),
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[id].[contenthash].css',
            }),
            new webpack.NormalModuleReplacementPlugin(/src\/js\/environment\.ts/, './environment.dev.ts'),
            new CopyPlugin({
                patterns: [{ from: 'src/assets', to: '' }],
            }),
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                    },
                },
            },
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'public'),
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.sass$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.(tsx|ts)?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: 'tsconfig.json',
                            },
                        },
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.(tsx|ts)$/,
                    enforce: 'pre',
                    use: [
                        {
                            loader: 'tslint-loader',
                            options: {
                                tsConfigFile: 'tsconfig.json',
                            },
                        },
                    ],
                },
            ],
        },
    }
}
