'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var initShader = function initShader(gl, vsSource, fsSource) {
  var loadShader = function loadShader(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log("An error occurred compiling the shaders: ".concat(gl.getShaderInfoLog(shader)));
      gl.deleteShader(shader);
      throw new Error(gl.getShaderInfoLog(shader));
    }

    return shader;
  };

  var vertexShader = loadShader(gl.VERTEX_SHADER, vsSource);
  var fragmentShader = loadShader(gl.FRAGMENT_SHADER, fsSource);
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log("Error when initialising the program : ".concat(gl.getProgramInfoLog(shaderProgram)));
    throw new Error(gl.getProgramInfoLog(shaderProgram));
  }

  return shaderProgram;
};
var initQuadBuffer = function initQuadBuffer(gl) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  var positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  return buffer;
};
var initTexture = function initTexture(gl, image) {
  var autoMipmap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var isPowerOf2 = function isPowerOf2(value) {
    return (value && value - 1) === 0;
  };

  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  if (autoMipmap && isPowerOf2(image.width) && isPowerOf2(image.height)) {
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }

  return texture;
};

var QUAD_VERTEX_SOURCE = "attribute vec4 aVertexPosition;\nvoid main() {\n  gl_Position = aVertexPosition;\n}";
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

var Renderer =
/*#__PURE__*/
function () {
  function Renderer(canvas) {
    var _this = this;

    _classCallCheck(this, Renderer);

    var gl = canvas.getContext('webgl2');
    if (!gl) gl = canvas.getContext('experimental-webgl2');
    if (!gl) gl = canvas.getContext('webgl');
    if (!gl) gl = canvas.getContext('experimental-webgl');
    if (!gl) throw new Error('No WebGL');
    this.gl = gl;
    this.canvas = canvas;
    this.programInfo = null;
    this.quadBuffer = initQuadBuffer(gl); // use for iTimeDelta

    this.lastRenderDate = 0.0; // use for iMouse

    this.onMouseDown = function (e) {
      var x = e.offsetX;
      var y = _this.canvas.height - e.offsetY;
      _this.mouseVec4 = [x, y, x, y];
    };

    this.onMouseUp = function () {
      _this.mouseVec4[2] = 0.0;
      _this.mouseVec4[3] = 0.0;
    };

    this.canvas.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    this.mouseVec4 = [0.0, 0.0, 0.0, 0.0]; // use for iChannel

    this.textures = [];
  }

  _createClass(Renderer, [{
    key: "updateProgram",
    value: function updateProgram(fsSource) {
      var gl = this.gl;
      var shaderProgram = initShader(gl, QUAD_VERTEX_SOURCE, fsSource);
      this.programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition')
        },
        uniformLocations: {
          resolution: gl.getUniformLocation(shaderProgram, 'iResolution'),
          time: gl.getUniformLocation(shaderProgram, 'iTime'),
          timeDelta: gl.getUniformLocation(shaderProgram, 'iTimeDelta'),
          date: gl.getUniformLocation(shaderProgram, 'iDate'),
          mouse: gl.getUniformLocation(shaderProgram, 'iMouse'),
          channels: this.textures.map(function (img, index) {
            return gl.getUniformLocation(shaderProgram, "iChannel".concat(index));
          })
        }
      };
    }
  }, {
    key: "setFragmentShader",
    value: function setFragmentShader(source) {
      var isShaderToy = source.indexOf('void mainImage') > -1;
      var fsSource = "precision mediump float;\nuniform vec3      iResolution;           // viewport resolution (in pixels)\nuniform float     iTime;                 // shader playback time (in seconds)\nuniform float     iTimeDelta;            // render time (in seconds)\n// uniform int       iFrame;                // shader playback frame\n// uniform float     iChannelTime[4];       // channel playback time (in seconds)\n// uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)\nuniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click\nuniform vec4      iDate;                 // (year, month, day, time in seconds)\n// uniform sampler2D iChannel0..3;          // input channel. XX = 2D/Cube";
      this.textures.forEach(function (img, index) {
        fsSource += "\nuniform sampler2D iChannel".concat(index, ";             // input channel").concat(index);
      });
      fsSource += "\n".concat(source);

      if (isShaderToy) {
        fsSource += "\nvoid main() {\n  mainImage(gl_FragColor, gl_FragCoord.xy);\n}";
      }

      console.log(fsSource);
      this.updateProgram(fsSource);
    }
  }, {
    key: "setSize",
    value: function setSize(width, height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.gl.viewport(0, 0, width, height);
    }
  }, {
    key: "updateUniforms",
    value: function updateUniforms() {
      var gl = this.gl;
      var _this$programInfo$uni = this.programInfo.uniformLocations,
          resolution = _this$programInfo$uni.resolution,
          time = _this$programInfo$uni.time,
          timeDelta = _this$programInfo$uni.timeDelta,
          date = _this$programInfo$uni.date,
          mouse = _this$programInfo$uni.mouse,
          channels = _this$programInfo$uni.channels;
      var width = gl.drawingBufferWidth;
      var height = gl.drawingBufferHeight;
      var now = window.performance.now() * 0.001;
      var delta = now - this.lastRenderDate;
      var d = new Date();
      var dateVec4 = [d.getFullYear(), d.getDate(), d.getDay(), d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() * 0.001 // eslint-disable-line
      ];
      gl.uniform3fv(resolution, [width, height, 0.0]);
      gl.uniform1f(time, now);
      gl.uniform1f(timeDelta, delta);
      gl.uniform4fv(date, dateVec4);
      gl.uniform4fv(mouse, this.mouseVec4);
      this.textures.forEach(function (text, index) {
        gl.activeTexture(gl["TEXTURE".concat(index)]);
        gl.bindTexture(gl.TEXTURE_2D, text);
        gl.uniform1i(channels[index], index);
      });
      this.lastRenderDate = now;
    }
  }, {
    key: "clear",
    value: function clear() {
      var gl = this.gl;
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clearDepth(1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // eslint-disable-line
    }
  }, {
    key: "draw",
    value: function draw() {
      this.clear();
      if (!this.programInfo) return;
      var gl = this.gl;
      var numComponents = 2;
      var type = gl.FLOAT;
      var normalize = false;
      var stride = 0;
      var offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
      gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
      gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
      gl.useProgram(this.programInfo.program);
      this.updateUniforms();
      var offsetDrawArray = 0;
      var vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offsetDrawArray, vertexCount);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.canvas.removeEventListener('mousedown', this.onMouseDown);
      window.removeEventListener('mouseup', this.onMouseUp);
    }
  }, {
    key: "imgs",
    set: function set(values) {
      var _this2 = this;

      this.textures = [];
      values.forEach(function (img) {
        _this2.textures.push(initTexture(_this2.gl, img, false));
      });
    }
  }]);

  return Renderer;
}();

