const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
        ],
    },
    resolve: {
        roots: [path.resolve('./')],
        extensions: ['.tsx', '.ts', '.js', '.json'],
        plugins: [new TsconfigPathsPlugin()],
    },
    target: 'node',
    externals: [require('webpack-node-externals')()],
}