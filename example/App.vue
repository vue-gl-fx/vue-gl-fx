<template>
  <div 
    id="app">
    <gl-fx
      :code="glslCode"
      class="app_shader"
    >
      <gl-fx-uniform 
        :input="0.8"
        type="float"
        name="iFloat"/>
      <gl-fx-uniform 
        :input="color"
        type="vec3"
        name="iColor"/>
      <gl-fx-uniform 
        :input="color"
        type="vec3"
        name="iColor2"/>
      <gl-fx-time 
        :input="color"
        type="vec3"
        name="iTime2"/>
      <gl-fx-uniform 
        :vflip="vflip"
        name="iChannel0"
        type="sampler2D"
        input="http://picsum.photos/256/256/?random&v=1"
        autoplay="true"/>
    </gl-fx>
    <div class="app_control">
      <textarea
        v-model.lazy="glslCode"
        class="app_control-textarea"
        placeholder="insert GLSL code here"/><div class="app_control-notes">
          <p>https://www.shadertoy.com/lib/piLibs.js</p>
          <p>https://www.shadertoy.com/js/effect.js</p>
          <p>Shader Toy Examples:</p>
          <ul>
            <li>https://www.shadertoy.com/new</li>
            <li>https://www.shadertoy.com/view/MdSGDm</li>
            <li>https://www.shadertoy.com/view/llyyRd</li>
            <li>https://www.shadertoy.com/view/4tXGW4</li>
            <li>https://www.shadertoy.com/view/Ms2SD1</li>
            <li>https://www.shadertoy.com/view/4lVyRR</li>
          </ul>
          <p>Don't work:</p>
          <ul>
            <li>https://www.shadertoy.com/view/llyyRd</li>
            <li>https://www.shadertoy.com/view/ltVyRd</li>
            <li>https://www.shadertoy.com/view/Xds3zN</li>
            <li>https://www.shadertoy.com/view/ls2SDD</li>
            <li>https://www.shadertoy.com/view/Xt2yWt</li>
          </ul>
          <p>Todo:</p>
          <ul>
            <li>check delta time</li>
            <li>add Error message</li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>

const DEFAULT_SHADER = `void main() {
  vec2 st = gl_FragCoord.xy / iResolution.xy;
  gl_FragColor = vec4(st.xy, (cos(iTime) + 1.0) * 0.5, 1.0);
}`;

export default {
  name: 'App',
  data() {
    return {
      glslCode: DEFAULT_SHADER,
    };
  },
};
</script>

<style lang="stylus">

html, body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  height: 100vh;
}

.app_shader, .app_control {
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.app_control-textarea {
  font-family: "Lucida Console", Monaco, monospace;
  width: 100%;
  height: 50%;
  border: none;
  border-bottom: 1px solid silver;
  resize: none;
  padding: 10px;
  box-sizing: border-box;
  font-size: small;
  line-height: 1.5;
  &::after {
    display: none;
  }
}

.app_control-notes {
  text-align: left;
  height: 49%;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  font-size: medium;
  * {
    margin: 0;
  }
}
</style>
