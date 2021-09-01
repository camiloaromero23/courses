module.exports = {
  root: true,
  env: {
    // browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  plugins: ['vue'],
  rules: {},
};
