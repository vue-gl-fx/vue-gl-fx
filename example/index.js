import Vue from 'vue'
import App from './App'
import VueGlFx from '../src/index';

Vue.use(VueGlFx)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})