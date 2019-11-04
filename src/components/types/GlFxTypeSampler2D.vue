<script>
import { initTexture } from '@/helpers/webGLHelper';
import mixin from '@/components/mixins/TypeMixin';

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
        }
    },
    data() {
        return {
            img: null,
        }
    },
    computed: {
        value(){
            return this.img
        }
    },
    async mounted(){
        try {
            this.img = await this.loadPic(this.input);
        } catch(err){
            this.error = true;
            this.$emit("error");
        }
      // this.uploadTexture
      this.ready = true;
      this.$emit("ready");
    },
    methods: {
        loadPic(path){
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'undefined';
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = path;
          });        
        },
        init(gl, glInfo){ //eslint-disable-line no-unused-vars
            // to override
            const tex = initTexture(gl, this.value, false, this.vflip);
            return tex;
        },
        update(gl, glInfo){
            gl.activeTexture(gl[`TEXTURE${glInfo.index}`]);
            gl.bindTexture(gl.TEXTURE_2D, glInfo.texture);
            gl.uniform1i(glInfo.loc, glInfo.index);
        }
    }
}
</script>
<style lang="stylus" scoped>
img {
    display:none;
}
</style>