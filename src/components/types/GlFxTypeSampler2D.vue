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
    }
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
    init(gl, glInfo) {
      //eslint-disable-line no-unused-vars
      // to override
      const tex = this.initTexture(gl);
      return tex;
    },
    update(gl, glInfo) {
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
      }
      gl.activeTexture(gl[`TEXTURE${glInfo.index}`]);
      gl.uniform1i(glInfo.loc, glInfo.index);
    },

    initTexture(gl) {
      const isPowerOf2 = value => (value && value - 1) === 0;
      const image = this.value;
      const autoMipmap = this.mipmap;
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

      if (autoMipmap && isPowerOf2(image.width) && isPowerOf2(image.height)) {
        gl.generateMipmap(gl.TEXTURE_2D);
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
      return texture;
    }
  }
};
</script>
<style lang="stylus" scoped>
img {
  display: none;
}
</style>