<template>
  <!-- 
    Uniform Specific Component is instanciated based on passed 'type' prop.
    Required name and input prop are passed to the sub component
    All remaining props, listed in $attrs, are binded to the sub component
    and should be declared as props by each specific component as needed
-->
  <component
    ref="child"
    :is="getTypeComponent()" 
    :name="name" 
    :input="mouse"
    v-bind="$attrs"
    @ready="onReady"/>
</template>

<script>

import mixin from "@/components/mixins/UniformMixin"

export default {
    mixins: [mixin],
    props: {
        mouseDrag: {
            type: Boolean,
            default: true
        },
        reverseY: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            contextWidth: 0.0,
            contextHeight: 0.0,
            canvas: null,
            mouseDown: false,
            mouseX:0.0,
            mouseY:0.0
        }
    },
    computed:{
        mouse(){
            return [this.x, this.y, this.z, this.w]
        },
        x(){
            return this.mouseX;
        },
        y(){
            return this.mouseY;
        },
        z(){
            return this.mouseDown ? 1.0:0.0
        },
        w(){
            return this.mouseDown ? 1.0:0.0
        }
    },
    methods: {
        getType(){
            return "vec4"
        },
        getTypeComponent(){
            return "Uniformvec4"
        },
        afterInit(){
            this.canvas = this.context.canvas;
            this.canvas.addEventListener('mousedown', this.onMouseDown);
            if(this.mouseDrag){
                this.canvas.addEventListener('mousedown', this.onMouseStartDrag);
            } else {
                this.canvas.addEventListener('mousemove', this.onMouseMove);
            }
            window.addEventListener('mouseup', this.onMouseUp);
            this.updateRes()
        },
        beforeUpdate(){
            this.updateRes();
        },
        updateRes(){
            this.contextWidth = this.context.gl.drawingBufferWidth;
            this.contextHeight = this.context.gl.drawingBufferHeight;
        },

        onMouseMove(e){
            this.mouseX = e.offsetX;
            this.mouseY = this.canvas.height - e.offsetY;
        },

        onMouseStartDrag(e){
            this.mouseX = e.offsetX;
            this.mouseY = this.canvas.height - e.offsetY;
            this.canvas.addEventListener('mousemove', this.onMouseMove);
        },

        onMouseDown(e){ //eslint-disable-line no-unused-vars
            this.mouseDown = true
        },
        onMouseUp(e){ //eslint-disable-line no-unused-vars
            if(this.mouseDrag){
                this.canvas.removeEventListener('mousemove', this.onMouseMove)
            }
            this.mouseDown = false
        },

    }
}
</script>

<style lang="stylus" scoped>

</style>