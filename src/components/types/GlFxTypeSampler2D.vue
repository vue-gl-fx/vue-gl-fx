<script>
import mixin from "../mixins/TypeMixin";

export default {
  name: "GlFxTypeSampler2D",
  mixins: [mixin],
  props: {
    input: {
      type: String,
      default: null
    },
    vflip: {
      type: Boolean,
      default: false
    },
    mipmap: {
      type: Boolean,
      default: false
    },
    clamp: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      img: null,
      forceUpdate: false
    };
  },
  computed: {
    value() {
      return this.img;
    }
  },
  watch: {
    vflip() {
      this.forceUpdate = true;
    },
    clamp() {
      this.forceUpdate = true;
    }
  },
  async mounted() {
    try {
      this.img = await this.loadPic(this.input);
    } catch (err) {
      this.error = true;
      this.$emit("error");
    }
    // this.uploadTexture
    this.ready = true;
    this.$emit("ready");
  },
  methods: {
    loadPic(path) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "undefined";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = path;
      });
    },
    init(gl, glInfo) { //eslint-disable-line no-unused-vars
      // to override
      const tex = this.initTexture(gl);
      return tex;
    },
    update(gl, glInfo) {
      gl.uniform1i(glInfo.loc, glInfo.index);
      gl.activeTexture(gl[`TEXTURE${glInfo.index}`]);
      
      gl.bindTexture(gl.TEXTURE_2D, glInfo.texture);

      if (this.forceUpdate) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.vflip);
        gl.texSubImage2D(
          gl.TEXTURE_2D,
          0,
          0,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          this.value
        );

        this.paramTexture(gl); 
        this.forceUpdate = false;
      }
    },

    initTexture(gl) {
      const image = this.value;
      const texture = gl.createTexture();

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.vflip);

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );

      this.paramTexture(gl);      
      return texture;
    },
    isPowerOf2 (value){
      return (value & (value - 1)) === 0;
    },
    paramTexture(gl){
      const image = this.value;
      const autoMipmap = this.mipmap;

      if (autoMipmap && this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
        gl.generateMipmap(gl.TEXTURE_2D);
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.clamp ? gl.CLAMP_TO_EDGE:gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.clamp ? gl.CLAMP_TO_EDGE:gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    },
    destroy(gl, glInfo){ //eslint-disable-line no-unused-vars
      gl.bindTexture(gl.TEXTURE_2D, null);
      gl.deleteTexture(glInfo.texture);
    }
  }
};
</script>
<style lang="stylus" scoped>
img {
  display: none;
}
</style>