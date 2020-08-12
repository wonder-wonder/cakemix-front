module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'new-cap': 0,
  },
}
