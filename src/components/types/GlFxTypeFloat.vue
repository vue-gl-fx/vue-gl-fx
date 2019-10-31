
<script>
import mixin from '@/components/mixins/TypeMixin';
export default {
    name: "GlFxTypeFloat",
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
            gl.uniform1f(glInfo.loc, this.value);
        }
    },
}
</script>
<style lang="stylus" scoped>
img {
    display:none;
}
</style>