<template>
  <label class="form-field">
    <div class="form-field__wrap" v-if="type !== 'textarea'">
      <input   
        :type="type" 
        :value="value" 
        :placeholder="placeholder" 
        @input="handleInput" 
        class="field" 
        :class="[...classes, {'is-error': isError, 'is-success': isSuccess}]"
      >
      <span v-if="label" class="form-field__label">{{label}}</span>
      <div v-if="info" class="form-field__info">
        <div class="text">{{info}}</div>
      </div>
    </div>
    <div v-else class="form-field__wrap">
      <textarea 
        :value="value"
        @input="handleInput"
        :placeholder="placeholder"
        class="field"
        :class="[...classes, {'is-error': isError, 'is-success': isSuccess}]">
      </textarea>
      <span v-if="label" class="form-field__label">{{label}}</span>
    </div>
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
      type: String,
      default: ' '
    },
    info: {
      type: String,
      default: ''
    },
    isError: {
      type: Boolean,
      default: false
    },
    isSuccess: {
      type: Boolean,
      default: false
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