//
var script = {
  name: 'Shader',
  props: {
    code: {
      type: String,
      default: null
    }
  },
  data: function data() {
    return {
      webglAvailable: true
    };
  },
  watch: {
    code: function code(value) {
      this.renderer.setFragmentShader(value);
      this.draw();
    }
  },
  mounted: function mounted() {
    return new Promise(function ($return, $error) {
      var canvas, slots, imageNodeFilter, getImgPath, loadPic, loadNodeImagePath, imgs;
      canvas = this.$refs.canvas;

      try {
        this.renderer = new Renderer(canvas);
      } catch (error) {
        this.$emit('noWebGL');
        this.webglAvailable = false;
        return $return();
      }

      slots = this.$slots.default;

      if (slots) {
        imageNodeFilter = function imageNodeFilter(node) {
          return node.elm instanceof Image;
        };

        getImgPath = function getImgPath(node) {
          return node.elm.src;
        };

        loadPic = function loadPic(path) {
          return new Promise(function (resolve, reject) {
            var img = new Image();
            img.crossOrigin = 'undefined';

            img.onload = function () {
              return resolve(img);
            };

            img.onerror = reject;
            img.src = path;
          });
        };

        loadNodeImagePath = function loadNodeImagePath(node) {
          return loadPic(getImgPath(node));
        };

        return Promise.resolve(Promise.all(slots.filter(imageNodeFilter).map(loadNodeImagePath))).then(function ($await_3) {
          try {
            imgs = $await_3;
            this.renderer.imgs = imgs;
            return $If_2.call(this);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }.bind(this), $error);
      }

      function $If_2() {
        this.renderer.setFragmentShader(this.code);
        window.addEventListener('resize', this.resize);
        this.resize();
        this.draw();
        return $return();
      }

      return $If_2.call(this);
    }.bind(this));
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    cancelAnimationFrame(this.rafId);
    this.renderer.destroy();
  },
  methods: {
    resize: function resize() {
      var canvas = this.$refs.canvas;
      this.renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    },
    draw: function draw() {
      this.renderer.draw();
      this.rafId = requestAnimationFrame(this.draw);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.webglAvailable)?_c('canvas',{ref:"canvas",staticClass:"vue-shader",staticStyle:{"background-color":"black"}},[_vm._t("default")],2):_c('p',[_vm._v("WebGL not available on this device")])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Shader = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

module.exports = Shader;
