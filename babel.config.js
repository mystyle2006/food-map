module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@app': './src',
        },
      },
    ],
    'react-native-worklets/plugin', // Worklets should be at last
  ],
};
