import Vue from 'vue'
import App from './App'
import {GlFx, GlFxUniform, GlFxResolution, GlFxTime, GlFxFrame} from '../src/index'

 Vue.component('gl-fx', GlFx)
 Vue.component('gl-fx-uniform', GlFxUniform)
 Vue.component('gl-fx-resolution', GlFxResolution)
 Vue.component('gl-fx-time', GlFxTime)
 Vue.component('gl-fx-frame', GlFxFrame)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})