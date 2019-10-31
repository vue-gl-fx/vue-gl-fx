import Vue from 'vue'
import App from './App'
import {GlFx, GlFxUniform, GlFxResolution} from '../src/index'

 Vue.component('gl-fx', GlFx)
 Vue.component('gl-fx-uniform', GlFxUniform)
 Vue.component('gl-fx-resolution', GlFxResolution)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})