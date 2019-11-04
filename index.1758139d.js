!function(u){function t(t){for(var e,n,o=t[0],r=t[1],i=t[2],a=0,s=[];a<o.length;a++)n=o[a],Object.prototype.hasOwnProperty.call(l,n)&&l[n]&&s.push(l[n][0]),l[n]=0;for(e in r)Object.prototype.hasOwnProperty.call(r,e)&&(u[e]=r[e]);for(h&&h(t);s.length;)s.shift()();return f.push.apply(f,i||[]),c()}function c(){for(var t,e=0;e<f.length;e++){for(var n=f[e],o=!0,r=1;r<n.length;r++){var i=n[r];0!==l[i]&&(o=!1)}o&&(f.splice(e--,1),t=a(a.s=n[0]))}return t}var n={},l={0:0},f=[];function a(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return u[t].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=u,a.c=n,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/vue-gl-fx/";var e=window.webpackJsonp=window.webpackJsonp||[],o=e.push.bind(e);e.push=t,e=e.slice();for(var r=0;r<e.length;r++)t(e[r]);var h=o;f.push([21,2]),c()}([,function(t,e,n){"use strict";n.r(e);var o=n(2),r=n.n(o),i={props:{name:{type:String,default:""},input:{type:String,default:null}},data:function(){return{error:!1,ready:!1}},computed:{value:function(){return this.input}},render:function(){return""},methods:{init:function(){return!1},alloc:function(t,e){return t.getUniformLocation(e.program,this.name)},update:function(){}}};function u(t,e,n,o,r,i,a){try{var s=t[i](a),u=s.value}catch(t){return void n(t)}s.done?e(u):Promise.resolve(u).then(o,r)}var a,s={name:"GlFxTypeSampler2D",mixins:[i],props:{input:{type:String,default:null},vflip:{type:Boolean,default:!1},mipmap:{type:Boolean,default:!1}},data:function(){return{img:null,forceUpdate:!1}},computed:{value:function(){return this.img}},watch:{vflip:function(){this.forceUpdate=!0}},mounted:(a=function(s){return function(){var t=this,a=arguments;return new Promise(function(e,n){var o=s.apply(t,a);function r(t){u(o,e,n,r,i,"next",t)}function i(t){u(o,e,n,r,i,"throw",t)}r(void 0)})}}(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.loadPic(this.input);case 3:this.img=t.sent,t.next=10;break;case 6:t.prev=6,t.t0=t.catch(0),this.error=!0,this.$emit("error");case 10:this.ready=!0,this.$emit("ready");case 12:case"end":return t.stop()}},t,this,[[0,6]])})),function(){return a.apply(this,arguments)}),methods:{loadPic:function(o){return new Promise(function(t,e){var n=new Image;n.crossOrigin="undefined",n.onload=function(){return t(n)},n.onerror=e,n.src=o})},init:function(t){return this.initTexture(t)},update:function(t,e){t.bindTexture(t.TEXTURE_2D,e.texture),this.forceUpdate&&(t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,this.vflip),t.texSubImage2D(t.TEXTURE_2D,0,0,0,t.RGBA,t.UNSIGNED_BYTE,this.value)),t.activeTexture(t["TEXTURE".concat(e.index)]),t.uniform1i(e.loc,e.index)},initTexture:function(t){function e(t){return 0===(t&&t-1)}var n=this.value,o=this.mipmap,r=t.createTexture();return t.bindTexture(t.TEXTURE_2D,r),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,this.vflip),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,n),o&&e(n.width)&&e(n.height)?t.generateMipmap(t.TEXTURE_2D):(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR)),r}}},c=(n(11),n(0)),l=Object(c.a)(s,void 0,void 0,!1,null,"3ea0da05",null).exports,f={name:"GlFxTypeFloat",mixins:[i],props:{input:{type:Number,default:null}},mounted:function(){this.ready=!0,this.$emit("ready")},methods:{update:function(t,e){t.uniform1f(e.loc,this.value)}}},h=(n(12),Object(c.a)(f,void 0,void 0,!1,null,"3d1be4c0",null).exports),d={name:"GlFxTypeInt",mixins:[i],props:{input:{type:Number,default:null}},mounted:function(){this.ready=!0,this.$emit("ready")},methods:{update:function(t,e){t.uniform1i(e.loc,Math.floor(this.value))}}},m=(n(13),Object(c.a)(d,void 0,void 0,!1,null,"1df8665e",null).exports),p={name:"GlFxTypeVec3",mixins:[i],props:{input:{type:Array,default:null}},mounted:function(){this.ready=!0,this.$emit("ready")},methods:{update:function(t,e){t.uniform3fv(e.loc,this.value)}}},v=(n(14),Object(c.a)(p,void 0,void 0,!1,null,"5b0c878e",null).exports),g={name:"GlFxTypeVec2",mixins:[i],props:{input:{type:Array,default:null}},mounted:function(){this.ready=!0,this.$emit("ready")},methods:{update:function(t,e){t.uniform2fv(e.loc,this.value)}}},y=(n(15),Object(c.a)(g,void 0,void 0,!1,null,"7bcd1348",null).exports),w={name:"GlFxTypeVec4",mixins:[i],props:{input:{type:Array,default:null}},mounted:function(){this.ready=!0,this.$emit("ready")},methods:{update:function(t,e){t.uniform4fv(e.loc,this.value)}}},x=(n(16),Object(c.a)(w,void 0,void 0,!1,null,"c0a7d86c",null).exports);e.default={components:{UniformSampler2D:l,Uniformfloat:h,Uniformvec3:v,Uniformvec2:y,Uniformvec4:x,Uniformint:m},props:{type:{type:String,default:null},name:{type:String,default:""},input:{type:[String,Array,Number,Boolean,Object,Date,Symbol],default:null}},data:function(){return{ready:!1,context:null,glInfo:{program:null,loc:null,index:null,texture:null}}},computed:{declaration:function(){return"uniform ".concat(this.getType(),"   ").concat(this.name,";")},value:function(){return this.$refs.child.value}},created:function(){this.$parent.registerUniform&&this.$parent.registerUniform(this)},methods:{onReady:function(){this.ready=!0,this.$emit("ready")},getType:function(){return this.type},getTypeComponent:function(){switch(this.type.toLowerCase()){case"sampler2d":return"UniformSampler2D";default:return"Uniform".concat(this.getType())}},init:function(t,e){var n=1<arguments.length&&void 0!==e?e:0;return this.context=t,this.glInfo.index=n,this.glInfo.texture=this.$refs.child.init(this.context.gl,this.glInfo),this.glInfo.texture},afterInit:function(){},alloc:function(t){this.glInfo.program=t,this.glInfo.loc=this.context.gl.getUniformLocation(this.glInfo.program,this.name)},beforeUpdate:function(){},update:function(t){this.beforeUpdate(t),this.$refs.child.update(this.context.gl,this.glInfo),this.afterUpdate(t)},afterUpdate:function(){},destroy:function(){this.context=null}}}},,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},,function(t,e,n){"use strict";var o=n(3);n.n(o).a},function(t,e,n){"use strict";var o=n(4);n.n(o).a},function(t,e,n){"use strict";var o=n(5);n.n(o).a},function(t,e,n){"use strict";var o=n(6);n.n(o).a},function(t,e,n){"use strict";var o=n(7);n.n(o).a},function(t,e,n){"use strict";var o=n(8);n.n(o).a},,,,,function(t,e,n){t.exports=n(26)},function(t,e,n){"use strict";var o=n(9);n.n(o).a},,,,function(t,e,n){"use strict";n.r(e);function o(o,t,e){function n(t,e){var n=o.createShader(t);if(o.shaderSource(n,e),o.compileShader(n),!o.getShaderParameter(n,o.COMPILE_STATUS))throw console.log("An error occurred compiling the shaders: ".concat(o.getShaderInfoLog(n))),o.deleteShader(n),new Error(o.getShaderInfoLog(n));return n}var r=n(o.VERTEX_SHADER,t),i=n(o.FRAGMENT_SHADER,e),a=o.createProgram();if(o.attachShader(a,r),o.attachShader(a,i),o.linkProgram(a),o.useProgram(a),!o.getProgramParameter(a,o.LINK_STATUS))throw console.log("Error when initialising the program : ".concat(o.getProgramInfoLog(a))),new Error(o.getProgramInfoLog(a));return a}var r=n(18),i={name:"App",data:function(){return{glslCode:"void main() {\n  vec2 st = gl_FragCoord.xy / iResolution.xy;\n  gl_FragColor = vec4(st.xy, (cos(iTime) + 1.0) * 0.5, 1.0);\n}",vflip:!0,color:[.5,0,1]}},mounted:function(){window.requestAnimationFrame(this.update)},methods:{update:function(){this.color=[Math.random(),Math.random(),Math.random()]}}},a=(n(22),n(0)),s=Object(a.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("gl-fx",{staticClass:"app_shader",attrs:{code:e.glslCode}},[n("gl-fx-uniform",{attrs:{input:.8,type:"float",name:"iFloat"}}),e._v(" "),n("gl-fx-uniform",{attrs:{input:e.color,type:"vec3",name:"iColor"}}),e._v(" "),n("gl-fx-uniform",{attrs:{input:e.color,type:"vec3",name:"iColor2"}}),e._v(" "),n("gl-fx-time",{attrs:{input:e.color,type:"vec3",name:"iTime2"}}),e._v(" "),n("gl-fx-uniform",{attrs:{vflip:e.vflip,name:"iChannel0",type:"sampler2D",input:"http://picsum.photos/256/256/?random&v=1",autoplay:"true"}})],1),e._v(" "),n("div",{staticClass:"app_control"},[n("textarea",{directives:[{name:"model",rawName:"v-model.lazy",value:e.glslCode,expression:"glslCode",modifiers:{lazy:!0}}],staticClass:"app_control-textarea",attrs:{placeholder:"insert GLSL code here"},domProps:{value:e.glslCode},on:{change:function(t){e.glslCode=t.target.value}}}),e._m(0)])],1)},[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app_control-notes"},[n("p",[t._v("https://www.shadertoy.com/lib/piLibs.js")]),t._v(" "),n("p",[t._v("https://www.shadertoy.com/js/effect.js")]),t._v(" "),n("p",[t._v("Shader Toy Examples:")]),t._v(" "),n("ul",[n("li",[t._v("https://www.shadertoy.com/new")]),t._v(" "),n("li",[t._v("https://www.shadertoy.com/view/MdSGDm")]),t._v(" "),n("li",[t._v("https://www.shadertoy.com/view/llyyRd")]),t._v(" "),n("li",[t._v("https://www.shadertoy.com/view/4tXGW4")]),t._v(" "),n("li",[t._v("https://www.shadertoy.com/view/Ms2SD1")]),t._v(" "),n("li",[t._v("https://www.shadertoy.com/view/4lVyRR")])]),t._v(" "),n("p",[t._v("Don't work:")]),t._v(" "),n("ul",[n("li",[t._v("https://www.shadertoy.com/view/llyyRd")]),t._v(" "),n("li",[t._v("https://www.shadertoy.com/view/ltVyRd")]),t._v(" "),n("li",[t._v("https://www.shadertoy.com/view/Xds3zN")]),t._v(" "),n("li",[t._v("https://www.shadertoy.com/view/ls2SDD")]),t._v(" "),n("li",[t._v("https://www.shadertoy.com/view/Xt2yWt")])]),t._v(" "),n("p",[t._v("Todo:")]),t._v(" "),n("ul",[n("li",[t._v("check delta time")]),t._v(" "),n("li",[t._v("add Error message")])])])}],!1,null,null,null).exports,u=n(2),c=n.n(u);function l(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var f=function(){function n(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n);var e=t.getContext("webgl2");if(!(e=(e=(e=e||t.getContext("experimental-webgl2"))||t.getContext("webgl"))||t.getContext("experimental-webgl")))throw new Error("No WebGL");this.gl=e,this.canvas=t,this.programInfo=null,this.quadBuffer=function(t){var e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e);return t.bufferData(t.ARRAY_BUFFER,new Float32Array([1,1,-1,1,1,-1,-1,-1]),t.STATIC_DRAW),e}(e),this.lastRenderDate=0,this.uniforms=[],this.textures=[]}return function(t,e,n){e&&l(t.prototype,e),n&&l(t,n)}(n,[{key:"setUniforms",value:function(t){var e=this;this.uniforms=[],this.textures={};var n=0;t.forEach(function(t){e.uniforms.push(t),t.init(e,n)&&n++,t.afterInit()})}},{key:"updateProgram",value:function(t){var e=this.gl,n=o(e,"attribute vec4 aVertexPosition;\nvoid main() {\n  gl_Position = aVertexPosition;\n}",t);this.programInfo={program:n,attribLocations:{vertexPosition:e.getAttribLocation(n,"aVertexPosition")}},this.uniforms.forEach(function(t){t.alloc(n)})}},{key:"reset",value:function(){this.lastRenderDate=0,this.uniforms.forEach(function(t){try{t.reset()}catch(t){}})}},{key:"setFragmentShader",value:function(t){var e=-1<t.indexOf("void mainImage"),n="precision mediump float;";this.uniforms.forEach(function(t){n+="\n".concat(t.declaration)}),n+="\n".concat(t),e&&(n=(n+="\nvoid main() {\n        mainImage(gl_FragColor, gl_FragCoord.xy);\n      }").replace(/texture\(/g,"texture2D(")),console.log("--- Compiled Fragment shader ---"),console.log(n),console.log("--- Compiled Fragment shader ---"),this.updateProgram(n)}},{key:"setSize",value:function(t,e){this.canvas.width=t,this.canvas.height=e,this.gl.viewport(0,0,t,e),this.uniforms.forEach(function(t){t.update()})}},{key:"updateUniforms",value:function(){var e=.001*window.performance.now();this.uniforms.forEach(function(t){t.update(e)})}},{key:"clear",value:function(){var t=this.gl;t.clearColor(0,0,0,1),t.clearDepth(1),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT)}},{key:"draw",value:function(){if(this.clear(),this.programInfo){var t=this.gl,e=t.FLOAT;t.bindBuffer(t.ARRAY_BUFFER,this.quadBuffer),t.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition,2,e,!1,0,0),t.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition),t.useProgram(this.programInfo.program),this.updateUniforms();t.drawArrays(t.TRIANGLE_STRIP,0,4)}}},{key:"destroy",value:function(){this.uniforms.forEach(function(t){t.destroy()})}}]),n}();function h(t,e,n,o,r,i,a){try{var s=t[i](a),u=s.value}catch(t){return void n(t)}s.done?e(u):Promise.resolve(u).then(o,r)}var d,m={name:"GlFx",props:{isShaderToy:{type:Boolean,default:!0},code:{type:String,default:null}},data:function(){return{webglAvailable:!0,injectShaderToyUniforms:!0,uniforms:[]}},watch:{code:function(t){this.context.setFragmentShader(t),this.draw()}},created:function(){},mounted:(d=function(s){return function(){var t=this,a=arguments;return new Promise(function(e,n){var o=s.apply(t,a);function r(t){h(o,e,n,r,i,"next",t)}function i(t){h(o,e,n,r,i,"throw",t)}r(void 0)})}}(c.a.mark(function t(){var e,n=this;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e=this.$refs.canvas,t.prev=1,this.context=new f(e),t.next=11;break;case 5:return t.prev=5,t.t0=t.catch(1),console.error(t.t0),this.$emit("noWebGL"),this.webglAvailable=!1,t.abrupt("return");case 11:this.uniforms.forEach(function(t){t.$on("ready",n.onUniformReady)}),this.onUniformReady();case 13:case"end":return t.stop()}},t,this,[[1,5]])})),function(){return d.apply(this,arguments)}),beforeDestroy:function(){window.removeEventListener("resize",this.resize),cancelAnimationFrame(this.rafId),this.context.destroy()},methods:{resize:function(){var t=this.$refs.canvas;this.context.setSize(t.offsetWidth,t.offsetHeight)},onUniformReady:function(){var e=!0;this.uniforms.forEach(function(t){e&=t.ready}),e&&this.start()},start:function(){try{this.context.setUniforms(this.uniforms),this.context.setFragmentShader(this.code),window.addEventListener("resize",this.resize),this.resize(),this.draw()}catch(t){console.error(t)}},draw:function(){this.context.draw(),this.rafId=requestAnimationFrame(this.draw)},registerUniform:function(t){this.uniforms.push(t)}}},p=Object(a.a)(m,function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.webglAvailable?n("canvas",{ref:"canvas",staticClass:"vue-shader",staticStyle:{"background-color":"black"}},[t._t("default"),t._v(" "),t.injectShaderToyUniforms?n("gl-fx-time",{attrs:{name:"iTime"}}):t._e(),t._v(" "),t.injectShaderToyUniforms?n("gl-fx-time",{attrs:{"is-delta":!0,name:"iTimeDelta"}}):t._e(),t._v(" "),t.injectShaderToyUniforms?n("gl-fx-frame",{attrs:{name:"iFrame"}}):t._e(),t._v(" "),t.injectShaderToyUniforms?n("gl-fx-resolution",{attrs:{name:"iResolution"}}):t._e(),t._v(" "),t.injectShaderToyUniforms?n("gl-fx-mouse",{attrs:{name:"iMouse"}}):t._e()],2):n("p",[t._v("WebGL not available on this device")])},[],!1,null,null,null).exports,v=n(1),g={mixins:[v.default],props:{type:{type:String,required:!0}},methods:{}},y=Object(a.a)(g,function(){var t=this,e=t.$createElement;return(t._self._c||e)(t.getTypeComponent(),t._b({ref:"child",tag:"component",attrs:{name:t.name,input:t.input},on:{ready:t.onReady}},"component",t.$attrs,!1))},[],!1,null,"437d0575",null).exports,w={mixins:[v.default],data:function(){return{width:0,height:0}},computed:{res:function(){return[this.width,this.height,0]}},methods:{getType:function(){return"vec3"},getTypeComponent:function(){return"Uniformvec3"},afterInit:function(){this.updateRes()},beforeUpdate:function(){this.updateRes()},updateRes:function(){this.width=this.context.gl.drawingBufferWidth,this.height=this.context.gl.drawingBufferHeight}}},x=Object(a.a)(w,function(){var t=this,e=t.$createElement;return(t._self._c||e)(t.getTypeComponent(),t._b({ref:"child",tag:"component",attrs:{name:t.name,input:t.res},on:{ready:t.onReady}},"component",t.$attrs,!1))},[],!1,null,"344932b4",null).exports,_={mixins:[v.default],props:{isDelta:{type:Boolean,default:!1}},data:function(){return{time:0,lastUpdate:0,delta:0}},computed:{value:function(){return this.isDelta?this.delta:this.time}},methods:{getType:function(){return"float"},getTypeComponent:function(){return"Uniformfloat"},afterInit:function(){this.lastUpdate=0},beforeUpdate:function(t){this.time=t,this.delta=this.time-this.lastUpdate,this.lastUpdate=this.time}}},b=Object(a.a)(_,function(){var t=this,e=t.$createElement;return(t._self._c||e)(t.getTypeComponent(),t._b({ref:"child",tag:"component",attrs:{name:t.name,input:t.time},on:{ready:t.onReady}},"component",t.$attrs,!1))},[],!1,null,"76aaf46c",null).exports,T={mixins:[v.default],data:function(){return{frame:0}},computed:{value:function(){return this.frame}},methods:{getType:function(){return"int"},getTypeComponent:function(){return"Uniformint"},afterInit:function(){this.frame=0},beforeUpdate:function(){this.frame++}}},E=Object(a.a)(T,function(){var t=this,e=t.$createElement;return(t._self._c||e)(t.getTypeComponent(),t._b({ref:"child",tag:"component",attrs:{name:t.name,input:t.frame},on:{ready:t.onReady}},"component",t.$attrs,!1))},[],!1,null,"5c244064",null).exports,U={mixins:[v.default],props:{mouseDrag:{type:Boolean,default:!0},reverseY:{type:Boolean,default:!0}},data:function(){return{contextWidth:0,contextHeight:0,canvas:null,mouseDown:!1,mouseX:0,mouseY:0}},computed:{mouse:function(){return[this.x,this.y,this.z,this.w]},x:function(){return this.mouseX},y:function(){return this.mouseY},z:function(){return this.mouseDown?1:0},w:function(){return this.mouseDown?1:0}},methods:{getType:function(){return"vec4"},getTypeComponent:function(){return"Uniformvec4"},afterInit:function(){this.canvas=this.context.canvas,this.canvas.addEventListener("mousedown",this.onMouseDown),this.mouseDrag?this.canvas.addEventListener("mousedown",this.onMouseStartDrag):this.canvas.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp),this.updateRes()},beforeUpdate:function(){this.updateRes()},updateRes:function(){this.contextWidth=this.context.gl.drawingBufferWidth,this.contextHeight=this.context.gl.drawingBufferHeight},onMouseMove:function(t){this.mouseX=t.offsetX,this.mouseY=this.canvas.height-t.offsetY},onMouseStartDrag:function(t){this.mouseX=t.offsetX,this.mouseY=this.canvas.height-t.offsetY,this.canvas.addEventListener("mousemove",this.onMouseMove)},onMouseDown:function(){this.mouseDown=!0},onMouseUp:function(){this.mouseDrag&&this.canvas.removeEventListener("mousemove",this.onMouseMove),this.mouseDown=!1}}},R=Object(a.a)(U,function(){var t=this,e=t.$createElement;return(t._self._c||e)(t.getTypeComponent(),t._b({ref:"child",tag:"component",attrs:{name:t.name,input:t.mouse},on:{ready:t.onReady}},"component",t.$attrs,!1))},[],!1,null,"cfe19928",null).exports,S={install:function(t){t.component("gl-fx",p),t.component("gl-fx-uniform",y),t.component("gl-fx-resolution",x),t.component("gl-fx-time",b),t.component("gl-fx-frame",E),t.component("gl-fx-mouse",R)}},D=S;r.a.use(D),new r.a({el:"#app",render:function(t){return t(s)}})}]);
//# sourceMappingURL=index.1758139d.js.map