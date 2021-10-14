module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ts',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@core': './src/core/',
            '@data': './src/data/',
            '@domain': './src/domain/',
            '@infra': './src/infra/',
            '@presentation': './src/presentation/',
            '@main': './src/main/',
          },
        },
      ],
      'react-native-reanimated/plugin'
    ],
  };
};
