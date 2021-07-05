module.exports = {
  presets: [
    ['@vue/babel-preset-app', {
      useBuiltIns: 'entry',
      polyfills: [
        'es6.promise'
      ]
    }]
  ]
}
