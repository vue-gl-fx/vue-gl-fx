<br>

<p align="center">
  <img width="280px" src="https://raw.githubusercontent.com/vue-gl-fx/vue-gl-fx/master/src/assets/logo.png" alt="logo" />
</p>
<br>

<p align="center">
  <a href="https://github.com/vue-gl-fx/vue-gl-fx/">
    <img alt="GitHub release" src="https://img.shields.io/github/package-json/v/vue-gl-fx/vue-gl-fx.svg?style=for-the-badge&color=blue"/>
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

# vue-gl-fx

vue-gl-fx is a simple WebGL components for accelerated 2D filter or effects. Can be used with Shadertoys codes

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
    <gl-fx :code="glslCode" class="app_shader">
      <gl-fx-time name="iTime"/>
      <gl-fx-resolution name="iResolution"/>
    </gl-fx>
    </div>
  </div>
</template>

<script>
  const A_SHADER = `void main() {
    vec2 st = gl_FragCoord.xy / iResolution.xy;
    gl_FragColor = vec4(st.xy, (cos(iTime) + 1.0) * 0.5, 1.0);
  }`;

  export default {
    name: 'App',
    data() {
      return {
        glslCode: A_SHADER,
      };
    },
  };
</script>
```

## API

<details><summary><strong>Context</strong></summary>
<br>

The `<gl-fx>` component is the top and only mandatory component.
It draws the canvas, manage the vertex shader and upload your fragment shader to your GPU.

### props
-   **glslCode** : String (required)
    > This should contains your fragment shader without including the uniforms definitions
-   **isShadertoy**: mixed [`true`, `false`, `"auto"`] (default: `"auto"`)
    > If true, or if auto and Shadertoy syntax is detected, the `main()` and `texture()` function will be injected to your fragment shader
-   **injectUniforms**: mixed [`true`, `false`, `"auto"`] (default: `"auto"`)
    > If true or if auto and Shadertoy syntax is detected, the following uniforms will be injected : iTime (float), iTimeDelta (float), iFrame(int), iResolution (vec3), iMouse(vec4). Those uniforms will have the same behavior as in Shadertoys sandboxes. Note that you can inject those uniforms with a non shadertoy code.

<br/>
</details>

<details><summary><strong>Uniforms</strong></summary>
<br>

The `gl-fx-uniform` component should be use inside a `<gl-fx>`component slot.
For every uniform component you instanciate, the uniform will be declared then allocated and uploaded for you.

### props
-   **name** : String (required)
    > This is the identifier of your uniform in your shader code
-   **type**: String (required)
    > The type represent the GL type of the uniform. The following types are supported : int, float, vec2, vec3, vec4 sampler 2D.
-   **input**: Number | Array | String (required))
    > The input props depends on the type you specified. It can be either a float Number, an integer, an Array (mind the length !) or the URL of a texture. Input values are reactives so you can freely update them as you would do with every Vue component props, and they will be updated in your shader.

<br/>
</details>

<details><summary><strong>Special Uniforms</strong></summary>
<br>

The special uniforms components should be used just like regular uniforms except for the fact you can't specify their type or input, because they rely on internal mecanism to upload their value directly, such as ellapsed time, or mouse position.

### general props
-   **name** : String (required)
    > This is the identifier of your uniform in your shader code

<details><summary><em>Time</em></summary>
<br>
The time uniform can either upload the ellapsed time or the delta between two frames

### props
-   **isDelta**: Boolean (default: `false`)
    > if `true`the uniform will report the delta between two frame in seconds. Otherwise, it will return the ellapsed time
<br/>
</details>

<details><summary><em>Frame</em></summary>
<br>
The frame uniform simply report the number of frame drawn since the beginning of your sahder
<br/>
</details>

<details><summary><em>Resolution</em></summary>
<br>
The resolution uniform simply report the width and height of your canvas to your shader. It can be used to compute texture UVs
<br/>
</details>

<details><summary><em>Mouse</em></summary>
<br>
The mouse uniform can be used to report the position of the mouse to your shader

### props
-   **mouseDrag**: Boolean (default: `false`)
    > if `true` the mouse position will be reported only when the mouse button is down.
<br/>
</details>

<br/>
Special uniforms are the heart of this library. They are here to make use of shaders in your project less time consuming. We have plenty of indes in mind, such as DOM elements painting, Perlin Noise etc...
If you have any idea you would like us to work one, feel free to open an issue on Github.
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
- Improve error management
- Develop a good sandbox demo

On the future, this library should also :
- Support multipass effects
- support a second module with extra, out of the box ready effects.

## Credits


<p align="center">
  Based on an Idea by Nicolas Chesné and a PoC made by Laurent Gabarre.
</p>

---

*Thanks for the team at [la chose](http://www.lachose.fr) for using the library and giving us feedback, and the occasional helping hand*
