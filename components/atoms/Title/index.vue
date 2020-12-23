<template>
  <component :is="type.toLowerCase()" :class="[...classes]">
    <slot></slot>
  </component>
</template>

<script>
import Vue from 'vue'

const H1 = Vue.component('H1', {
  template: '<h1></h1>'
})
const H2 = Vue.component('H2', {
  template: '<h2></h2>'
})
const H3 = Vue.component('H3', {
  template: '<h3></h3>'
})
const H4 = Vue.component('H4', {
  template: '<h4></h4>'
})
const H5 = Vue.component('H5', {
  template: '<h5></h5>'
})
const H6 = Vue.component('H6', {
  template: '<h6></h6>'
})

export default {
  props: {
    type: {
      type: String,
      default: 'h1'
    },
    classes: {
      type: Array,
      default: ()=>([])
    }
  },
  components: {
    H1,
    H2,
    H3,
    H4,
    H5,
    H6
  }
}
</script>

<style lang="scss">
  .title {
    font-weight: 700;
    font-size: $font-size-h1;
  }
  .subtitle {
    font-weight: 600;
    font-size: $font-size-primary;
    color: $color-second;
    text-transform: uppercase;
  }
</style>