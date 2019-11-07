export default {
    props: {
        name: {
            type: String,
            default: "",
        },
        input: {
            type: String,
            default: null
        },
    },
    data() {
        return {
            error: false,
            ready: false,
        }
    },
    computed: {
        value(){
            return this.input;
        }
    },
    render() {
        return "";
    },
    methods: {
        init(gl, glInfo){ //eslint-disable-line no-unused-vars
            // to override
            return false;
        },
        alloc(gl, glInfo){
            return gl.getUniformLocation(glInfo.program, this.name)
        },
        update(gl, glInfo){ //eslint-disable-line no-unused-vars
            // to override
        },
        destroy(glInfo){ //eslint-disable-line no-unused-vars
            //to override
        }
    }
}