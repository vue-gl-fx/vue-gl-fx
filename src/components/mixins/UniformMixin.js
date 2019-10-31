import UniformSampler2D from "@/components/types/GlFxTypeSampler2D.vue"
import Uniformfloat from "@/components/types/GlFxTypeFloat.vue"
import Uniformvec3 from "@/components/types/GlFxTypeVec3.vue"
import Uniformvec4 from "@/components/types/GlFxTypeVec4.vue"

export default {
    components: {
        UniformSampler2D,
        Uniformfloat,
        Uniformvec3,
        Uniformvec4
    },
    props: {
        type: {
            type: String,
            default: null,
        },
        name: {
            type: String,
            default: "",
        },
        input: {
            type: [String, Array, Number, Boolean, Object, Date, Symbol],
            default: null
        }
    },
    data(){
        return {
            ready: false,
            context: null,
            glInfo:{
                program: null,
                loc: null,
                index: null,
                texture: null
            }
        }
    },
    computed: {
        declaration(){
            return `uniform ${this.getType()}   ${this.name};`
        },
        value(){
            return this.$refs.child.value
        },
    },
    created() {
        if(this.$parent.registerUniform) {
            this.$parent.registerUniform(this)
        }
    },
    methods: {
        onReady() {
            this.ready = true;
            this.$emit("ready")
        },
        getType(){
            return this.type
        },
        getTypeComponent(){
            switch(this.type.toLowerCase()){
                case "sampler2d":
                    return "UniformSampler2D";
                default: 
                    return `Uniform${this.getType()}`;
            }
        },
        init(context, texIndex=0){
            this.context = context;
            this.glInfo.index = texIndex;
            this.glInfo.texture = this.$refs.child.init(this.context.gl, this.glInfo);
            return this.glInfo.texture;
        },
        afterInit(){

        },
        alloc(program){
            this.glInfo.program = program
            this.glInfo.loc = this.context.gl.getUniformLocation(this.glInfo.program, this.name)
        },
        update(){
            this.$refs.child.update(this.context.gl, this.glInfo)
        },
        destroy() {
            this.context = null;
        }
    }
}