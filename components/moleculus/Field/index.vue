<template>
  <label>
    <span>{{label}}</span>
    <input 
      v-if="type !== 'textarea'"
      :type="type" 
      :value="value" 
      :placeholder="placeholder" 
      @input="handleInput" 
      class="field" 
      :class="[...classes, {'is-error': isError, 'is-success': isSuccess}]"
    >
    <textarea v-else 
    :value="value"
    @input="handleInput"
    :placeholder="placeholder"
    class="field"
    :class="[...classes, {'is-error': isError, 'is-success': isSuccess}]">
    </textarea>
    <slot></slot>
  </label>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    classes: {
      type: Array,
      default: ()=>([])
    },
    placeholder: {
      type: String
    },
    isError: {
      type: Boolean
    },
    isSuccess: {
      type: Boolean
    }
  },
  // data: () => ({
  //   content: this.value
  // }),
  methods: {
    handleInput(e){
      this.$emit('input', e.target.value)
    }
  }
}
</script>