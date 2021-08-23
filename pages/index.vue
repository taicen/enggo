<template>
  <Room :token="token" />
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    let token = ''
    try {
      const result = await $axios.$post('/sync')
      token = result.token

      return { token }
    } catch (error) {
      console.log(
        '%c 🎨: Data -> error ',
        'font-size:16px;background-color:#f7fde6;color:black;',
        error
      )
      return { token }
    }
  },
}
</script>
