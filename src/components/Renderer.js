import { initShader, initQuadBuffer, initTexture } from '../helpers/webGLHelper';

const QUAD_VERTEX_SOURCE = `attribute vec4 aVertexPosition;
void main() {
  gl_Position = aVertexPosition;
}`;

/*
Données d'entrée du shader
uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)
uniform float     iTimeDelta;            // render time (in seconds)
uniform int       iFrame;                // shader playback frame
uniform float     iChannelTime[4];       // channel playback time (in seconds)
uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
uniform samplerXX iChannel0..3;          // input channel. XX = 2D/Cube
uniform vec4      iDate;                 // (year, month, day, time in seconds)
*/

class Renderer {
  constructor(canvas) {
    let gl = canvas.getContext('webgl2');
    if (!gl) gl = canvas.getContext('experimental-webgl2');
    if (!gl) gl = canvas.getContext('webgl');
    if (!gl) gl = canvas.getContext('experimental-webgl');
    if (!gl) throw new Error('No WebGL');
    this.gl = gl;
    this.canvas = canvas;
    this.programInfo = null;
    this.quadBuffer = initQuadBuffer(gl);

    // use for iTimeDelta
    this.lastRenderDate = 0.0;

    // use for iMouse
    this.onMouseDown = (e) => {
      const x = e.offsetX;
      const y = this.canvas.height - e.offsetY;
      this.mouseVec4 = [x, y, x, y];
    };
    this.onMouseUp = () => {
      this.mouseVec4[2] = 0.0;
      this.mouseVec4[3] = 0.0;
    };
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    this.mouseVec4 = [0.0, 0.0, 0.0, 0.0];

    // use for iChannel
    this.textures = [];
  }

  set imgs(values) {
    this.textures = [];
    values.forEach((img) => {
      this.textures.push(initTexture(this.gl, img, false));
    });
  }

  updateProgram(fsSource) {
    const { gl } = this;
    const shaderProgram = initShader(gl, QUAD_VERTEX_SOURCE, fsSource);
    this.programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, 'iResolution'),
        time: gl.getUniformLocation(shaderProgram, 'iTime'),
        timeDelta: gl.getUniformLocation(shaderProgram, 'iTimeDelta'),
        date: gl.getUniformLocation(shaderProgram, 'iDate'),
        mouse: gl.getUniformLocation(shaderProgram, 'iMouse'),
        channels: this.textures.map((img, index) => gl.getUniformLocation(shaderProgram, `iChannel${index}`)),
      },
    };
  }

  setFragmentShader(source) {
    const isShaderToy = source.indexOf('void mainImage') > -1;
    let fsSource = `precision mediump float;
uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)
uniform float     iTimeDelta;            // render time (in seconds)
// uniform int       iFrame;                // shader playback frame
// uniform float     iChannelTime[4];       // channel playback time (in seconds)
// uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
uniform vec4      iDate;                 // (year, month, day, time in seconds)
// uniform sampler2D iChannel0..3;          // input channel. XX = 2D/Cube`;
    this.textures.forEach((img, index) => { fsSource += `\nuniform sampler2D iChannel${index};             // input channel${index}`; });
    fsSource += `\n${source}`;
    if (isShaderToy) {
      fsSource += `\nvoid main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}`;
      fsSource = fsSource.replace(/texture\(/g, "texture2D(");
    }
    console.log(fsSource); //eslint-disable-line no-console
    this.updateProgram(fsSource);
  }

  setSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
  }

  updateUniforms() {
    const { gl } = this;
    const {
      resolution,
      time,
      timeDelta,
      date,
      mouse,
      channels,
    } = this.programInfo.uniformLocations;
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    const now = window.performance.now() * 0.001;
    const delta = now - this.lastRenderDate;
    const d = new Date();
    const dateVec4 = [
      d.getFullYear(),
      d.getDate(),
      d.getDay(),
      d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() * 0.001, // eslint-disable-line
    ];

    gl.uniform3fv(resolution, [width, height, 0.0]);
    gl.uniform1f(time, now);
    gl.uniform1f(timeDelta, delta);
    gl.uniform4fv(date, dateVec4);
    gl.uniform4fv(mouse, this.mouseVec4);

    this.textures.forEach((text, index) => {
      gl.activeTexture(gl[`TEXTURE${index}`]);
      gl.bindTexture(gl.TEXTURE_2D, text);
      gl.uniform1i(channels[index], index);
    });

    this.lastRenderDate = now;
  }

  clear() {
    const { gl } = this;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // eslint-disable-line
  }

  draw() {
    this.clear();
    if (!this.programInfo) return;
    const { gl } = this;
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
    gl.vertexAttribPointer(
      this.programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);

    gl.useProgram(this.programInfo.program);

    this.updateUniforms();

    const offsetDrawArray = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offsetDrawArray, vertexCount);
  }

  destroy() {
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
  }
}

export default Renderer;
