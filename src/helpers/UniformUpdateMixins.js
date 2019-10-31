
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


mouse = {
  data() {
    return {
      mouseVec4 = [];
    }
  },
  init() {
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
  },
  methods() {
    onMouseDown = (e) {
      const x = e.offsetX;
      const y = this.canvas.height - e.offsetY;
      this.mouseVec4 = [x, y, x, y];
    }

    onMouseUp = () {
      this.mouseVec4[2] = 0.0;
      this.mouseVec4[3] = 0.0;
    };
  }
}
class ShaderToyHelper {
  constructor(canvas, gl) {
    this.gl = gl;
    this.canvas = canvas;

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
  }

  update() {
    const { gl } = this;
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

    this.resolution = [width, height, 0.0];
    this.time = now;
    this.timeDelta = delta;
    this.date = dateVec4;
    this.mouse = this.mouseVec4;

    this.lastRenderDate = now;
  }

}

export default ShaderToyHelper;
