module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['@react-native', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    // Show error when file extension is added (extensions list below are allowed)
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        cjs: 'never',
        mjs: 'never',
        json: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        // Automatically recognize these extensions
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.cjs',
          '.mjs',
          '.json',
          '.d.ts',
        ],
      },
    },
  },
};
