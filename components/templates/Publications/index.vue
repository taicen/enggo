<template>
  <section>
    <header class="section__head">
      <UiText :classes="['test text--second-color text--bold text--upper']">Раздел управления публикациями</UiText>
      <UiTitle type="h1" :classes="['title']">Публикации</UiTitle>
      <a href="#" @click.prevent="addPost" class="link-ctrl"><svg-icon name="add" class="icon-add"/></a>
    </header>
    <div class="b-posts">
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Дата</th>
            <th>Категория</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post._id">
            <td>{{post.title}}</td>
            <td>{{post.date}}</td>
            <td>{{post.category}}</td>
            <td>
              <NuxtLink :to="'/admin/publics/' + post._id"><svg-icon name="edit" class="icon-edit"/></NuxtLink>
              <a href="#" @click="deletePost(post._id)"><svg-icon name="delete" class="icon-delete"/></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>

import UiText from '~/components/atoms/Text'
import UiTitle from '~/components/atoms/Title'
import {mapActions, mapGetters} from 'vuex'
import products from '~/store/products'

export default {
  components: {
    UiText,
    UiTitle
  },
  data: ()=>({
    posts: []
  }),
  computed:{
    ...mapGetters({
      products: 'products/items',
      categories: 'categories/items'
    }),
    computedPosts(){
      let items = [];
      this.products.items.forEach((product)=>{
        let item = { ...product }
        const obj = this.categories.items.find((category) => category.id === product.category_id)
        if(obj){
          item.category = obj.title
        }
        items.push(item)
      })
      return items
    }
  },
  async mounted(){
    this.fetchProducts().then(res => {
      this.fetchCategories().then(res => {
        this.posts = this.computedPosts
      })
    })
  },
  methods: {
    ...mapActions({
      'fetchProducts': 'products/fetchAll',
      'fetchCategories': 'categories/fetchAll'
    }),
    async deletePost(id){
      const result = await this.$swal({
        title: 'Вы уверены?',
        text: "что хотите удалить запись!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Нет, спасибо!',
        confirmButtonText: 'Да, конеш!',
        reverseButtons: true
      });

      if ( result.isConfirmed ) {
        await this.$store.dispatch('post/remove', id)
        this.posts = this.posts.filter(post => post.id !== id)
        this.$toast.success('Пост успешно удален')
      }
      
    },

    addPost(){
      this.$router.push('/admin/publics/add')
    }
  }
}
</script>