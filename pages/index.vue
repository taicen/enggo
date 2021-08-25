<template>
  <Room :token="token" />
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    let token = ''
    try {
      const requestOptions = {
        method: 'POST',
        // headers: myHeaders,
        // body: raw,
        redirect: 'follow',
      }

      const response = await fetch(`${process.env.apiUrl}/sync`, requestOptions)
      const result = await response.json()
      // const result = await $axios.$post('/sync')
      token = result.token
    } catch (error) {
      console.log(
        '%c 🎨: Data -> error ',
        'font-size:16px;background-color:#f7fde6;color:black;',
        error
      )
    }
    return { token }
  },
}
</script>
