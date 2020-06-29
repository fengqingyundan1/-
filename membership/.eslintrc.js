// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion:6,
    sourceType:"module",
  },
  env: {
    browser: true,
    es6:true,
    node:true,
    commonjs: false,
    jquery: false,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  "globals":{
    "document": true,
    "localStorage": true,
    "window": true,
    "weui":true
  },
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": [
      0
    ],
    "jsdoc/check-tag-names": 0,
    "jsdoc/require-param-type": 0,
    "jsdoc/check-param-names": 0,
    "jsdoc/require-param-description": 0,
    "jsdoc/require-returns-type": 0,
    "jsdoc/require-returns-description": 0,
    "arrow-parens": "off",
    "valid-jsdoc": "off",
    "eol-last": "off",
    "array-bracket-spacing": "off",
    "no-unused-vars": "warn",
    "no-else-return": "off",
    "strict": "off",
    "linebreak-style": [
      0,
      "error",
      "windows"
    ],
    "quotes": [
      "warn",
      "single"
    ],
    "camelcase": "warn",
    "no-var": "error",
    "no-extra-semi": "error",
    "no-irregular-whitespace": [
      "error",
      {
        "skipComments": true
      }
    ],
    "comma-dangle": [
      "error",
      {
        "arrays": "only-multiline",
        "objects": "only-multiline"
      }
    ]
  }
}
