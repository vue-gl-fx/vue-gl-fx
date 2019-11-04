<template>
  <canvas
    v-if="webglAvailable"
    ref="canvas"
    class="vue-shader"
    style="background-color:black"
  >
    <slot/>
    <gl-fx-time
      v-if="injectShaderToyUniforms"
      name="iTime"/>
    <gl-fx-time 
      v-if="injectShaderToyUniforms"
      :is-delta="true"
      name="iTimeDelta"/>
    <gl-fx-frame 
      v-if="injectShaderToyUniforms"
      name="iFrame"/>
    <gl-fx-resolution 
      v-if="injectShaderToyUniforms"
      name="iResolution"/>
  </canvas>
  <p v-else>WebGL not available on this device</p>
</template>

<script>
import ContextManager from './ContextManager';

export default {
  name: 'GlFx',
  props: {
    isShaderToy: {
      type: Boolean,
      default: true
    },
    code: { type: String, default: null },
  },
  data() {
    return {
      webglAvailable: true,
      injectShaderToyUniforms: true,
      uniforms: []
    };
  },
  watch: {
    code(value) {
      this.context.setFragmentShader(value);
      this.draw();
    },
  },
  created() {
    
  },
  async mounted() {
    const { canvas } = this.$refs;
    try {
      this.context = new ContextManager(canvas);
    } catch (error) {
      console.error(error)
      this.$emit('noWebGL');
      this.webglAvailable = false;
      return;
    }
    
    this.uniforms.forEach((uniform) => {
      uniform.$on("ready", this.onUniformReady)
    })

    this.onUniformReady()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    cancelAnimationFrame(this.rafId);
    this.context.destroy();
  },
  methods: {
    resize() {
      const { canvas } = this.$refs;
      this.context.setSize(canvas.offsetWidth, canvas.offsetHeight);
    },
    onUniformReady(){
      let allready = true;
      this.uniforms.forEach((uni)=>{
        allready = allready & uni.ready;
      })

      if(allready){
        this.start()
      }
    },
    start(){
      try {
        this.context.setUniforms(this.uniforms);
        //this.renderer.imgs = imgs;
        this.context.setFragmentShader(this.code);
        window.addEventListener('resize', this.resize);
        this.resize();
        this.draw();
      } catch(err){
        console.error(err)
      }
    },
    draw() {
      this.context.draw();
      this.rafId = requestAnimationFrame(this.draw);
    },
    registerUniform(uni){
      this.uniforms.push(uni);
    }
  },
};
</script>
