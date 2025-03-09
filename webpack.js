require('dotenv').config()
const webpack = require('webpack')
const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            // IMPORTANT! Do not put sensitive information here!
            'process': {
                env: {
                    RESOURCES: process.env.RESOURCES,
                    CLIENT_STORE_DEV_TOOLS: JSON.stringify(process.env.CLIENT_STORE_DEV_TOOLS || false),
                }
            },
        })
    ],
    entry: './src/client/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src', 'public')
    },
    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.tsx', '.ts'],
        alias: {
            'Client-Config': path.resolve(__dirname, 'src/client/Config'),
            'Client-Routes': path.resolve(__dirname, 'src/client/Routes'),
            'Client-Store': path.resolve(__dirname, 'src/client/Store'),
            'Client-Utils': path.resolve(__dirname, 'src/client/Utils'),
            'Root-Utils': path.resolve(__dirname, 'src/config'),
            'Root-Config': path.resolve(__dirname, 'src/config'),
        },
        plugins: [
            new ModuleScopePlugin([
                path.resolve(__dirname, 'src/client'),
                path.resolve(__dirname, 'src/config')
            ], [])
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', { runtime: 'automatic' }],
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
        ]
    }
};
