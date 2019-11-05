module.exports = {
  plugins: {
    vue: true
  },

  postcss: {
    extract: true,
    extensions: ['.css', '.styl']
  },

  output: {
    format: ['umd', 'es'],
    fileName: 'index.[format].js',
    moduleName:"VueGlFx",
    minify: true
  }
}
