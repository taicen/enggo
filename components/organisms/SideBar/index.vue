<template>
  <aside class="b-aside">
    <div class="b-logo"><img src="@/assets/images/logo.svg"></div>
    <Card type="profile" :data="profile"/>
    <Navigate :items="links"/>
  </aside>
</template>

<script>
import Card from '~/components/moleculus/Card';
import Navigate from '~/components/moleculus/Navigate';

export default {
  components: {
    Card,
    Navigate
  },
  data: () => ({
    profile: {
      title: 'Santos Khalisi',
      description: 'Hello Dashboard'
    },
    
  }),
  computed: {
    links(){
      return [
        {
          id: 1,
          path: '/admin',
          icon: 'dashboard',
          title: 'Dashboard'
        },
        {
          id: 2,
          path: '/admin/publics',
          icon: 'publics',
          title: 'Публикации'
        },
        {
          id: 3,
          path: '/admin/users',
          icon: 'users',
          title: 'Пользователи'
        },
        {
          id: 4,
          icon: 'logout',
          callback: this.logout,
          title: 'Выход'
        },
      ]
    }
  },
  methods: {
    async logout(){
      // this.$store.dispatch('loader/show');
      await this.$store.dispatch('auth/logout')
      // this.$store.dispatch('loader/hide');
      this.$router.push('/?message=logout');
    }
  }
}
</script>