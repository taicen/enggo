export default async function({$axios, store, redirect}){
  // console.log("%c 🌲: Auth middleware ", "font-size:16px;background-color:#a98cbe;color:white;", 'OK')
  
  const accessToken = await store.dispatch('auth/autoLogin')
  // console.log("%c 🎧: res ", "font-size:16px;background-color:#d1b719;color:white;", accessToken)

  $axios.setToken(accessToken, 'Bearer')
  
  if(!accessToken){
    if(!store.getters['auth/isAuth']){
      redirect('/?message=login')
    }
  }
  
}