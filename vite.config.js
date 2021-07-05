import path from 'path';
// import legacy from './legacy';
import legacy from '@vitejs/plugin-legacy';
// import legacyPlugin from 'vite-plugin-legacy'
const { createVuePlugin } = require('vite-plugin-vue2');

module.exports = {
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'vuex',
      // etc.
    ]
  },
  plugins: [
    legacy({
      "targets": {
        'ie': 9
      },
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      polyfills: [
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.define-setter',
        'es.array.iterator',
        'es.promise',
        'es.object.assign',
        'es.promise.finally'
      ]
    }),
    createVuePlugin()
  ],
  resolve: {
    alias: [{
      find: '~',
      replacement: path.resolve(__dirname, 'src')
    }]
  }
};
