
<script>
import mixin from '../mixins/TypeMixin';
export default {
    name: "GlFxTypeInt",
    mixins: [mixin],
    props: {
        input: {
            type: Number,
            default: null
        },
    },
    mounted(){
        this.ready = true;
        this.$emit("ready");
    },
    methods: {
        update(gl, glInfo){
            gl.uniform1i(glInfo.loc, Math.floor(this.value));
        }
    },
}
</script>
<style lang="stylus" scoped>
img {
    display:none;
}
</style>