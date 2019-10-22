module.exports = {
  root: true,
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended"
  ],
  env: {
    node: true
  },
  // required to lint *.vue files
  //plugins: ['vue'],
  parserOptions: {
    "parser": "babel-eslint"
  },
  // add your custom rules here
  rules: {
    // allow async-await
    'space-before-function-paren': 'off',
    'generator-star-spacing': 'off',
    'no-undef': 'off'
  }
}
