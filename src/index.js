import GlFx from './components/GlFx.vue'
import GlFxUniform from './components/uniforms/GlFxUniform.vue'
import GlFxResolution from './components/uniforms/GlFxResolution.vue'
import GlFxTime from './components/uniforms/GlFxTime.vue'
import GlFxFrame from './components/uniforms/GlFxFrame.vue'
import GlFxMouse from './components/uniforms/GlFxMouse.vue'

const VueGlFx = {

}
VueGlFx.install = function (Vue) {
    Vue.component('gl-fx', GlFx)
    Vue.component('gl-fx-uniform', GlFxUniform)
    Vue.component('gl-fx-resolution', GlFxResolution)
    Vue.component('gl-fx-time', GlFxTime)
    Vue.component('gl-fx-frame', GlFxFrame)
    Vue.component('gl-fx-mouse', GlFxMouse)
}

export default VueGlFx;