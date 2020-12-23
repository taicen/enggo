<template>
  <div>
    <h1>Публикации</h1>
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
          <tr v-for="post in products.items" :key="post._id">
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
  </div>
  
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data: ()=>({}),
  computed:{
    ...mapGetters({
      products: 'products/items'
    })
  },
  mounted(){
    this.fetchProducts()
  },
  methods: {
    ...mapActions({
      'fetchProducts': 'products/fetchAll'
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
      
    }
  }
}
</script>