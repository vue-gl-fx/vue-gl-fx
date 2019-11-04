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
    :input="time"
    v-bind="$attrs"
    @ready="onReady"/>
</template>

<script>

import mixin from "../mixins/UniformMixin"

export default {
    mixins: [mixin],
    props: {
        isDelta: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            time:0,
            lastUpdate: 0,
            delta: 0
        }
    },
    computed:{
        value(){
            return this.isDelta ? this.delta:this.time
        }
    },
    methods: {
        getType(){
            return "float"
        },
        getTypeComponent(){
            return "Uniformfloat"
        },
        afterInit(){
            this.lastUpdate = 0;
        },
        beforeUpdate(now){
            this.time = now
            this.delta = this.time - this.lastUpdate;
            this.lastUpdate = this.time;
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>