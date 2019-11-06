<br>

<p align="center">
  <img width="280px" src="https://raw.githubusercontent.com/vue-gl-fx/vue-gl-fx/master/src/assets/logo.png" alt="logo" />
</p>
<br>

<p align="center">
  <a href="https://github.com/vue-gl-fx/vue-gl-fx/">
    <img alt="GitHub release" src="https://img.shields.io/github/package-json/v/vue-gl-fx/vue-gl-fx/develop.svg?style=for-the-badge&color=blue"/>
  </a>
  <a href="https://www.npmjs.com/package/vue-gl-fx">
    <img alt="NPM Release" src="https://img.shields.io/npm/v/vue-gl-fx.svg?style=for-the-badge"/>
  </a>
</p>

<br>

<p align="center">
  <b>
    Created and Maintained by
    <a href="http://www.norbz.tech/">Nicolas Chesné</a>
    and 
    <a href="https://laurentgabarre.fr/">Laurent Gabarre</a>
  </b>
</p>

<br>

## Intro

- A simple WebGL components for accelerated 2D filter or effects. Can be used with Shadertoys codes

## Demo
A partially working playground can be found <a href="https://vue-gl-fx.github.io/vue-gl-fx" target="_blank">here</a>

## Disclaimer
> While being already usable, this library is currently under heavy developpment.
> API may be changed at anytime until we switch to a beta version.
> Lock your version if you want to be safe

<br>

## Screenshots

<p align="center">
  <img width="100%" src="https://raw.githubusercontent.com/vue-gl-fx/vue-gl-fx/master/src/assets/screenshot.jpg"/>
</p>

<br>

## Install and Usage

```bash
# install dependices
 `npm install`

# develop
`npm run dev`

# build component
`npm run build`

# build demo
`npm run build:demo`
```

<br>

## Quickstart
First, install vue-gl-fx using either npm or yarn.
> Remember we are still working on this so you should lock your version

```bash
npm i vue-gl-fx --save
```

Instanciate and tell Vue about the plugin

```javascript
import GlFx from 'vue-gl-fx';
Vue.use(GlFx);
```

Then use the components !

```vue
<template>
  <div 
    id="app">
    <gl-fx
      :code="glslCode"
      class="app_shader"
    >
      <gl-fx-time
      v-if="injectShaderToyUniforms"
      name="iTime"/>
      <gl-fx-resolution 
        v-if="injectShaderToyUniforms"
        name="iResolution"/>
    </gl-fx>
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
```

## API

<details><summary><strong>Context</strong></summary>
<br>

<br/>
</details>

<details><summary><strong>Uniforms</strong></summary>
<br>

1.  **`more`**: Boolean  
    **default**: `false`  
    ...

<br/>
</details>

<details><summary><strong>Special Uniforms</strong></summary>
<br>

1.  **`categorize`**: Object  
    ...

<br/>
</details>

<br>

## TODO
- Add toggles for shadertoys functions and uniforms injections (true, false, `auto`)
- Add Video Texture support
- Add resize throttling.
- Add API for play, pause, autoplay like functions
- Allow for external fragmentshader files
- Improve performance
- Handle the garbage collector
- Develop a good sandbox demo

On the future, this library should also :
- Support multipass effects
- support a second module with extra, out of the box ready effects.

## Credits

> Based on an Idea by Nicolas Chesné and a PoC made by Laurent Gabarre.

> Thanks for the team at La Chose for using the library and giving us feedback, and the occasional helping hand.
