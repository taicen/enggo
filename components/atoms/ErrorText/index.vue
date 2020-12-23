<template>
  <span class="has-error"><slot></slot></span>
</template>

<style lang="scss">
  .has-error {
    color: $color-error;
    font-size: $font-size-small;
  }
</style>