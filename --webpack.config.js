module.exports = {
    entry: './app/index.js',
    module: {
        rules: []
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server_bundle.js'
    },
    mode: 'production'
}