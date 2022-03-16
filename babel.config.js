module.exports = api => {
    api.cache.using(() => process.env.NODE_ENV);

    const presets = [
        ['@babel/preset-env', { "loose": true }],
        ['@babel/preset-react', { "loose": true }],
        ['@babel/preset-typescript', { "loose": true }],
        'mobx'
    ];

    const plugins = [
        ['@babel/plugin-proposal-optional-chaining', { "loose": true }],
        process.env.NODE_ENV === 'development' && 'react-refresh/babel'
    ].filter(Boolean);

    return {
        presets,
        plugins
    }
}