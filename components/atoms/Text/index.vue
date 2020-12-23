<template>
  <div class="text" :class="[{'text--inverse': inverse}, ...classes]" :style="{...myStyle}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ui-text',
  props: {
    myStyle: {
      type: Object,
      default: ()=>({})
    },
    classes: {
      type: Array,
      default: ()=>([])
    },
    inverse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
  .text {
    color: $color-main;
    font-size: rem(16);
  }
  .text--inverse {
    color: $color-light;
  }
  .text--second-color {
    color: $color-second;
  }
  .text--success-color {
    color: $color-success;
  }
  .text--info-color {
    color: $color-info;
  }
  .text--error-color {
    color: $color-error;
  }
  .text--warning-color {
    color: $color-warning;
  }
  .text--small {
    font-size: rem(14);
  }
  .text--big {
    font-size: rem(18);
  }
  .text--bold {
    font-weight: bold;
  }
  .text--semibold {
    font-weight: 600;
  }
  .text--medium {
    font-weight: 500;
  }
  .text--light {
    font-weight: 300;
  }
  .text--upper {
    text-transform: uppercase;
  }
</style>