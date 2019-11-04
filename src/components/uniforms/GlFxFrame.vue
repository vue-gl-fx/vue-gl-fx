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
    :input="frame"
    v-bind="$attrs"
    @ready="onReady"/>
</template>

<script>

import mixin from "@/components/mixins/UniformMixin"

export default {
    mixins: [mixin],
    data(){
        return {
            frame: 0
        }
    },
    computed:{
        value(){
            return this.frame
        }
    },
    methods: {
        getType(){
            return "int"
        },
        getTypeComponent(){
            return "Uniformint"
        },
        afterInit(){
            this.frame = 0;
        },
        beforeUpdate(){
            this.frame++
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>