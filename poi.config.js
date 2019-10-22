const path = require('path')

module.exports = {
  chainWebpack(config, context) { //eslint-disable-line no-unused-vars
    config
      .entry('index')
      .add('./example/index.js')
      .end()
      .output.path(path.resolve(process.cwd(), './demo'))
  }
}
