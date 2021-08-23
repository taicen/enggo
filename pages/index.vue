<template>
  <Room :token="token" />
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    let token = ''
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'text/plain')

    // const raw = JSON.stringify({
    //   email: 'alexandrdoktorov@gmail.com',
    //   api_key: 'bfa42d51-8031-11e8-8a06-d8cb8abf9305',
    // })

    const raw =
      '{\n"email": "alexandrdoktorov@gmail.com",\n\n"api_key": "bfa42d51-8031-11e8-8a06-d8cb8abf9305"}'

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    try {
      const result = await fetch(
        'https://scholarships.s20.online/v2api/auth/login',
        requestOptions
      ).then((response) => response.text())

      token = JSON.parse(result).token

      return { token }
    } catch (error) {
      console.log(
        '%c 🎨: Data -> error ',
        'font-size:16px;background-color:#f7fde6;color:black;',
        error
      )
      return { token }
    }

    // fetch('https://scholarships.s20.online/v2api/auth/login', requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => {
    //     // console.log(
    //     //   '%c 🈚: Data -> result ',
    //     //   'font-size:16px;background-color:#504d8f;color:white;',
    //     //   JSON.parse(result)
    //     // )
    //     token = JSON.parse(result).token
    //   })
    //   .catch((error) => console.log('error', error))
    // return { token }
  },
}
</script>
