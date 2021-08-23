<template>
  <label class="form-field">
    <div class="form-field__wrap" v-if="type === 'phone'">
      <input
        v-on="$listeners"
        v-bind="$attrs"
        type="tel"
        v-mask="mask"
        :value="value"
        :placeholder="placeholder"
        @input="handleInput"
        class="field"
        :class="[...classes, { 'is-error': isError, 'is-success': isSuccess }]"
      />
      <span v-if="label" class="form-field__label">{{ label }}</span>
      <div v-if="info" class="form-field__info">
        <div class="text">{{ info }}</div>
      </div>
    </div>
    <div class="form-field__wrap" v-if="type === 'text'">
      <input
        v-on="$listeners"
        v-bind="$attrs"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @input="handleInput"
        class="field"
        :class="[...classes, { 'is-error': isError, 'is-success': isSuccess }]"
      />
      <span v-if="label" class="form-field__label">{{ label }}</span>
      <div v-if="info" class="form-field__info">
        <div class="text">{{ info }}</div>
      </div>
    </div>
    <div class="form-field__wrap" v-if="type === 'textarea'">
      <textarea
        v-bind="$attrs"
        :value="value"
        @input="handleInput"
        :placeholder="placeholder"
        class="field"
        :class="[...classes, { 'is-error': isError, 'is-success': isSuccess }]"
      >
      </textarea>
      <span v-if="label" class="form-field__label">{{ label }}</span>
    </div>
    <slot></slot>
  </label>
</template>
<script>
import { mask } from 'vue-the-mask'
export default {
  inheritAttrs: false,
  directives: { mask },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    classes: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: ' ',
    },
    info: {
      type: String,
      default: '',
    },
    isError: {
      type: Boolean,
      default: false,
    },
    isSuccess: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: String,
      default: '',
    },
  },
  // data: () => ({
  //   content: this.value
  // }),
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>
