
require('ignore-styles');
require('url-loader');
require('file-loader');
require('@babel/register')({
  ignore: [ /(node_modules)/ ],
  presets: [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "10"
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    'syntax-dynamic-import',
    'dynamic-import-node',
    '@babel/plugin-proposal-class-properties',
    "babel-plugin-styled-components"
  ]
});
require('./index');