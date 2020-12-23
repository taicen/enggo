<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'default',
  computed: {
    error(){
      return this.$store.getters.error
    }
  },
  watch:{
    error(value){
      if(value) {
        this.$toast.error(value);
        this.$store.commit('clearError');
      }
    }
  }
}
</script>