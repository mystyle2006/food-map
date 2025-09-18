module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@app': './src',
          'tailwind.config': './tailwind.config.js',
        },
      },
    ],
    'react-native-worklets/plugin', // Worklets should be at last
  ],
};
