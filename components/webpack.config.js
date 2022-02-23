const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    //devtool: "source-map",
    entry: {
        index: [
            path.resolve(__dirname, "./src/index.sass"),
            path.resolve(__dirname, "./src/index.ts"),
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".sass"],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: "tsconfig.json",
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
};
