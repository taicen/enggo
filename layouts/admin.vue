<template>
  <div class="b-container">
    <Loader v-if="loader"/>
    <Sidebar />
    <main class="b-main">
      <nuxt/>
    </main>
  </div>
</template>

<script>
import Loader from '~/components/atoms/Loader'
import Sidebar from '~/components/organisms/SideBar'

export default {
  name: 'admin',
  components: {
    Sidebar,
    Loader
  },
  middleware: ['auth'],
  computed: {
    loader(){
      return this.$store.getters['loader/loader']
    }
  }
}
</script>