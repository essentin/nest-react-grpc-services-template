module.exports = {
  root: true,
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:css-modules/recommended',
  ],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  plugins: ['react', 'css-modules'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  globals: {
    '__DEV__': true,
  },
  rules: {
    'func-names': 0,
    'no-undef': 2,
    'global-require': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 'error',
    'react/sort-comp': 0,
    'react/prop-types': 0,
    'react/no-did-mount-set-state': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true, packageDir: '.' },
    ],
  },
};