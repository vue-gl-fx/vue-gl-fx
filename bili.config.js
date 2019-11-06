module.exports = {
  plugins: {
    vue: true
  },

  postcss: {
    extract: true,
    extensions: ['.css', '.styl']
  },

  output: {
    format: ['cjs', 'es', 'umd'],
    fileName: 'index.[format].js',
    moduleName:"VueGlFx",
    minify: true
  }
}
