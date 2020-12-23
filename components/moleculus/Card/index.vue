<template>
  <component :is="type && card" v-bind="data"></component>
</template>

<script>
import CardProfile from './CardProfile'
import CardUser from './CardUser'

const cardChildren = new Map()
cardChildren.set('profile', CardProfile)
cardChildren.set('user', CardUser)

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      card: cardChildren.get(this.type)
    }
  }
}
</script>