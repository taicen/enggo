<template>
  <section>
    <header class="section__head">
      <UiText :classes="['test text--second-color text--bold text--upper']">Dashboard</UiText>
      <UiTitle type="h1" :classes="['title']">Пользователи</UiTitle>
      <a href="#" @click.prevent="addUser" class="link-ctrl"><svg-icon name="add" class="icon-add"/></a>
    </header>
    <div class="b-units">
      <Card 
        type="user"
        v-for="user in users"
        :data="user"
        :key="user.id"
      />
    </div>
  </section>
</template>

<script>
import UiText from '~/components/atoms/Text'
import UiTitle from '~/components/atoms/Title'
import Card from '~/components/moleculus/Card';

export default {
  components:{
    UiText,
    UiTitle
  },
  data: ()=>({
    date: new Date(),
    users: [
      {
        id: 1,
        title: 'Григорий',
        email: 'pupsik@mail.com',
        category: 'Блог'
      },
      {
        id: 2,
        title: 'Евгения',
        email: 'pupsik@mail.com',
        category: 'Блог'
      },
      {
        id: 3,
        title: 'Людвига',
        email: 'pupsik@mail.com',
        category: 'Блог'
      },
      {
        id: 4,
        title: 'Пенелоппа',
        email: 'pupsik@mail.com',
        category: 'Блог'
      },
      {
        id: 5,
        title: 'Константин',
        email: 'pupsik@mail.com',
        category: 'Блог'
      },
    ]
  }),
  methods: {
    addUser(){
      this.$router.push('/admin/users/add')
    }
  }
}
</script>