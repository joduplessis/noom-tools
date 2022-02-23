const path = require('path');

module.exports = {
    stories: ["../src/**/*.stories.@(ts|tsx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    webpackFinal: async (config, { configType }) => {
        config.module.rules.push({
          test: /\.sass$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: path.resolve(__dirname, '../'),
        });
    
        return config;
    },
}
