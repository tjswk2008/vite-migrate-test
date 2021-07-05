const { createVuePlugin } = require('vite-plugin-vue2');

module.exports = {
  plugins: [createVuePlugin()],
  alias: {
    '~': resolve(__dirname, 'src')
  }
};