module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "consistent-return": 0,
    "no-restricted-syntax":0,
    "guard-for-in":0,
    "omitLastInOneLineBlock": 0,
    "no-underscore-dangle": 0,
    "comma-dangle": 0,
    "semi": 0,
    "no-underscore-dangle": 0,
    "arrow-parens": 0
  },
};
