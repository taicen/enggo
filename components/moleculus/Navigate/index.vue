<template>
<nav class="b-navigate">
  <ul class="b-nav">
    <li class="b-nav__item" v-for="item in items" :key="item.id">
      <NuxtLink exact v-if="item.path" :to="item.path"><svg-icon :name="item.icon" :class="'icon-' + item.icon"/> {{item.title}}</NuxtLink>
      <a v-if="item.url" :href="item.url"><svg-icon :name="item.icon" :class="'icon-' + item.icon"/> {{item.title}}</a>
      <a v-if="item.callback" href="#" @click.prevent="item.callback"><svg-icon :name="item.icon" :class="'icon-' + item.icon"/> {{item.title}}</a>
    </li>
  </ul>
</nav>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      default: ()=>([])
    }
  }
}
</script>