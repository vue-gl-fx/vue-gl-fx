module.exports = {
  plugins: [
    'vue',
  ],

  postcss: {
    extract: true,
    extensions: ['.css', '.styl']
  },

  format: ['cjs', 'umd', 'es'],
  filename: 'index[suffix].js'
}
