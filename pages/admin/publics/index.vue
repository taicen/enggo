<template>
  <Publicatioins/>
</template>

<script>
import Publicatioins from '~/components/templates/Publications'

export default {
  components: {
    Publicatioins
  },
  layout: 'admin',
  // async asyncData({store}){
  //   store.dispatch('loader/show')
  //   const posts = await store.dispatch('post/getPosts')
  //   store.dispatch('loader/hide')
  //   return {posts}
  // }
}
</script>