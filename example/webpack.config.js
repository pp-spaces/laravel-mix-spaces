const webpack = require('webpack');
const path = require('path');

/**
 * Workbox configuration
 */
const WorkboxWebpackPlugin = require('./workbox.config');

/**
 * Export Webpack Config
 */
module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json', '.graphql', '.gql'],
        alias: {
            vue$: 'vue/dist/vue.common.js',
            '@': `${__dirname}/resources/js`,
        },
    },
    output: {
        chunkFilename: 'js/[name].[hash:5].js',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                exclude: /node_modules|vendor/,
                loader: 'eslint-loader',
            },
        ],
    },
    plugins: [
        // Register Workbox Webpack Plugin
        ...WorkboxWebpackPlugin,

        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    configFile: path.join(__dirname, '.eslintrc'),
                },
            },
        }),
    ],
};
