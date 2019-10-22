import Vue from 'vue/dist/vue.esm'
import App from './App'
import Shader from '../src/index'

Vue.component('Shader', Shader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})