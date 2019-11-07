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
    <gl-fx-mouse
      v-if="injectShaderToyUniforms"
      name="iMouse"/>
  </canvas>
  <p v-else>WebGL not available on this device</p>
</template>

<script>
import ContextManager from './ContextManager';

export default {
  name: 'GlFx',
  props: {
    isShaderToy: {
      type: [Boolean],
      default: true
    },
    injectShaderToyUniforms: {
      type: [Boolean],
      default: true
    },
    code: { type: String, default: null },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      webglAvailable: true,
      uniforms: []
    };
  },
  watch: {
    code(value) {
      this.context.setFragmentShader(value);
      this.draw();
    },
    autoplay(to){
      if(to){
        this.context.setCurrentTime();
        this.draw()
      }
    }
  },
  created() {
    this.destroyed = false
  },
  async mounted() {
    const { canvas } = this.$refs;
    try {
      this.context = new ContextManager(canvas);
    } catch (error) {
      console.error(error) //eslint-disable-line no-console
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
    this.destroyed = true
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
        this.$emit("started")
      } catch(err){
        console.error(err) //eslint-disable-line no-console
      }
    },
    draw() {
      if(!this.destroyed){
        this.context.draw();
        if(this.autoplay){
          this.rafId = requestAnimationFrame(this.draw);
        }
      }
    },
    registerUniform(uni){
      this.uniforms.push(uni);
    }
  },
};
</script>
