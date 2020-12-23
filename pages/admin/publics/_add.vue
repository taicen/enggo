<template>
  <AddPublication/>
</template>

<script>
import AddPublication from '~/components/templates/Publications/addpublication'

export default {
  components: {
    AddPublication
  },
  head(){
    return {
      title: !this.post ? 'Создание публикации' : `${this.post.title}`
    }
  },
  validate({params}){
    return Boolean(params.add)
  },
  layout: 'admin',
  // async asyncData({store, params, redirect}){
    // if(params.add !== 'add'){
      // const post = await store.dispatch('post/getPostById', params.add)
      // if(!post) {
      //   $nuxt.$toast.info('Нет такой записи. Хотите добавить?')
      //   redirect('/admin/publics/add')
      // }
      // return {post}
    // }
  // }
}
</script>