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
    :input="input"
    v-bind="$attrs"
    @ready="onReady"/>
</template>

<script>

import mixin from "@/components/mixins/UniformMixin"

export default {
    mixins: [mixin],
    props: {
        type: {
            type: String,
            required: true,
        },
    },
    methods: {
        
    }
}
</script>

<style lang="stylus" scoped>

</style>