export const initShader = (gl, vsSource, fsSource) => {
  const loadShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`); //eslint-disable-line no-console
      gl.deleteShader(shader);
      throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  };
  const vertexShader = loadShader(gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl.FRAGMENT_SHADER, fsSource);
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error(`Error when initialising the program : ${gl.getProgramInfoLog(shaderProgram)}`); //eslint-disable-line
    throw new Error(gl.getProgramInfoLog(shaderProgram));
  }
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  return shaderProgram;
};

export const initQuadBuffer = (gl) => {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const positions = [
    1.0, 1.0,
    -1.0, 1.0,
    1.0, -1.0,
    -1.0, -1.0,
  ];
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(positions),
    gl.STATIC_DRAW,
  );
  return buffer;
};

export const getHash = (str) => {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

