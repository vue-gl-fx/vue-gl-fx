
<script>
import mixin from "../mixins/TypeMixin";
export default {
  name: "GlFxTypeVec3",
  mixins: [mixin],
  props: {
    input: {
      type: Array,
      default: null
    }
  },
  mounted() {
    this.ready = true;
    this.$emit("ready");
  },
  methods: {
    update(gl, glInfo) {
      gl.uniform3fv(glInfo.loc, this.value);
    }
  }
};
</script>
<style lang="stylus" scoped>
img {
  display: none;
}
</style>