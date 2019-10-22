<template>
  <canvas
    v-if="webglAvailable"
    ref="canvas"
    class="vue-shader"
    style="background-color:black"
  >
    <slot/>
  </canvas>
  <p v-else>WebGL not available on this device</p>
</template>

<script>
import Renderer from './Renderer';

export default {
  name: 'Shader',
  props: {
    code: { type: String, default: null },
  },
  data() {
    return {
      webglAvailable: true,
    };
  },
  watch: {
    code(value) {
      this.renderer.setFragmentShader(value);
      this.draw();
    },
  },
  async mounted() {
    const { canvas } = this.$refs;
    try {
      this.renderer = new Renderer(canvas);
    } catch (error) {
      this.$emit('noWebGL');
      this.webglAvailable = false;
      return;
    }
    const slots = this.$slots.default;
    if (slots) {
      const imageNodeFilter = node => node.elm instanceof Image;
      const getImgPath = node => node.elm.src;
      const loadPic = path => new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'undefined';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = path;
      });
      const loadNodeImagePath = node => loadPic(getImgPath(node));
      const imgs = await Promise.all(slots.filter(imageNodeFilter).map(loadNodeImagePath));
      this.renderer.imgs = imgs;
    }
    this.renderer.setFragmentShader(this.code);
    window.addEventListener('resize', this.resize);
    this.resize();
    this.draw();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    cancelAnimationFrame(this.rafId);
    this.renderer.destroy();
  },
  methods: {
    resize() {
      const { canvas } = this.$refs;
      this.renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    },
    draw() {
      this.renderer.draw();
      this.rafId = requestAnimationFrame(this.draw);
    },
  },
};
</script>
