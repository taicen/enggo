import { setClient } from '@/services/request'

export default ctx => {
  const { $axios, redirect, store } = ctx

  $axios.create(({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  }))

  $axios.interceptors.request.use(request => {

    if (store.getters['auth/isAuth'] && !request.headers.common['Authorization']) {
      const token = store.getters['auth/token']
      request.headers.common['Authorization'] = `Bearer ${token}`
    }

    // console.log("%c 🚇: request ", "font-size:16px;background-color:#92c2fb;color:black;", request)
    return request
  })

  setClient($axios)

}
