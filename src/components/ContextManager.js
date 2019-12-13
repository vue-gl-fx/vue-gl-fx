import { initShader, initQuadBuffer } from '../helpers/webGLHelper';
import ProgramStore from './ProgramStore';

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

class ContextManager {
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
        this.autopurge = false
    
        // use for iTimeDelta
        this.lastRenderDate = 0.0;
        this.ellapsedTime = 0.0;
    
        // use for iChannel
        this.uniforms = [];
        this.textures = [];

        this.programStore = new ProgramStore();
      }
    

  setUniforms(values) {
    this.uniforms = [];
    this.textures = {};
    let texIndex = 0;
    values.forEach((uniform) => {
        this.uniforms.push(uniform);
        if(uniform.init(this, texIndex)){
          texIndex++;
        }
        uniform.afterInit();
    });
  }

  updateProgram(fsSource) {
    const { gl } = this;
    let shaderProgram = this.programStore.getProgram(fsSource)
    if(shaderProgram !== undefined){
      gl.useProgram(shaderProgram);
    } else {
      shaderProgram = initShader(gl, QUAD_VERTEX_SOURCE, fsSource);
      this.programStore.addProgram(fsSource, shaderProgram);
    }
    this.programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
    };
    this.uniforms.forEach((uni) => {
        uni.alloc(shaderProgram);
    })
  }

  setCurrentTime(){
    this.lastRenderDate = window.performance.now()*0.001;
  }

  reset(){
    this.lastRenderDate = 0.0;
    this.ellapsedTime = 0.0;

    this.uniforms.forEach(uni => {
      try {
        uni.reset();
      } catch(err){
        //eslint-disable-line
      }
  })
  }

  setFragmentShader(source) {
    if(this.programInfo && this.autopurge){
      this.gl.deleteProgram(this.programInfo.program);
    }

    this.ellapsedTime = 0.0;
    this.lastRenderDate = 0.0;
    const isShaderToy = source.indexOf('void mainImage') > -1;
    let fsSource = `precision mediump float;`

    this.uniforms.forEach(uni => {
        fsSource += `\n${uni.declaration}`
    })
    fsSource += `\n${source}`;

    if (isShaderToy) {
      fsSource += `\nvoid main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }`;
      fsSource = fsSource.replace(/texture\(/g, "texture2D(");
    }
    if(process.env.NODE_ENV !== "production"){
      console.log("--- Compiled Fragment shader ---") //eslint-disable-line no-console
      console.log(fsSource);//eslint-disable-line no-console
      console.log("--- Compiled Fragment shader ---")//eslint-disable-line no-console
    }
    this.updateProgram(fsSource);
  }

  setSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);

    this.uniforms.forEach((uni)=> {
      uni.update()
    })
  }

  updateUniforms() {
    const now = window.performance.now()*.001;
    const delta = now - this.lastRenderDate;
    this.lastRenderDate = now;
    this.ellapsedTime += delta

    this.uniforms.forEach(uni => {
        uni.update(this.ellapsedTime);
    })
  }

  clear() {
    const { gl } = this;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // eslint-disable-line
  }

  draw(resetTime = false) {
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
    if(resetTime){
      this.lastRenderDate = window.performance.now()*0.001;
    }
    this.updateUniforms();

    const offsetDrawArray = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offsetDrawArray, vertexCount);
  }

  destroy() {
    this.programStore.getAll().forEach((program)=>{
      this.gl.deleteProgram(program);
    })
    this.programStore.clear();
    this.uniforms.forEach((uni)=> {
      uni.destroy();
    })
    
    this.canvas.width = 1;
    this.gl.canvas.height = 1;
    
    this.gl.getExtension('WEBGL_lose_context').loseContext();
  }
}

export default ContextManager;
