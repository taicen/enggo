<template>
  <section>
    <header class="section__head">
      <UiText :classes="['test text--second-color text--bold text--upper']">Dashboard</UiText>
      <UiTitle type="h1" :classes="['title']">Публикации</UiTitle>
      <a href="#" @click.prevent="addPost" class="link-ctrl"><svg-icon name="add" class="icon-add"/></a>
    </header>

    <div class="b-posts">
      <table>
        <tr>
          <th>Название</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Действия</th>
        </tr>
        <tr v-for="post in posts" :key="post.id">
          <td>{{post.title}}</td>
          <td>{{post.date}}</td>
          <td>{{post.category}}</td>
          <td>
            <NuxtLink :to="'/admin/publics/' + post.id"><svg-icon name="edit" class="icon-edit"/></NuxtLink>
            <a href="#" @click="deletePost(post.id)"><svg-icon name="delete" class="icon-delete"/></a>
          </td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
import UiText from '~/components/atoms/Text'
import UiTitle from '~/components/atoms/Title'

export default {
  components: {
    UiTitle,
    UiText
  },
  data: ()=>({
    posts: [
      {
        id: 1,
        title: 'How to Use SVG Sprites with NuxtJS',
        date: '11.11.2012',
        category: 'Блог'
      },
      {
        id: 2,
        title: 'Люди на полном серьёзе обсуждают, куда валить из Америки',
        date: '11.11.2012',
        category: 'Блог'
      },
      {
        id: 3,
        title: 'Банкротство Арабского мира: кто виноват и что делать?',
        date: '11.11.2012',
        category: 'Блог'
      },
      {
        id: 4,
        title: 'Президентская гонка в США подошла к финалу',
        date: '11.11.2012',
        category: 'Блог'
      },
      {
        id: 5,
        title: 'Особенно на руку демократам сыграл провал Трампа в борьбе с COVID-19.',
        date: '11.11.2012',
        category: 'Блог'
      },
    ]
  }),
  methods: {
    deletePost(id){
      console.log("%c 🐝: deletePost -> id ", "font-size:16px;background-color:#1c5a31;color:white;", id)
    },
    addPost(){
      this.$router.push('/admin/publics/add')
    }
  }
}
</script>

<style lang="scss">
  .section__head {
    margin-bottom: 30px;
    position: relative;
  }
  .link-ctrl {
    position: absolute;
    right: 0;
    bottom: 0;
    display: inline-block;
    width: 24px;
    height: 24px;
  }
</style>