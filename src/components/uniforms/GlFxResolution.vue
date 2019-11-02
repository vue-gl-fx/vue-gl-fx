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
    :input="res"
    v-bind="$attrs"
    @ready="onReady"/>
</template>

<script>

import mixin from "@/components/mixins/UniformMixin"

export default {
    mixins: [mixin],
    data(){
        return {
            width: 0.0,
            height: 0.0
        }
    },
    computed:{
        res(){
            return [this.width, this.height, 0.0]
        }
    },
    methods: {
        getType(){
            return "vec3"
        },
        getTypeComponent(){
            return "Uniformvec3"
        },
        afterInit(){
            this.updateRes()
        },
        afterUpdate(){
            this.updateRes();
        },
        updateRes(){
            this.width = this.context.gl.drawingBufferWidth;
            this.height = this.context.gl.drawingBufferHeight;
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>